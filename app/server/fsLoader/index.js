var express = require('express'),
    path    = require('path'),
    fs    = require('fs'),
    extend    = require('extend'),
    Promise = require('promise'),
    mime = require('mime'),
    bodyParser  = require('body-parser'),
    config      = require('../../config'),
    logger      = config.loggers.main;

var fsLoader = {};
var router = fsLoader.router = express.Router();
router.use(bodyParser.json());

router.get('/:album', function(req, res) {
	var _dir = config.fsLoader.paths[req.params.album];
	if(!_dir || !fs.existsSync(_dir)){
		 res.sendStatus(404);
		 return;
	}
    var files = fs.readdirSync(_dir).map(function(file){
        var _path = path.join(_dir,file);
        var fileStats = fs.statSync(_path);
        if(fileStats.isDirectory()) return null;
        return extend({},{
                                photo : file
                            });
    }).filter(function(file){
        return file !== null;
    });
	res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, { 'Connection': 'close' });

    res.end(JSON.stringify({
        status : 'OK',
        photos: files
    }));
});

router.get('/:album/:photo', function(req, res) {
	var _dir = config.fsLoader.paths[req.params.album];
	if(!_dir || !fs.existsSync(_dir)){
		 res.sendStatus(404);
		 return;
	}
	var file = path.join(_dir,req.params.photo);
	if(!fs.existsSync(file) ){
		 res.sendStatus(404);
		 return;
	}

  	res.setHeader('Content-type',  mime.lookup(file));
 	fs.createReadStream(file).pipe(res);
});

module.exports = fsLoader;