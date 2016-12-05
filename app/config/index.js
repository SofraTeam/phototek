var extend = require('extend');
module.exports = extend(
					require('./config.base.js'),
                 	require('./config.loggers.js'),
                 	require('./config.express.js'),
                 	require('./config.fsloader.js')
                );
