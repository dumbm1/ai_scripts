/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 21.05.2016
 */

//@target illustrator-18
// for example:
alert (getBoundsExtend (selection[0]));

/**
 * get item bounds, width and height
 *
 * @param {PageItem} item - object of Illustrator PageItem class
 * @return {Array} bounds [ [ left, top, right, bottom ], width, height ]
 */
function getBoundsExtend (item) {
  if (arguments.length == 0) return false;
  try {
    if (item.typename == undefined) return false;
  } catch (e) {
    return false;
  }

  var bounds = _getBounds (item, []),
      width  = _calcElemWidthByBounds (bounds),
      height = _calcElemHeightByBounds (bounds),
      result = [bounds, width, height];

  return result;

  /**
   * LIB
   * */

  /**
   * recursive search of maximal bounds
   * @param {PageItem} item - object of Illustrator PageItem class
   * @param {Array} bounds - [ left, top, right, bottom ] (ampty array on start)
   * */
  function _getBounds (item, bounds) {
    var clipGroupElems, i, j;

    if (item.typename != 'GroupItem') { // any single container element
      return item.geometricBounds;
    }
    if (item.clipped) { // group with mask => search the mask
      clipGroupElems = item.pathItems;

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

    // group without mask => detour of group elements
    for (j = 0; j < item.pageItems.length; j++) {

      var el = item.pageItems [j];

      if (el.typename != 'GroupItem') { // some pageItem exept group
        if (bounds == '') {
          bounds = el.geometricBounds;
          continue;
        }
        bounds = _compareBounds (el, bounds);
      }

      if (el.typename == 'GroupItem' && el.clipped) { // group with mask => search the mask
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

      if (el.typename == 'GroupItem' && !el.groupItems && !el.clipped) { // group without mask and without child groups
        if (bounds == '') {
          bounds = el.geometricBounds;
          continue;
        }
        bounds = _compareBounds (el.geometricBounds, bounds);
        continue;
      }

      if (el.typename == 'GroupItem' && el.groupItems) { // group without mask but contains groups => recursion
        for (var l = 0; l < el.pageItems.length; l++) {
          bounds = getBounds (el.pageItems[l], bounds);
        }
        continue;
      }
    }
    return bounds;

    /**
     * @param{PageItem} item - some object of the Illustrator PageItem class
     * @param{Array} boundsToCompare - [ left, top, right, bottom ]
     * @return{Array} result - the biggest bounds
     * */
    function _compareBounds (item, boundsToCompare) {
       var elemBounds = elem.geometricBounds;

           return [
                Math.min(elemBounds[0], boundsToCompare[0]), 
                Math.max(elemBounds[1],boundsToCompare[1]), 
                Math.max(elemBounds[2],boundsToCompare[2]), 
                Math.min(elemBounds[3],boundsToCompare[3])
        ]
  }

// calculate item width by it left and right bounds
  function _calcElemWidthByBounds (bounds) {
    var elemWidth = 0,
        left      = bounds[0],
        right     = bounds[2];

    (left <= 0 && right <= 0) || (left >= 0 && right >= 0) ? elemWidth = Math.abs (left - right) : '';
    left <= 0 && right >= 0 ? elemWidth = Math.abs (left) + right : '';

    return elemWidth;
  }

// calculate item height by it top and bottom bounds
  function _calcElemHeightByBounds (bounds) {
    var elemHeight = 0,
        top        = bounds[1],
        bottom     = bounds[3];

    (top <= 0 && bottom <= 0) || (top >= 0 && bottom >= 0) ? elemHeight = Math.abs (top - bottom) : '';
    top >= 0 && bottom <= 0 ? elemHeight = top + Math.abs (bottom) : '';
    return elemHeight;
  }

}
