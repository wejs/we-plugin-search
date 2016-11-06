const projectPath = process.cwd(),
      deleteDir = require('rimraf'),
      testTools = require('we-test-tools'),
      path = require('path'),
      ncp = require('ncp').ncp;

let we;

// move the example plugin
before(function (callback) {
  const from = path.resolve(__dirname, 'stubs/we-plugin-post'),
        to = path.resolve(process.cwd(), 'node_modules/we-plugin-post');

  ncp( from, to, callback);
});

before(function(callback) {
  testTools.copyLocalConfigIfNotExitst(projectPath, callback);
});

// start the we.js app
before(function(callback) {
  this.slow(100);

  const We = require('we-core');
  we = new We();

  testTools.init({}, we);

  we.bootstrap({
    i18n: {
      directory: path.join(__dirname, 'locales'),
      updateFiles: false
    },
    enableRequestLog: false
  } , (err, we)=> {
    if (err) throw err;
    we.startServer(callback);
  });
});

//after all tests
after(function (callback) {
  we.db.sequelize.sync({force: true})
  .then(function(){
    we.exit( ()=> {

      var tempFolders = [
        projectPath + '/node_modules/we-plugin-post',
        projectPath + '/config/local.js',
      ];

      we.utils.async.each(tempFolders, function(folder, next) {
        deleteDir( folder, next);
      }, function(err) {
        if (err) throw new Error(err);
        callback();
      });

    });
  })
  .catch(callback);
});