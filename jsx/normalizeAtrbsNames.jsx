;(function normalize_artboards_names() {
  var d = activeDocument;
  var len = d.artboards.length;
  for (var i = len - 1; i >= 0; i--) {
    var artb = d.artboards[i];
    d.artboards.insert(artb.artboardRect, i + 1);
    artb.remove(i);
  }
}());