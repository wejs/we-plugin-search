/**
 * Search plugin to convert search methods to sequelize query params
 */

module.exports = {
  equal(name, value, query) {
    query.where[name] = {
      $eq: value
    };
  },
  booleanEqual(name, value, query) {
    if (value == 'false' || value == '0') {
      query.where[name] = { $eq: false };
    } else {
      query.where[name] = { $eq: Boolean(value) };
    }
  },
  isNull(name, value, query) {
    query.where[name] = {
      $eq: null
    };
  },
  notIsNull(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$ne = null;
  },
  startsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$like = value + '%';
  },
  notStartsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$notLike = value + '%';
  },
  endsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$like = '%' + value;
  },
  notEndsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$notLike = '%' + value;
  },
  contains(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$like = '%' + value + '%';
  },
  notContains(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$notLike = '%' + value + '%';
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

    query.where[name].$between = params;
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

    query.where[name].$notBetween = params;
  },
  greaterThan(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$gt = value;
  },
  greaterThanOrEqual(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$gte = value;
  },
  lessThan(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$lt = value;
  },
  lessThanOrEqual(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$lte = value;
  }
}