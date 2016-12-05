var express = require('express'),
	config  = require('./config'),
	fsloader = require('./server/fsLoader'),
	logger = config.loggers.main;

logger.info('PHOTOTEK STARTS');
var app = express();
//Default request interceptor
app.use('/', function (req, resp, next){
      next();
});
//Express modules
app.use('/fsloader',fsloader.router);
//Static serv
app.use('/',express.static(config.paths.publ));
//Index default serv
app.get('/', function(req, res,next) {
	res.sendFile(config.paths.index);
});
//Err serv
app.use(function(err, req, res, next) {
    logger.error(err);
    res.status(500).send('Something broke !');
});
var server = app.listen(config.http.port, function () {
    logger.info('Public listening at http://%s:%s', server.address().address, server.address().port);
});
