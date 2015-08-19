"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<img ng-src="{{item.src}}" width="200" height="200"/>',
    link: function( scope, element, attrs ) {
      element.on('click', function() {
        scope.$emit( 'click.image', element, attrs.index );
      });
    }
  };
};
