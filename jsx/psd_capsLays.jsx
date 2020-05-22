//@target photoshop

;(function psd_capsLays() {

  _capsLays();
// _capsSets();

  function _capsLays() {
    for (var i = activeDocument.layers.length - 1; i >= 0; i--) {
      var obj = activeDocument.layers[i];
      __recurseCaps(obj);
    }

    function __recurseCaps(item) {
      item.name = item.name.toUpperCase();

      if (item.typename !== 'LayerSet') return;

      if (!item.layers.length) { // empty set
        item.name = item.name.toUpperCase();
        return;
      }

      for (var i = item.layers.length - 1; i >= 0; i--) { // visible set
        var obj = item.layers[i];
        __recurseCaps(obj);
      }
      return;
    }
  }

  function _capsSets() {
    for (var i = activeDocument.layerSets.length - 1; i >= 0; i--) {
      var setItem = activeDocument.layerSets[i];
      __recursCaps(setItem);
    }

    function __recursCaps(setItem) {
      var setParent = setItem.parent;

      if (!setItem.layers.length) {
        setItem.name = setItem.name.toUpperCase();

        if (setParent.typename != 'Document') {
          __recursCaps(setParent);
        }
        return;
      }

      if (!setItem.layerSets.length) return;

      for (var i = setItem.layerSets.length - 1; i >= 0; i--) {
        var obj = setItem.layerSets[i];
        __recursCaps(obj);
      }
    }

  }

}());