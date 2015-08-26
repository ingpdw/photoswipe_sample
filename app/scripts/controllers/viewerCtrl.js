"use strict";

/*
 * viewerCtrl
 */
module.exports =  function( $scope, $s_ ) {
  var dummmmmmmy = 1000;

  $scope.v = $s_.version;

  $scope.photoSwipe = '';

  $scope.items = [];

  console.log( $ );

  //TODO test
  $scope.loadMore = function() {
    var load = $s_.loadData( ++dummmmmmmy );
    load.then(function( data ){
      $scope.items = $scope.items.concat( data );
    }, function(){
    });
  };
};
