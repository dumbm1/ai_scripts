(function saveCloseAll(){
  if(documents.length == 0) return;
  var confirmClose = confirm ( 'Save all open documents?', '', 'Save All' );

  if ( confirmClose ) {
    try {
      var len = documents.length;
      for ( var i = 0; i < len; i++ ) {
        documents[ i ].save();
        i--;
      }
    } catch ( e ) {
      // alert(e.name + '\n' + e.massage);
    }
  }
}());
