var angular = require('angular');

require('angular-route') ;
require('angular-material') ;
require('angular-messages') ;


require('./loaders/fsloader.js');
require('./viewer');

var phototek = angular.module('phototek', [
                        'phototek.loaders',
                        'phototek.viewer',
                        'ngMaterial',
                        'ngMessages',
                        'ngRoute']);

phototek.controller('ViewerCtrl',['FsLoader','$routeParams',function(fsLoader,$routeParams){
    var self = this;
    this.photos = [];
  
    fsLoader.photos($routeParams.album).then(function(photos){
        self.photos = photos;
    });

}]);

phototek.config(['$routeProvider','$provide','$mdThemingProvider', function ($routeProvider,$provide,$mdThemingProvider) {
    $routeProvider
        .when('/:album', {
            templateUrl     : '/views/viewer.htm',
            controller      : 'ViewerCtrl',
            controllerAs    : 'page'
        })
        .otherwise({redirectTo: '/'});

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue-grey');
}]);
