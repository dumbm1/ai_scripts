/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 29.05.2015
 */
//@target illustrator

replaceSybols ();

function replaceSybols () {
  var artbordsLen = activeDocument.artboards.length,
      symbolsLen  = activeDocument.symbols.length,
      actArtb     = 1,
      stop;

  activeDocument.artboards.setActiveArtboardIndex ( actArtb );
  artbordsLen >= symbolsLen ? stop = symbolsLen : stop = artbordsLen;
  executeMenuCommand ( 'deselectall' ); // compatible with CS6+

  for ( var i = 1; i < stop; i++ ) {
    activeDocument.selectObjectsOnActiveArtboard ();

    for ( var j = 0; j < selection.length; j++ ) {
      if ( selection[ j ].typename == 'SymbolItem' ) {
        selection[ j ].symbol = activeDocument.symbols[ i ];
        break;
      }
    }
    executeMenuCommand ( 'deselectall' ); // compatible with CS6+
    actArtb + 1 != stop ? actArtb += 1 : '';
    activeDocument.artboards.setActiveArtboardIndex ( actArtb );
  }
}
