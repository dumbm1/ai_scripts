/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 04.03.2016
 */

(function recolor_visionless_layers () {
  var doc  = activeDocument,
      lays = doc.layers;

  for ( var i = 0; i < lays.length; i++ ) {

    if (
      (lays[ i ].color.red == 255 && lays[ i ].color.green == 255) ||
      (
        (lays[ i ].color.red == lays[ i ].color.green) &&
        (lays[ i ].color.blue == lays[ i ].color.green)
      )
    ) {

      var col = _makeRandRGB ();

      lays[ i ].color.red = col.red;
      lays[ i ].color.green = col.green;
      lays[ i ].color.blue = col.blue;
    }
  }

  function _makeRandRGB () {
    var cols = [];

    cols.push( _genRGB ( 255, 0, 0 ) ); // reds
    cols.push( _genRGB ( 255, 51, 0 ) );
    cols.push( _genRGB ( 255, 102, 0 ) );
    cols.push( _genRGB ( 204, 0, 0 ) );
    cols.push( _genRGB ( 255, 51, 51 ) );
    cols.push( _genRGB ( 204, 51, 0 ) );
    cols.push( _genRGB ( 153, 51, 0 ) );
    cols.push( _genRGB ( 153, 0, 0 ) );
    cols.push( _genRGB ( 255, 0, 153 ) );
    cols.push( _genRGB ( 255, 51, 153 ) );
    cols.push( _genRGB ( 255, 0, 204 ) );

    cols.push( _genRGB ( 0, 255, 0 ) ); // greens
    cols.push( _genRGB ( 0, 204, 0 ) );
    cols.push( _genRGB ( 0, 153, 0 ) );
    cols.push( _genRGB ( 0, 102, 0 ) );
    cols.push( _genRGB ( 153, 255, 0 ) );
    cols.push( _genRGB ( 102, 255, 0 ) );
    cols.push( _genRGB ( 51, 255, 0 ) );
    cols.push( _genRGB ( 51, 153, 0 ) );
    cols.push( _genRGB ( 0, 255, 51 ) );

    cols.push( _genRGB ( 0, 255, 255 ) ); // blues
    cols.push( _genRGB ( 0, 204, 255 ) );
    cols.push( _genRGB ( 0, 102, 204 ) );
    cols.push( _genRGB ( 0, 102, 255 ) );
    cols.push( _genRGB ( 0, 0, 204 ) );
    cols.push( _genRGB ( 51, 0, 255 ) );
    cols.push( _genRGB ( 51, 0, 204 ) );

    cols.push( _genRGB ( 153, 255, 0 ) ); // violettes
    cols.push( _genRGB ( 153, 204, 0 ) );
    cols.push( _genRGB ( 102, 0, 153 ) );
    cols.push( _genRGB ( 153, 0, 204 ) );
    cols.push( _genRGB ( 204, 0, 204 ) );
    cols.push( _genRGB ( 153, 0, 153 ) );

    return cols[ _randomInteger ( 0, cols.length - 1 ) ];

    function _genRGB ( r, g, b ) {
      var col = new RGBColor ();
      col.red = r;
      col.green = g;
      col.blue = b;
      return col;
    }

    function _randomInteger ( min, max ) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round( rand );
      return rand;
    }
  }

} ());
