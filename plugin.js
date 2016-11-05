/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/plugin
 */

var sequelizeAdapter = require('./lib/sequelize_adapter');

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);
  // set plugin configs
  // plugin.setConfigs({
  // });

  plugin.params = {
    default: function defaultSearchParams(name, params) {
      params[name] = sequelizeAdapter.equal; // equal
      params[name + '_equal'] = sequelizeAdapter.equal;

      params[name + '_is-null'] = sequelizeAdapter.isNull;
      params[name + '_not-is-null'] = sequelizeAdapter.notIsNull;
    },
    string: function stringSearchParams(name, params) {
      params[name] = sequelizeAdapter.equal; // equal
      params[name + '_equal'] = sequelizeAdapter.equal;

      params[name + '_is-null'] = sequelizeAdapter.isNull;
      params[name + '_not-is-null'] = sequelizeAdapter.notIsNull;

      params[name + '_starts-with'] = sequelizeAdapter.startsWith;
      params[name + '_not_starts-with'] = sequelizeAdapter.notStartsWith;

      params[name + '_ends-with'] = sequelizeAdapter.endsWith;
      params[name + '_not_ends-with'] = sequelizeAdapter.notEndsWith;

      params[name + '_contains'] = sequelizeAdapter.contains;
      params[name + '_not-contains'] = sequelizeAdapter.notContains;
    },
    boolean: function booleanSearchParams(name, params) {
      params[name] = sequelizeAdapter.equal; // equal
      params[name + '_equal'] = sequelizeAdapter.equal;

      params[name + '_is-null'] = sequelizeAdapter.isNull;
      params[name + '_not-is-null'] = sequelizeAdapter.notIsNull;
    },
    number: function numberSearchParams(name, params) {
      params[name] = sequelizeAdapter.equal; // equal
      params[name + '_equal'] = sequelizeAdapter.equal;

      params[name + '_is-null'] = sequelizeAdapter.isNull;
      params[name + '_not-is-null'] = sequelizeAdapter.notIsNull;

      // Between http://www.w3schools.com/sql/sql_between.asp

      params[name + '_between'] = sequelizeAdapter.between;
      params[name + '_not-between'] = sequelizeAdapter.notBetween;
    }
  };


  return plugin;
};