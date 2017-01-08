(function saveCloseAll(){
  if(documents.length == 0) return;
  var confirmClose = confirm ( 'Save all open documents and close?', '', 'Save & Close' );

  if ( confirmClose ) {
    try {
      var yesSave = SaveOptions.SAVECHANGES;
      var len = documents.length;
      for ( var i = 0; i < len; i++ ) {
        documents[ i ].close ( yesSave );
        i--;
      }
    } catch ( e ) {
      // alert(e.name + '\n' + e.massage);
    }
  }
}());
