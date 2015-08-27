"use strict";

/*
 * mobileViewCtrl
 */
module.exports =  function( $scope, $sce, $s_ ) {
  var dummmmmmmy = 0;

  $scope.v = $s_.version;

  $scope.list = [];

  $scope.views = [];

  $scope.productsKey = 0;

  $scope.isDisabledScroll = false;

  //image별 products Map
  //$scope.products = new Map();
  $scope.products = {};


  $scope.loadView = function() {
    var load = $s_.loadView( ++dummmmmmmy );
    load.then(function( data ){

      var _styles = data.styles, temp = [];;

      $.each( _styles, function( idx, _style ){
        var images =  {item: _style.images, type: 'images'};
        var products = {item: _style.products, type: 'products'};
        temp.push( images );
        temp.push( products );
      });

      $scope.views = $scope.views.concat( temp );


      console.log( $scope.views );
    }, function(){
    });
  }

  $scope.loadList = function() {
    var load = $s_.loadList( ++dummmmmmmy );
    load.then(function( data ){


      var _list = data.list;

      console.log( _list );

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
