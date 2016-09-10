/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 28.04.2016 19:10
 *
 * closeOther_v0.1
 */

(function closeOther () {
  var confirmClose = confirm ( 'Close all other documents without saving?', '', 'Close other without saving' );

  var aDoc = activeDocument;

  if ( confirmClose ) {
    try {
      var noSave = SaveOptions.DONOTSAVECHANGES;
      var len = documents.length;
      for ( var i = 0; i < len; i++ ) {
        if ( documents[ i ] == aDoc ) continue;
        documents[ i ].close ( noSave );
        i--;
      }
    } catch ( e ) {
      // alert(e.name + '\n' + e.massage);
    }
  }
} ());
