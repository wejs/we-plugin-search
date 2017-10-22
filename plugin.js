/**
 * Main we-plugin-search file
 */

const sequelizeAdapter = require('./lib/sequelize_adapter');

module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  plugin.params = {
    default(name, params) {
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
    STRING(name, params) {
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
    TEXT(name, params, modelName) {
      this.STRING(name, params, modelName);
    },
    BOOLEAN(name, params) {
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
    INTEGER(name, params) {
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
    BIGINT(name, params, modelName) {
      this.INTEGER(name, params, modelName);
    },
    FLOAT(name, params, modelName) {
      this.INTEGER(name, params, modelName);
    },
    REAL(name, params, modelName) {
      this.INTEGER(name, params, modelName);
    },
    DECIMAL(name, params, modelName) {
      this.INTEGER(name, params, modelName);
    },
    TIME(name, params, modelName) {
      this.DATE(name, params, modelName);
    },
    DATEONLY(name, params, modelName) {
      this.DATE(name, params, modelName);
    },
    DATE(name, params) {
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
    VIRTUAL() {},

    /**
     * Bloob fields
     * Mysql allows to search in bloob fields like text
     */
    BLOB(name, params, modelName) {
      this.STRING(name, params, modelName);
    }
  };

  // plug this feature in we.js routes

  plugin.setModelSearchParams = function setModelSearchParams(we, done) {

    for(let modelName in we.db.models) {
      plugin.setAttrSearchParams(modelName, we.db.models[modelName]);
    }

    done();
  };

  plugin.setAttrSearchParams = function setAttrSearchParams(name, model) {
    model.urlSearchParams = {};

    for(let attrName in model.attributes) {
      if (!model.attributes[attrName].type || !model.attributes[attrName].type.key) {
        continue; // type.key is required but not avaible if set model.attr types with string
      }

      model.attributes[attrName].type.key.toLowerCase();

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

  /**
   * We.js middleware for plugin search plugin before controllers
   *
   * @param  {Object}   ctx   tx = { req: this.req, res: this.res }
   * @param  {Function} done  callback
   */
  plugin.middleware = function searchMiddleware(ctx, done) {
    // skip if dont have query params
    if (
      ctx.res.locals.action !='find' ||
      !ctx.res.locals.model ||
      !ctx.res.locals.Model ||
      !ctx.req.query
    ) {
      return done();
    }

    const urlSearchParams = ctx.res.locals.Model.urlSearchParams;

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

    done();
  };

  plugin.hooks.on('we:after:routes:bind', plugin.setModelSearchParams);
  plugin.hooks.on('we:router:request:after:load:context', plugin.middleware);

  return plugin;
};