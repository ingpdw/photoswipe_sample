"use strict";

module.exports = function(){
  var factory = {};

	factory.getParamFromUrl = function (url, param) {
    var re = new RegExp(".*[?&]" + param + "=([^&]+)(&|$)");
    var match = url.match(re);
    return(match ? match[1] : "");
  };

  factory.serializeData = function( data ) {
      if ( ! angular.isObject( data ) ) {
          return( ( data == null ) ? "" : data.toString() );
      }

      var buffer = [];

      for ( var name in data ) {
          if ( ! data.hasOwnProperty( name ) ) {
              continue;
          }

          var value = data[ name ];

          buffer.push(
              encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
          );
      }
      var source = buffer.join( "&" ).replace( /%20/g, "+" );
      return( source );
  }

	return factory;
};
