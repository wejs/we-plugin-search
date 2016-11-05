module.exports = {
  equal: function equal(name, value, query) {
    query[name] = value;
  },
  isNull: function isNull(name, value, query) {
    query[name] = null;
  },
  notIsNull: function notIsNull(name, value, query) {
    if (!query[name]) query[name] = {};
    query[name].$ne = null;
  },
  startsWith: function startsWith(name, value, query) {
    if (!query[name]) query[name] = {};
    query[name].$like = '%' + value;
  },
  notStartsWith: function notStartsWith(name, value, query) {
    if (!query[name]) query[name] = {};
    query[name].$notLike = '%' + value;
  },
  endsWith: function endsWith(name, value, query) {
    if (!query[name]) query[name] = {};
    query[name].$like = value + '%';
  },
  notEndsWith: function notEndsWith(name, value, query) {
    if (!query[name]) query[name] = {};
    query[name].$notLike = value + '%';
  },
  contains: function contains(name, value, query) {
    if (!query[name]) query[name] = {};
    query[name].$like = '%' + value + '%';
  },
  notContains: function notContains(name, value, query) {
    if (!query[name]) query[name] = {};
    query[name].$notLike = '%' + value + '%';
  },
  between: function between(name, value, query) {
    if (!query[name]) query[name] = {};
    // invalid param
    if (!value.split) return;

    var params = value.split('-');

    // value need be in format: 12-12
    if (params.length != 2) return;
    // invalid number
    if ( isNaN(params[0]) || isNaN(params[1]) ) {
      return;
    }

    query[name].$between = value;
  },
  notBetween: function notBetween(name, value, query) {
    if (!query[name]) query[name] = {};
    // invalid param
    if (!value.split) return;

    var params = value.split('-');

    // value need be in format: 12-12
    if (params.length != 2) return;
    // invalid number
    if ( isNaN(params[0]) || isNaN(params[1]) ) {
      return;
    }

    query[name].$notBetween = value;
  }

}