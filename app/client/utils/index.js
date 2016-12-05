var angular = require('angular');

angular.module('phototek.utils',[])
	   	.directive('ftkDom',['$window',function($window){
	   		return {
	   			restrict: 'A',
				compile: function() {
				    return {
				      	pre: function(scope, element, attrs) {
				      		scope.$dom = {
				      			element : element,
				      			attrs : attrs
				      		};
				        	scope.$eval(attrs.ftkDom);
				      	}
				    };
				}
	   		};
		}]);