"use strict";

/*
 * viewer directive
 */
module.exports = function( $s_ ) {

  var $ = require('../../libs/FBPhotoBox/js/fbphotobox.js' );
  //var $ = require('../../libs/FBPhotoBox/js/fbphotobox_not_anim.js' );

  return {
    restrict: 'ACE',
    replace: true,
    templateUrl: $s_.templateUrl + '/viewer.html',
    link: function(scope, element) {
  		$( '.fbphotobox img' ).fbPhotoBox({
  			rightWidth: 360,
  			leftBgColor: '#000000',
  			rightBgColor: '#ffffff',
  			footerBgColor: '000000',
  			overlayBgColor: '#000000',
  			containerClassName: 'fbphotobox',
  			imageClassName: 'photo',
  			onImageShow: function(){

          console.log( $( this )[ 0 ] );

  				$( '.fbphotobox-image-content' ).html('<div>'+ $( this ).attr( 'data-img-id' )+'</div>');
  			}
      });

      // scope.$watch( 'items', function( newValue, oldValue ){
      //     photoSwipe.items.push( newValue );
      //     photoSwipe.invalidateCurrItems();
      //     photoSwipe.updateSize(true);
      // });

      // scope.$on( 'click.image', function( evt, elem, idx ){
      //   swipeIdx = parseInt( idx ) || 0;
      //   createPhotoSwipe( swipeIdx );
      // });
    }
  };
};
