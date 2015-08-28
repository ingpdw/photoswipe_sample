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
    //templateUrl: $s_.templateUrl + '/viewer.html',
    link: function(scope, element) {

  		$(".fbphotobox img").fbPhotoBox({
  			rightWidth: 247, // content size + scrollbar
  			// minLeftWidth: 423,
  			minHeight: 600,
  			normalModeMargin: 40,
  			leftBgColor: "transparent",
  			rightBgColor: "transparent",
  			footerBgColor: "transparent",
  			overlayBgColor: "#000",
  			overlayBgOpacity: 0.9,
  			imageOverlayFadeSpeed: 150,
  			containerClassName: 'fbphotobox',
  			imageClassName: 'photo',
  			onImageShow: function() {

          //var image = $('.' + $this.settings.containerClassName + ' .' + $this.settings.imageClassName).get($this.leftArrow.attr("data-prev-index"));

          //var key = $( this ).data( 'product-key' )
          var key =  $( this ).attr( 'data-product-key' ),
              tmp = [], products = scope.products[ key ],
              _template = '<li class="product--items"><a href="{{url}}"><img src="{{image}}" alt=""></a></li>';

          $.each( products, function( idx, item ){
              tmp.push( _template
              .replace( /{{image}}/g, item.image.url )
              .replace(/{{url}}/g, item.idx));
          });

  				$( '#viewer-product-list' ).empty().html( tmp.join( '' ) );

  			}
  		});
    }
  };
};
