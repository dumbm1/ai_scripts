/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 18.01.2015
 */

activeDocument.activeLayer.hasSelectedArtwork = true;

(function () {
  try {
    if ( true && selection.length > 1 ) {
      var gr = activeDocument.activeLayer.groupItems.add ();
      for ( var i = 0; i < selection.length; i++ ) {
        var el = selection[ i ];
        el.move ( gr, ElementPlacement.PLACEATEND );
      }
    }
  } catch ( e ) {
    try { if ( gr )gr.remove ()} catch ( e ) { }
  }
})

  // no-selection variant
( function () {
  try {
    if ( activeDocument.activeLayer.pageItems.length > 1 ) {
      var gr = activeDocument.activeLayer.groupItems.add ();
      for ( var i = 0; i < activeDocument.activeLayer.pageItems.length; i++ ) {
        var el = activeDocument.activeLayer.pageItems[ i ];
        if ( el != gr ) {
          el.move ( gr, ElementPlacement.PLACEATEND );
          i--;
        }
      }
    }
  } catch ( e ) {
    try { if ( gr )gr.remove ()} catch ( e ) { }
  }
} );
