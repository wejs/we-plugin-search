/**
 * Search plugin to convert search methods to sequelize query params
 */

module.exports = function(we) {
  const Op = we.Op;

  return {
    equal(name, value, query) {
      query.where[name] = {
        [Op.eq]: value
      };
    },
    booleanEqual(name, value, query) {
      if (value == 'false' || value == '0') {
        query.where[name] = { [Op.eq]: false };
      } else {
        query.where[name] = { [Op.eq]: Boolean(value) };
      }
    },
    isNull(name, value, query) {
      query.where[name] = {
        [Op.eq]: null
      };
    },
    notIsNull(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.ne] = null;
    },
    startsWith(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.like] = value + '%';
    },
    notStartsWith(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.notLike] = value + '%';
    },
    endsWith(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.like] = '%' + value;
    },
    notEndsWith(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.notLike] = '%' + value;
    },
    contains(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.like] = '%' + value + '%';
    },
    notContains(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.notLike] = '%' + value + '%';
    },
    between(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      // invalid param
      if (!value.split) return;

      const params = value.split('-');

      // value need be in format: 12-12
      if (params.length != 2) return;
      // invalid number
      if ( isNaN(params[0]) || isNaN(params[1]) ) {
        return;
      }

      query.where[name][Op.between] = params;
    },
    notBetween(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      // invalid param
      if (!value.split) return;

      const params = value.split('-');

      // value need be in format: 12-12
      if (params.length != 2) return;
      // invalid number
      if ( isNaN(params[0]) || isNaN(params[1]) ) {
        return;
      }

      query.where[name][Op.notBetween] = params;
    },
    greaterThan(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.gt] = value;
    },
    greaterThanOrEqual(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.gte] = value;
    },
    lessThan(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.lt] = value;
    },
    lessThanOrEqual(name, value, query) {
      if (!query.where[name]) query.where[name] = {};
      query.where[name][Op.lte] = value;
    }
  };
};