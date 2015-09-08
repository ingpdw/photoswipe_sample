'use strict';

var angular = require( 'angular' ); /*require( 'angularjs-ie8-build' );*/
require( 'ng-infinite-scroll' );

var controllers = angular.module('controllers', []),
    directives = angular.module('directives', []),
    services = angular.module('services', []);
    //filters = angular.module('filters', []);

angular.module( 'viewer',
  [ 'infinite-scroll', 'controllers', 'directives', 'services' ]);

/*
 * services
 */
services.service( '$util_',
 require( './services/util' ));

services.service( '$s_',
  ['$http', '$q', '$util_', require( './services/service' )]);

/*
 * controllers
 */
controllers.controller( 'mobileListCtrl',
  ['$scope', '$sce', '$s_', require( './controllers/mobileListCtrl' )]);

controllers.controller( 'mobileViewCtrl',
  ['$scope', '$sce', '$s_', require( './controllers/mobileViewCtrl' )]);

/*
 * directives
 */
directives.directive( 'sbDirective',
  require( './directives/directive' ));

directives.directive( 'mobileImage',
  require( './directives/mobileImage' ));

directives.directive( 'mobileCarousel',
  require( './directives/mobileCarousel' ));

directives.directive( 'mobileList',
  require( './directives/mobileList' ));
