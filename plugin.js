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
      params[name] = {
        name: name,
        fn: sequelizeAdapter.equal
      }; // equal
      params[name + '_equal'] = {
        name: name,
        fn: sequelizeAdapter.equal
      };
      params[name + '_is-null'] = {
        name: name,
        fn: sequelizeAdapter.isNull
      };
      params[name + '_not-is-null'] = {
        name: name,
        fn: sequelizeAdapter.notIsNull
      };
    },
    STRING: function stringSearchParams(name, params) {
      params[name] = {
        name: name,
        fn: sequelizeAdapter.equal
      }; // equal
      params[name + '_equal'] = {
        name: name,
        fn: sequelizeAdapter.equal
      };

      params[name + '_is-null'] = {
        name: name,
        fn: sequelizeAdapter.isNull
      };
      params[name + '_not-is-null'] = {
        name: name,
        fn: sequelizeAdapter.notIsNull
      };

      params[name + '_starts-with'] = {
        name: name,
        fn: sequelizeAdapter.startsWith
      };
      params[name + '_not-starts-with'] = {
        name: name,
        fn: sequelizeAdapter.notStartsWith
      };

      params[name + '_ends-with'] = {
        name: name,
        fn: sequelizeAdapter.endsWith
      };
      params[name + '_not-ends-with'] = {
        name: name,
        fn: sequelizeAdapter.notEndsWith
      };

      params[name + '_contains'] = {
        name: name,
        fn: sequelizeAdapter.contains
      };
      params[name + '_not-contains'] = {
        name: name,
        fn: sequelizeAdapter.notContains
      };
    },
    TEXT: function text(name, params, modelName) {
      this.STRING(name, params, modelName);
    },
    BOOLEAN: function booleanSearchParams(name, params) {
      params[name] = {
        name: name,
        fn: sequelizeAdapter.booleanEqual
      }; // equal
      params[name + '_equal'] = {
        name: name,
        fn: sequelizeAdapter.booleanEqual
      };

      params[name + '_is-null'] = {
        name: name,
        fn: sequelizeAdapter.isNull
      };
      params[name + '_not-is-null'] = {
        name: name,
        fn: sequelizeAdapter.notIsNull
      };
    },
    INTEGER: function intergerSearchParams(name, params) {
      params[name] = {
        name: name,
        fn: sequelizeAdapter.equal
      }; // equal
      params[name + '_equal'] = {
        name: name,
        fn: sequelizeAdapter.equal
      };

      params[name + '_is-null'] = {
        name: name,
        fn: sequelizeAdapter.isNull
      };
      params[name + '_not-is-null'] = {
        name: name,
        fn: sequelizeAdapter.notIsNull
      };

      // Between http://www.w3schools.com/sql/sql_between.asp

      params[name + '_between'] = {
        name: name,
        fn: sequelizeAdapter.between
      };
      params[name + '_not-between'] = {
        name: name,
        fn: sequelizeAdapter.notBetween
      };

      params[name + '_gt'] = {
        name: name,
        fn: sequelizeAdapter.greaterThan
      };
      params[name + '_gte'] = {
        name: name,
        fn: sequelizeAdapter.greaterThanOrEqual
      };

      params[name + '_lt'] = {
        name: name,
        fn: sequelizeAdapter.lessThan
      };
      params[name + '_lte'] = {
        name: name,
        fn: sequelizeAdapter.lessThanOrEqual
      };
    },
    BIGINT: function bigintSearchParams(name, params, modelName) {
      this.INTEGER(name, params, modelName);
    },
    FLOAT: function floatSearchParams(name, params, modelName) {
      this.INTEGER(name, params, modelName);
    },
    REAL: function realSearchParams(name, params, modelName) {
      this.INTEGER(name, params, modelName);
    },
    DATE: function dataSearchParams(name, params) {
      params[name] = {
        name: name,
        fn: sequelizeAdapter.equal
      }; // equal
      params[name + '_equal'] = {
        name: name,
        fn: sequelizeAdapter.equal
      };

      params[name + '_is-null'] = {
        name: name,
        fn: sequelizeAdapter.isNull
      };
      params[name + '_not-is-null'] = {
        name: name,
        fn: sequelizeAdapter.notIsNull
      };

      // Between http://www.w3schools.com/sql/sql_between.asp

      params[name + '_between'] = {
        name: name,
        fn: sequelizeAdapter.between
      };
      params[name + '_not-between'] = {
        name: name,
        fn: sequelizeAdapter.notBetween
      };

      params[name + '_gt'] = {
        name: name,
        fn: sequelizeAdapter.greaterThan
      };
      params[name + '_gte'] = {
        name: name,
        fn: sequelizeAdapter.greaterThanOrEqual
      };

      params[name + '_lt'] = {
        name: name,
        fn: sequelizeAdapter.lessThan
      };
      params[name + '_lte'] = {
        name: name,
        fn: sequelizeAdapter.lessThanOrEqual
      };
    },
    /**
     * Virtual search param setters not is suported
     */
    VIRTUAL: function virtualSearchParams() {}
  };

  // plug this feature in we.js routes

  plugin.setModelSearchParams = function setModelSearchParams(we, done) {

    for(let modelName in we.db.models) {
      plugin.setAttrSearchParams(modelName, we.db.models[modelName]);
    }

    // console.log('post afterAll>\n', we.db.models.post.urlSearchParams);

    done();
  };

  plugin.setAttrSearchParams = function setAttrSearchParams(name, model) {
    model.urlSearchParams = {};

    for(let attrName in model.attributes) {
      model.attributes[attrName].type.key.toLowerCase();

      // console.log('attr>', attrName, model.attributes[attrName].type.key);

      let type = model.attributes[attrName].type.key;

      if (!plugin.params[type]) {
        plugin.we.log.info('param search type not found for:', type, name, attrName);
        // use the default if is and unsuported data type
        plugin.params.default(attrName, model.urlSearchParams, name);
      } else {
        plugin.params[type](attrName, model.urlSearchParams, name);
      }
    }

  };

  plugin.middleware = function searchMiddleware(ctx, done) {
    // ctx = {
    //   req: this.req, res: this.res
    // }

    // console.log('ctx.req.query>', ctx.req.query);
    // console.log('ctx.res.locals.query>', ctx.res.locals.query);

    // console.log('model', ctx.res.locals.model);
    // console.log('model', ctx.res.locals.Model.urlSearchParams);

    const urlSearchParams = ctx.res.locals.Model.urlSearchParams;

    // skip if dont have query params
    if (
      ctx.res.locals.action !='find' ||
      !ctx.res.locals.model ||
      !ctx.req.query
    ) {
      return done();
    }

    // skip if the query param dont have params
    const queryParamNames = Object.keys(ctx.req.query);
    if (!queryParamNames.length) return done();

    // set the query searchs
    for(let paramName in urlSearchParams) {
      if (ctx.req.query[paramName]) {
        urlSearchParams[paramName].fn(
          urlSearchParams[paramName].name,
          ctx.req.query[paramName],
          ctx.res.locals.query
        );
      }
    }

    // console.log('query>\n', ctx.res.locals.query);

    done();
  };

  plugin.hooks.on('we:after:routes:bind', plugin.setModelSearchParams);
  plugin.hooks.on('we:router:request:after:load:context', plugin.middleware);

  return plugin;
};