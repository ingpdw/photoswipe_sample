"use strict";

/*
 * viewerCtrl
 */
module.exports =  function( $scope, $sce, $s_ ) {
  var dummmmmmmy = 0;

  $scope.v = $s_.version;

  $scope.stylebook = [];

  $scope.productsKey = 0;

  $scope.isDisabledScroll = false;

  //image별 products Map
  //$scope.products = new Map();
  $scope.products = {};

  $scope.loadMore = function() {
    var load = $s_.loadData( ++dummmmmmmy );
    load.then(function( data ){
      var _stylebook = data.stylebook,
          i, len, j, jlen;

      if( data.isLast ){
        $scope.isDisabledScroll = true;
      }

      $.each(_stylebook, function( idx, section ){

        var _images = [],
            _sectionStyles = section.styles;

        //keyword converting(html String)
        section.keyword  = $sce.trustAsHtml( section.keyword );

        $.each( _sectionStyles, function( idx, item ){
          var key = 'product-' + ( ++$scope.productsKey );
          $scope.products[ key ] = item.products;

          $.each( item.images, function( idx, image ){
            //products in images
            //image.products = item.products;
            image.key = key;
          });

          _images = _images.concat( item.images );
        });

        section._customImages = _images;
      });

      $scope.stylebook = $scope.stylebook.concat( _stylebook );
    }, function(){
    });
  };
};
