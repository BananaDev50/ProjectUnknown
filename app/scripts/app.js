
    'use strict';
    
    var _templateBase = './scripts';
    
    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        
        'app.common',
        'app.header'
    ])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default').dark();
    })
    /*.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/test/test.html' ,
                controller: 'testController',
                controllerAs: '_ctrl'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);*/
