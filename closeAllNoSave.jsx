/**
 * .jsx for Adobe apps by Marat Shagiev  01.11.13
 */
closeAll ();
function closeAll () {
	if(documents.length == 0) return;
  var confirmClose = confirm ( 'Close all open documents without saving?', '', 'Close all without saving' );

  if ( confirmClose ) {
    try {
      var noSave = SaveOptions.DONOTSAVECHANGES;
      var len = documents.length;
      for ( var i = 0; i < len; i++ ) {
        documents[ i ].close ( noSave );
        i--;
      }
    } catch ( e ) {
      // alert(e.name + '\n' + e.massage);
    }
  }
}
