var path = require('path'),
    bunyan = require('bunyan'),
    baseConfig = require('./config.base.js'),
    fs = require('fs');

var loggerDir = path.join(__dirname, '../../logs/');
if (!fs.existsSync(loggerDir)){
    fs.mkdirSync(loggerDir);
}

var mainLogger =  bunyan.createLogger({
  name: 'mainLogger',
  streams: [
    {
      level: baseConfig.debug ? 'debug' : 'info',
      stream: process.stdout
    },
    {
      type:'rotating-file',
      level: baseConfig.debug ? 'debug' : 'info',
      path: path.join(loggerDir, '/phototek.log'),
      period: '1d'
    }
  ]
});
module.exports = {
    loggers : {
        main : mainLogger
    }
};
