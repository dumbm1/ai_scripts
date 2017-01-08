/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 17.01.2015
 */

function artbFit2Sel(includeStroke) {
  fitToSel(includeStroke);

  function fitToSel() {
    activeDocument.activeLayer.hasSelectedArtwork = true;
    var artbIndex                                 = activeDocument.artboards.getActiveArtboardIndex();

    if (includeStroke) {
      activeDocument.fitArtboardToSelectedArt(artbIndex);
      return;
    }
    var bounds                                        = [];
    bounds                                            = _getBounds(selection, bounds);
    var w                                             = +_calcElemWidthByBounds(bounds);
    var h                                             = +_calcElemHeightByBounds(bounds);
    activeDocument.artboards[+artbIndex].artboardRect =
      [bounds[0], bounds[1], w + bounds[0], -h + bounds[1]]
  }

  function _getBounds(collection, bounds) {

    for (var j = 0; j < collection.length; j++) {

      var el = collection [j];

      if (el.typename != 'GroupItem') { // любой pageItem кроме группы
        if (bounds == '') {
          bounds = el.geometricBounds;

          continue;
        }
        bounds = _compareBounds(el, bounds);

      }

      if (el.typename == 'GroupItem' && el.clipped) { // группа с маской => ищем маску
        var groupPaths = el.pathItems;

        for (var i = 0; i < groupPaths.length; i++) {
          if (groupPaths[i].clipping) {
            if (bounds == '') {
              bounds = groupPaths[i].geometricBounds;

              continue;
            }
            bounds = _compareBounds(groupPaths[i], bounds);

          }
        }
      }

      if (el.typename == 'GroupItem' && !el.clipped && !el.groupItems) { // группа без маски и без групп
        if (bounds == '') {
          bounds = el.geometricBounds;

          continue;
        }
        bounds = _compareBounds(el.geometricBounds, bounds);

      }

      if (el.typename == 'GroupItem' && !el.clipped && el.groupItems) { // группа без маски, но с группами => рекурсия
        bounds = _getBounds(el.pageItems, bounds);

        continue;
      }
    }
    return bounds;
  }

  // сравнить и вернуть самые широкие geometricBounds
  function _compareBounds(elem, boundsToCompare) {

    var elemBounds = elem.geometricBounds;

    elemBounds[0] < boundsToCompare[0] ? boundsToCompare[0] = elemBounds[0] : '';
    elemBounds[1] > boundsToCompare[1] ? boundsToCompare[1] = elemBounds[1] : '';
    elemBounds[2] > boundsToCompare[2] ? boundsToCompare[2] = elemBounds[2] : '';
    elemBounds[3] < boundsToCompare[3] ? boundsToCompare[3] = elemBounds[3] : '';

    return boundsToCompare;
  }

  // высчитать ширину элемента по его левой и правой границе
  function _calcElemWidthByBounds(bounds) {
    var elemWidth = 0,
        left      = bounds[0],
        right     = bounds[2];

    (left <= 0 && right <= 0) || (left >= 0 && right >= 0) ? elemWidth = Math.abs(left - right) : '';
    left <= 0 && right >= 0 ? elemWidth = Math.abs(left) + right : '';

    return elemWidth;
  }

  // высчитать высоту элемента по его верхней и нижней границе
  function _calcElemHeightByBounds(bounds) {
    var elemHeight = 0,
        top        = bounds[1],
        bottom     = bounds[3];

    (top <= 0 && bottom <= 0) || (top >= 0 && bottom >= 0) ? elemHeight = Math.abs(top - bottom) : '';
    top >= 0 && bottom <= 0 ? elemHeight = top + Math.abs(bottom) : '';
    return elemHeight;
  }
}
