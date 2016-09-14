(function saveCloseAll(){
  if(documents.length == 0) return;
  var confirmSave = confirm ( 'Save all open documents?', '', 'Save All' );

  if ( confirmSave ) {
    try {
      var docs = documents;
      for ( var i = 0; i < docs.length; i++ ) {
        if (!docs[i].saved) {
          docs[i].activate();
          executeMenuCommand('save');
        }        
      }
    } catch ( e ) {
      // alert(e.name + '\n' + e.massage);
    }
  }
}());
