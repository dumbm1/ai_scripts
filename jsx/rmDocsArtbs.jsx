//@target illustrator
/**
 * Remove all artboards (except first) in all open documents
 * */
for (var i = 0; i < documents.length; i++) {
  var d = documents[i];
  d.activate();
  var artbsLen = d.artboards.length;
  for (var j = artbsLen - 1; j >= 0; j--) {
    try {
      d.artboards[j].remove();
    } catch (e) {}
  }
}