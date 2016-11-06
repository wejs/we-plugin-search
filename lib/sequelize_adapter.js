module.exports = {
  equal: function equal(name, value, query) {
    query.where[name] = {
      $eq: value
    };
  },
  booleanEqual: function booleanEqual(name, value, query) {
    if (value == 'false' || value == '0') {
      query.where[name] = { $eq: false };
    } else {
      query.where[name] = { $eq: Boolean(value) };
    }
  },
  isNull: function isNull(name, value, query) {
    query.where[name] = {
      $eq: null
    };
  },
  notIsNull: function notIsNull(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$ne = null;
  },
  startsWith: function startsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$like = value + '%';
  },
  notStartsWith: function notStartsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$notLike = value + '%';
  },
  endsWith: function endsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$like = '%' + value;
  },
  notEndsWith: function notEndsWith(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$notLike = '%' + value;
  },
  contains: function contains(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$like = '%' + value + '%';
  },
  notContains: function notContains(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$notLike = '%' + value + '%';
  },
  between: function between(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    // invalid param
    if (!value.split) return;

    var params = value.split('-');

    // value need be in format: 12-12
    if (params.length != 2) return;
    // invalid number
    if ( isNaN(params[0]) || isNaN(params[1]) ) {
      return;
    }

    query.where[name].$between = params;
  },
  notBetween: function notBetween(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    // invalid param
    if (!value.split) return;

    var params = value.split('-');

    // value need be in format: 12-12
    if (params.length != 2) return;
    // invalid number
    if ( isNaN(params[0]) || isNaN(params[1]) ) {
      return;
    }

    query.where[name].$notBetween = params;
  },
  greaterThan: function greaterThan(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$gt = value;
  },
  greaterThanOrEqual: function greaterThanOrEqual(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$gte = value;
  },
  lessThan: function lessThan(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$lt = value;
  },
  lessThanOrEqual: function lessThanOrEqual(name, value, query) {
    if (!query.where[name]) query.where[name] = {};
    query.where[name].$lte = value;
  }
}