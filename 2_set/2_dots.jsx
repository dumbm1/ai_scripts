/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 10.12.2015 18:52
 */

face ();

function face () {
  var fontArr = _getFonts ();

  var w = new Window ( 'dialog' );

  var gr_File     = w.add( 'group' ),

      cols        = w.add( 'panel', undefined, 'Colors' ),
      gr_cmyk     = cols.add( 'group' ),
      gr_pant     = cols.add( 'group' ),
      gr_serv     = cols.add( 'group' ),

      dim         = w.add( 'panel', undefined, 'Dimensions' ),
      gr_outline  = dim.add( 'group' ),
      gr_streams  = dim.add( 'group' ),
      gr_margs    = dim.add( 'group' ),
      gr_dots     = dim.add( 'group' ),
      gr_fm       = dim.add( 'group' ),
      gr_cross    = dim.add( 'group' ),

      gr_fnts     = w.add( 'panel', undefined, 'Fonts' ),
      gr_fntNames = gr_fnts.add( 'group' ),
      gr_fntSize  = gr_fnts.add( 'group' ),

      gr_btns     = w.add( 'group' );

  gr_File.add( 'statictext', undefined, "File name" );
  w.fileName = gr_File.add( 'edittext' );

  gr_cmyk.add( 'statictext', undefined, "CMYK" );
  w.colsCmyk = gr_cmyk.add( 'edittext' );
  gr_pant.add( 'statictext', undefined, "Pantones" );
  w.colsPant = gr_pant.add( 'edittext' );
  gr_serv.add( 'statictext', undefined, "Service" );
  w.colsServ = gr_serv.add( 'edittext' );

  gr_outline.add( 'statictext', undefined, "Z" );
  w.z = gr_outline.add( 'edittext' );
  gr_outline.add( 'statictext', undefined, "Film width" );
  w.filmW = gr_outline.add( 'edittext' );

  gr_streams.add( 'statictext', undefined, "Streams width" );
  w.streamsW = gr_streams.add( 'edittext' );

  gr_margs.add( 'statictext', undefined, "Margins" );
  w.margs = gr_margs.add( 'edittext' );

  gr_dots.add( 'statictext', undefined, "Dots size" );
  w.dotsSize = gr_dots.add( 'edittext' );
  gr_dots.add( 'statictext', undefined, "Dots indent" );
  w.dotsIndent = gr_dots.add( 'edittext' );

  gr_fm.add( 'statictext', undefined, "FM left indent" );
  w.fmLeft = gr_fm.add( 'edittext' );
  gr_fm.add( 'statictext', undefined, "FM right indent" );
  w.fmRight = gr_fm.add( 'edittext' );

  gr_cross.add( 'statictext', undefined, "Cross length" );
  w.crossLength = gr_cross.add( 'edittext' );
  gr_cross.add( 'statictext', undefined, "Cross stroke" );
  w.crossStroke = gr_cross.add( 'edittext' );

  w.fntsLst = gr_fntNames.add( 'dropdownlist', undefined, fontArr );
  gr_fntSize.add( 'statictext', undefined, "Size" );
  w.fntsSize = gr_fntSize.add( 'edittext' );

  w.ok = gr_btns.add( 'button', undefined, 'OK' );
  w.canc = gr_btns.add( 'button', undefined, 'Cancel' );

  w.alignChildren = 'left';

  for ( var i = 0; i < fontArr.length; i++ ) {
    if ( fontArr[ i ] == 'ArialMT' ) {
      w.fntsLst.selection = i;
    }
  }

  function _getFonts () {
    var f = [];
    for ( var i = 0; i < textFonts.length; i++ ) {
      f.push( textFonts[ i ].name );
    }
    return f;
  }

  w.show();
  return w;
}