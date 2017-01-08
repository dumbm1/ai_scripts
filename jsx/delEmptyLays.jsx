/**
 * ai.jsx MaratShagiev@m_js@bk.ru 17.03.2015
 */
delEmptyLays();

/**
 * recirsively remove empty layers and sublayers
 */
function delEmptyLays() {

  for (var i = 0; i < activeDocument.layers.length; i++) {
    var lay = activeDocument.layers[i];
    if (_hasSubs(lay)) {
      _delSubs(lay);
    }
    // NOTE: trying to remove the only existing layer will lead to its renaming to <layer>
    if (_isEmpty(lay) && activeDocument.layers.length > 1) {
      lay.locked == true ? lay.locked = false : '';
      lay.visible == false ? lay.visible = true : '';
      lay.remove();
      i--;
    }
  }

  /**
   * recursively remove sublayer
   * @param {Object} lay - object of Layer class
   * @return {Object} lay - object of Layer class
   */
  function _delSubs(lay) {
    for (var i = 0; i < lay.layers.length; i++) {
      var thisSubLay = _getSubs(lay)[i];

      if (_isEmpty(thisSubLay)) {
        thisSubLay.locked == true ? thisSubLay.locked = false : '';
        thisSubLay.visible == false ? thisSubLay.visible = true : '';
        thisSubLay.remove();
        i--;
      }

      if (_hasSubs(thisSubLay)) {
        var parent = _delSubs(thisSubLay);
        if (_isEmpty(parent)) {
          thisSubLay.locked == true ? thisSubLay.locked = false : '';
          thisSubLay.visible == false ? thisSubLay.visible = true : '';
          thisSubLay.remove();
          i--;
        }
      }
    }
    return lay;
  }

  /**
   * @param  {Object} lay - object of Layer class
   * @return {Boolean} true, if has sublayers
   */
  function _hasSubs(lay) {
    try {
      return (lay.layers.length > 0);
    } catch (e) {
      return false;
    }
  }

  /**
   * if layer contained object of classes PageItem or Layer
   * @param  {Object} lay - object of Layer class
   * @return {Boolean} true, if layer is empty
   */
  function _isEmpty(lay) {
    try {
      return lay.pageItems.length == 0 && lay.layers.length == 0;
    } catch (e) {
      return false;
    }
  }

  /**
   * get sublayers collection from current layer
   * @param  {Object} lay - object of Layer class
   * @return {Object/Boolean} - collection of Layers or false
   */
  function _getSubs(lay) {
    try {
      return lay.layers;
    } catch (e) {
      return false;
    }
  }
}
