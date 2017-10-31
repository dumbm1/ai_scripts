//@target photoshop

;(function psd_delEmptyAndHidden() {

  _delHiddenLays();
  _delEmptySets();

  function _delHiddenLays() {
    for (var i = activeDocument.layers.length - 1; i >= 0; i--) {
      var obj = activeDocument.layers[i];
      __recurseDel(obj);
    }
    function __recurseDel(item) {
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
        __recurseDel(obj);
      }
      return;
    }
  }

  function _delEmptySets() {
    for (var i = activeDocument.layerSets.length - 1; i >= 0; i--) {
      var setItem = activeDocument.layerSets[i];
      __recursDel(setItem);
    }


    function __recursDel(setItem) {
      var setParent = setItem.parent;


      if (!setItem.layers.length) {
        setItem.remove();
        if (setParent.typename != 'Document') {
          __recursDel(setParent);
        }
        return;
      }

      if (!setItem.layerSets.length) return;

      for (var i = setItem.layerSets.length - 1; i >= 0; i--) {
        var obj = setItem.layerSets[i];
        __recursDel(obj);
      }
    }

  }

}());