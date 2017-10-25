;(function normalize_artboards_names() {
  var d = activeDocument;
  for (var i = d.artboards.length - 1; i >= 0; i--) {
    var artb = d.artboards[i];
    d.artboards.add(artb.artboardRect);
    artb.remove(i);
  }
}());