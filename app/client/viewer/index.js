var angular = 	require('angular'),
	$ 		= 	require('jquery');

require('../utils');

angular.module('phototek.viewer', ['phototek.utils'])
	   .directive('ftkviewer',['$window','$document','$interval',function($window,$document,$interval){
	   		return {
	   			scope :{
	   				photos : '=',
	   				minWidth : '@',
	   				rawHeight : '@'
	   			},
	   			templateUrl : '/views/tmpl/viewer/template.htm',
	   			replace: true,
	   			controller : ['$scope',function($scope){
	   				var _indexedDoms = [],
	   					_self = this,
	   					_current = null;
	   				this.handle = function(index,dom){
	   					_indexedDoms[index] = dom.element[0];
	   				};
					this.zoomin = function(photo,index){
						$scope.photos.unshift($scope.photos.splice(index,1)[0]);
						_current = $scope.photos[0];
						$(_indexedDoms[0]).animate({
							width : ($scope.cardWidth * ($scope.columns -1))  + 'px',
							height : (200 * ($scope.columns -1) ) + 'px'
						},{
							duration : 1000,
							complete : function(){
							
							}
						});

					};

	   			}],
	   			controllerAs : 'viewer',
	   			link : function(scope,element,attribs){
	   				scope.$watch('photos',function(){
						var win = angular.element($window),
		   					minWidth = scope.minWidth ? scope.minWidth : 300,
		   					resizeInterval;
		   				scope.photos.forEach(function(photo,index){
		   					if(!photo._scale) photo._scale = 1;
		   				});

	   					scope.resize = function(){
	   						var baseRect = element[0].getBoundingClientRect() ,
	   					 		baseWidth = baseRect.right - baseRect.left - 30,
	   					 		sortLength;
	   					 	scope.columns = Math.floor(baseWidth / minWidth) ;
	   						scope.cardWidth = (scope.columns === 1 ? baseWidth :  minWidth + Math.floor((baseWidth % minWidth) / scope.columns)) -1 ;
	   					};
						scope.resize();
						win.bind('resize', function () {
						    scope.resize();
						    scope.$apply();
						});
	   				});
	   			}
	   		};
		}]);