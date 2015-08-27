"use strict";

/*
 * image directive
 */
module.exports = function() {
  return {
    restrict: 'ACE',
    template: '<li class="keyword--items"><a href="#?{{item.idx}}"><img ng-src="{{item.image.url}}" alt=""></a></li>',
    replace: true,
    link: function( scope, element, attrs ) {
    }
  };
};
