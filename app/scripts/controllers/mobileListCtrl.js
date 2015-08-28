"use strict";

/*
 * mobileListCtrl
 */
module.exports =  function( $scope, $sce, $s_ ) {
  var dummmmmmmy = 0;

  $scope.v = $s_.version;

  $scope.list = [];

  $scope.productsKey = 0;

  $scope.isDisabledScroll = false;

  //image별 products Map
  //$scope.products = new Map();
  $scope.products = {};


  $scope.loadView = function() {

  }

  $scope.loadList = function() {
    var load = $s_.loadList( ++dummmmmmmy );
    load.then(function( data ){


      var _list = data.list;

      if( data.isLast ){
        $scope.isDisabledScroll = true;
      }

      $.each(_list, function( idx, item ){
        item.keyword  = $sce.trustAsHtml( item.keyword );
      });

      $scope.list = $scope.list.concat( _list );
    }, function(){
    });
  };
};
