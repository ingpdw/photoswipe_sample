"use strict";

/*
 * viewerCtrl
 */
module.exports =  function( $scope, $s_ ) {
  var dummmmmmmy = 1000;

  $scope.v = $s_.version;

  $scope.photoSwipe = '';

  $scope.items = [];

  //TODO test
  $scope.loadMore = function() {
    console.log( dummmmmmmy );
    var load = $s_.loadData( ++dummmmmmmy );
    load.then(function( data ){
      $scope.items = $scope.items.concat( data );
    }, function(){
    });
  };

  $scope.openViewer = function(){
    $scope.$apply(function(){
      $scope.photoSwipe.items = $scope.items;
    });
  };
};
