"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<div class="slide--items" data-index="{{$index}}"><img  ng-src="{{item.url}}" alt=""></div>',
    replace: true,
    link: function( scope, element, attrs ) {
      if ( scope.$last ){
        	$( '#slide' + attrs.parentIndex ).owlCarousel({
        		navigation : true, // Show next and prev buttons
        		slideSpeed : 300,
        		paginationSpeed : 400,
        		singleItem: true,
        		autoHeight: true,
        		pagination: false
        	});
      }
    }
  };
};
