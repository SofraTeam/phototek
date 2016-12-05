var angular = require('angular');

angular.module('phototek.loaders',[])
    .factory('FsLoader',['$http',function($http){
    	return {
    		photos : function(album){
    			return  $http({	method: 'GET',
	                    		url: '/fsloader/'+album
		                }).then(function(res){ 
		                	return res.data.photos.map(function(f){
		                		 f.src = '/fsloader/'+album+'/'+f.photo;
		                		 return f;
		                	});
		                },function(err){
		                    console.dir(err);
		                });
    		}
    	};
    }]);