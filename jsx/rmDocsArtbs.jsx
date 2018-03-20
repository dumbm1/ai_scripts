//@target illustrator
/**
 * Remove all artboards (except first) in all open documents
 * */
(function rmArtbs() {
  if(!documents.length) return;

  var PROCESS_ALL_ARTBS = true,
      d,
      act_d;

  if(documents.length > 1) {
    PROCESS_ALL_ARTBS = confirm('Process All Open Documents?');
  }

  if (!PROCESS_ALL_ARTBS) {
    d = activeDocument;
    var artbsLen = d.artboards.length;
    for (var j = artbsLen - 1; j >= 0; j--) {
      try {
        d.artboards[j].remove();
      } catch (e) {}
    }
    d.activate();
    illustrator.reveal(new File(activeDocument.fullName));
    redraw();
    return;
  }

  act_d = activeDocument;

  for (var i = 0; i < documents.length; i++) {
    d = documents[i];
    d.activate();
    var artbsLen = d.artboards.length;
    for (var j = artbsLen - 1; j >= 0; j--) {
      try {
        d.artboards[j].remove();
      } catch (e) {}
    }
    redraw();
  }

  act_d.activate();
  illustrator.reveal(new File(activeDocument.fullName));
  redraw();
}());
