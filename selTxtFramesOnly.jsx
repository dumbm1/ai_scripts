/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 01.09.2016
 *
 * selTxtFramesOnly_v1.0
 * compatible cs6+
 *
 * Selcected all the text frames on the processed area (selection or active layer)
 *
 * processed selected objects if any
 * processed active layer if no selected items
 *
 * todo: Processing the sublayers
 */
//@target illustrator-19

(function selTxt () {
  var ad = activeDocument,
      al = ad.activeLayer,
      obj;

  if (!selection.length) {
    if (!al.visible || al.locked) return;

    var items = al.pageItems;
    if (!items.length) return;

    for (var k = 0; k < al.pageItems.length; k++) {
      obj = al.pageItems[k];
      _recursActLay (obj);
    }
  } else {
    var sel = selection;
    executeMenuCommand ('deselectall');
    for (var i = 0; i < sel.length; i++) {
      obj = sel[i];
      _recursSel (obj);
    }
  }

  function _recursActLay (obj) {
    switch (obj.typename) {
      case 'TextFrame':
        if (!obj.hidden && !obj.locked && obj.editable) {
          obj.selected = true;
        }
        break;
      case 'GroupItem':
        if (!obj.hidden && !obj.locked && obj.editable) {
          for (var j = 0; j < obj.pageItems.length; j++) {
            _recursSel (obj.pageItems[j]);
          }
        }
        break;
      default:
        break;
    }
  }

  function _recursSel (obj) {
    switch (obj.typename) {
      case 'TextFrame':
        obj.selected = true;
        break;
      case 'GroupItem':
        for (var j = 0; j < obj.pageItems.length; j++) {
          _recursSel (obj.pageItems[j]);
        }
        break;
      default:
        break;
    }
  }
} ());
