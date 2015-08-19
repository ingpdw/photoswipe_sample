"use strict";

/*
 * viewer directive
 */
module.exports = function( $s_ ) {
  var $ = require( 'jquery' );
  var PhotoSwipe = require('photoswipe/dist/photoswipe.js');
  var PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.js');

  return {
    restrict: 'ACE',
    replace: true,
    templateUrl: $s_.templateUrl + '/viewer.html',
    link: function(scope, element) {

      var photoSwipe = null, swipeIdx = 0;

      var createPhotoSwipe = function( idx ){
        var pswp = $( '.pswp' )[0];

        photoSwipe = new PhotoSwipe(
              pswp, PhotoSwipeUI_Default, scope.items, {
                index: idx,
                history: false,
                focus: false,
                shareEl: false,
                zoomEl: true,
                arrowEl: true,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
              });

        photoSwipe.listen( 'destroy', function(){
          swipeIdx = 0;
        });

        photoSwipe.init(); //초기화
      };

      scope.$watch( 'items', function( newValue, oldValue ){
          //photoSwipe.items.push( newValue );
          // photoSwipe.invalidateCurrItems();
          // photoSwipe.updateSize(true);
      });

      scope.$on( 'click.image', function( evt, elem, idx ){
        swipeIdx = parseInt( idx ) || 0;
        createPhotoSwipe( swipeIdx );
      });
    }
  };
};
