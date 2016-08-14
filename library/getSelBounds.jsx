/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 12.01.2015
 */

alert ( getSelBounds () );

/**
 * взять selection.bounds:  [left, top, right, bottom]
 *
 * @return {Array} bounds Координаты выделенной области
 */
function getSelBounds () {

  activeDocument.rulerOrigin = [ 0, activeDocument.height ];

  var sel = selection,
      bounds = [];

  for ( var i = 0; i < 4; i++ ) {
    bounds.push ( sel[ 0 ].geometricBounds[ i ] );
  }

  for ( var i = 1; i < sel.length; i++ ) {
    var nextBounds = sel[ i ].geometricBounds;

    nextBounds[ 0 ] < bounds[ 0 ] ? bounds[ 0 ] = nextBounds[ 0 ] : '';
    nextBounds[ 1 ] > bounds[ 1 ] ? bounds[ 1 ] = nextBounds[ 1 ] : '';
    nextBounds[ 2 ] > bounds[ 2 ] ? bounds[ 2 ] = nextBounds[ 2 ] : '';
    nextBounds[ 3 ] < bounds[ 3 ] ? bounds[ 3 ] = nextBounds[ 3 ] : '';
  }

  for ( var i = 0; i < bounds.length; i++ ) {
    i % 2 ? bounds[ i ] = -Math.round ( bounds[ i ] * 1e5 / 1e5 ) : bounds[ i ] = Math.round ( bounds[ i ] * 1e5 / 1e5 )
  }

  return bounds;
}
