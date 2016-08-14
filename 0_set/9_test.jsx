//var bounds = getRectByVertGap (selection);
//var rect   = activeDocument.pathItems.rectangle(bounds[1], bounds[0], bounds[2] - bounds[0], bounds[1] - bounds[3]);
var bounds = getRectByHorizGap (selection);
var rect   = activeDocument.pathItems.rectangle(bounds[1], bounds[0], bounds[2] - bounds[0], bounds[1] - bounds[3]);

function getTwoWithHorizGap (sel) {

  var tp_bnds = getBounds (sel[0], []),
      bt_bnds = getBounds (sel[1], []);

  if (tp_bnds[2] < bt_bnds[0]) {
    // top item is left, there is a gap between items on the x-axis
    sel[1].selected = false;
    return [tp_bnds, bt_bnds];
  } else if (bt_bnds[2] < tp_bnds[0]) {
    // bottom item is left, there is a gap between items on the x-axis
    sel[0].selected = false;
    return [bt_bnds, tp_bnds];
  } else {
    // there is not gap between items along x-exis
    sel[0].selected = false;
    sel[1].selected = false;
    return false;
  }
}

function getTwoWithVertGap (sel) {

  var tp_bnds = getBounds (sel[0], []),
      bt_bnds = getBounds (sel[1], []);

  if (tp_bnds[3] > bt_bnds[1]) {
    // top item is top, there is a gap between items on the y-axis
    return [tp_bnds, bt_bnds];
  } else if (bt_bnds[3] > tp_bnds[1]) {
    // bottom item is top, there is a gap between items on the y-axis
    return [bt_bnds, tp_bnds];
  } else {
    // there is not gap between items along y-exis
    return false;
  }
}

function getRectByVertGap (sel) {

  var tp_bnds = getBounds (sel[0], []),
      bt_bnds = getBounds (sel[1], []);

  var left, top, right, bottom;

  if (tp_bnds[3] > bt_bnds[1]) {
    // top item is top, there is a gap between items on the Y-axis
    top    = tp_bnds[3];
    bottom = bt_bnds[1];
  } else if (bt_bnds[3] > tp_bnds[1]) {
    // bottom item is top, there is a gap between items on the Y-axis
    top    = bt_bnds[3];
    bottom = tp_bnds[1];
  } else {
    // there is not gap between items along Y-exis
    return false;
  }

  tp_bnds[0] <= bt_bnds[0] ? left = tp_bnds[0] : left = bt_bnds[0];
  tp_bnds[2] >= bt_bnds[2] ? right = tp_bnds[2] : right = bt_bnds[2];

  return [left, top, right, bottom];
}

function getRectByHorizGap (sel) {

  var tp_bnds = getBounds (sel[0], []),
      bt_bnds = getBounds (sel[1], []);

  var left, top, right, bottom;

  if (tp_bnds[2] < bt_bnds[0]) {
    // top item is left, there is a gap between items on the X-axis
    left  = tp_bnds[2];
    right = bt_bnds[0];
  } else if (bt_bnds[2] < tp_bnds[0]) {
    // bottom item is left, there is a gap between items on the X-axis
    left  = bt_btns[2];
    right = tp_bnds[0];
  } else {
    // there is not gap between items along X-exis
    return false;
  }

  tp_bnds[1] >= bt_bnds[1] ? top = tp_bnds[1] : top = bt_bnds[1];
  tp_bnds[3] <= bt_bnds[3] ? bottom = tp_bnds[3] : bottom = bt_bnds[3];

  return [left, top, right, bottom];
}

// сравнить и вернуть самые широкие (с учётом масок) geometricBounds коллекции элементов
function getBounds (selElem, bounds) {
  var clipGroupElems, i, j;

  if (selElem.typename != 'GroupItem') { // любой отдельный элемент неконтейнер
    return selElem.geometricBounds;
  }
  if (selElem.clipped) { // группа с маской => ищем маску
    clipGroupElems = selElem.pathItems;

    for (i = 0; i < clipGroupElems.length; i++) {
      if (clipGroupElems[i].clipping) {
        if (bounds == '') {
          bounds = clipGroupElems[i].geometricBounds;
          continue;
        }
        bounds = _compareBounds (clipGroupElems[i], bounds);
      }
    }
    return bounds;
  }

  // группа без обтравочной маски => цикл по элементам группы
  for (j = 0; j < selElem.pageItems.length; j++) {

    var el = selElem.pageItems [j];

    if (el.typename != 'GroupItem') { // любой pageItem кроме группы
      if (bounds == '') {
        bounds = el.geometricBounds;
        continue;
      }
      bounds = _compareBounds (el, bounds);
    }

    if (el.typename == 'GroupItem' && el.clipped) { // группа с маской => ищем маску
      clipGroupElems = el.pathItems;
      for (i = 0; i < clipGroupElems.length; i++) {
        if (clipGroupElems[i].clipping) {
          if (bounds == '') {
            bounds = clipGroupElems[i].geometricBounds;
            continue;
          }
          bounds = _compareBounds (clipGroupElems[i], bounds);
        }
      }
      continue;
    }

    if (el.typename == 'GroupItem' && !el.groupItems && !el.clipped) { // группа без маски и без групп
      if (bounds == '') {
        bounds = el.geometricBounds;
//          bounds = getBounds ( el.pageItems, bounds );
        continue;
      }
      bounds = _compareBounds (el.geometricBounds, bounds);
      continue;
    }

    if (el.typename == 'GroupItem' && el.groupItems) { // группа без маски, но с группами => рекурсия
      for (var l = 0; l < el.pageItems.length; l++) {
        /* if ( bounds == '' ) {
         bounds = getBounds ( el.pageItems[l], '' );
         }*/
        bounds = getBounds (el.pageItems[l], bounds);
      }
      continue;
    }
  }
  return bounds;

  // сравнить и вернуть самые широкие geometricBounds элемента
  function _compareBounds (elem, boundsToCompare) {
    var elemBounds = elem.geometricBounds;
    elemBounds[0] < boundsToCompare[0] ? boundsToCompare[0] = elemBounds[0] : '';
    elemBounds[1] > boundsToCompare[1] ? boundsToCompare[1] = elemBounds[1] : '';
    elemBounds[2] > boundsToCompare[2] ? boundsToCompare[2] = elemBounds[2] : '';
    elemBounds[3] < boundsToCompare[3] ? boundsToCompare[3] = elemBounds[3] : '';
    return boundsToCompare;
  }

}

