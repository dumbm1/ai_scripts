//@target photoshop

;(function psd_delUnvisible() {

  for (var i = activeDocument.layers.length - 1; i >= 0; i--) {
    var obj = activeDocument.layers[i];
    _recurse(obj);
  }
  function _recurse(item) {
    if (!item.visible) { // any unvisible item
      item.remove();
      return;
    }
    if (item.typename != 'LayerSet') return; // visible artLayer

    if (!item.layers.length) { // empty set
      item.remove();
      return;
    }

    for (var i = item.layers.length - 1; i >= 0; i--) { // visible set
      var obj = item.layers[i];
      _recurse(obj);
    }
    return;
  }

}());