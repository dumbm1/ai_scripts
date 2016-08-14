/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 26.02.2016 13:41
 */
(function recolor_layers () {
  var doc  = activeDocument,
      lays = doc.layers,
      cols = [];

  for ( var i = 0; i < lays.length; i++ ) {
    if ( lays[ i ].color.red == 255 && lays[ i ].color.green == 255 ) {
      lays[ i ].color.red = 255;
      lays[ i ].color.green = 0;
      lays[ i ].color.blue = 0;
    }
  }
  for ( var i = 0; i < lays.length; i++ ) {
    if ( lays[ i ].color.red == 0 && lays[ i ].color.green == 0 && lays[ i ].color.blue == 0 ) {
      lays[ i ].color.red = 0;
      lays[ i ].color.green = 255;
      lays[ i ].color.blue = 0;
    }
  }
  for ( var i = 0; i < lays.length; i++ ) {
    if ( lays[ i ].color.red == 187 && lays[ i ].color.green == 187 && lays[ i ].color.blue == 187 ) {
      lays[ i ].color.red = 0;
      lays[ i ].color.green = 0;
      lays[ i ].color.blue = 255;
    }
  }
  for ( var i = 0; i < lays.length; i++ ) {
    if ( lays[ i ].color.red == 128 && lays[ i ].color.green == 128 && lays[ i ].color.blue == 128 ) {
      lays[ i ].color.red = 153;
      lays[ i ].color.green = 51;
      lays[ i ].color.blue = 255;
    }
  }
  for ( var i = 0; i < lays.length; i++ ) {
    if ( (lays[ i ].color.red == lays[ i ].color.green) && (lays[ i ].color.blue == lays[ i ].color.green) ) {
      lays[ i ].color.red = 255;
      lays[ i ].color.green = 128;
      lays[ i ].color.blue = 0;
    }
  }

  function _makeRandRGB () {
    var cols = [];

    cols.push( _genRGB ( 255, 0, 0 ) ); // reds
    cols.push( _genRGB ( 255, 51, 0 ) );
    cols.push( _genRGB ( 255, 102, 0 ) );

    cols.push( _genRGB ( 0, 255, 0 ) ); // greens
    cols.push( _genRGB ( 0, 204, 0 ) );
    cols.push( _genRGB ( 0, 153, 0 ) );
    cols.push( _genRGB ( 0, 102, 0 ) );

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

} ())


