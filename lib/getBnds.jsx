//@target illustrator
getMaxCollectionBnds(selection, 'geometricBounds');
/**
 * get maximum bounds of the collection of the elements or one element
 *
 * @param {Array/PageItem} collection
 * @param {String} boundsType - geometricBounds or visibleBounds
 * @return {Array} bounds - array af the maximal bounds of the entire colleciton or element
 * */
function getMaxCollectionBnds(collection, boundsType) {
  var bndsType = boundsType || 'geometricBounds';
  var bounds   = _getMaxBnds(collection, []);
  return bounds;
  /**
   * recursive search maximum bounds
   *
   * @param {Object} collection - selection, PageItems or PageItem
   * @param {Array} bounds - last maximal bounds
   * @return {Array} bounds - maximal bound
   * */
  function _getMaxBnds(collection, bounds) {
    var bnds = bounds;
    // case then passed one item rather then true collection
    if (collection.typename == 'PathItem' ||
      collection.typename == 'CompoundPathItem' ||
      collection.typename == 'TextFrame') {
      return _cmprBnds(collection, bnds);
    }
    for (var j = 0; j < collection.length; j++) {
      var el = collection [j];
      // anything PageItem exclude GroupItem
      if (el.typename != 'GroupItem') {
        if (bnds == '') {
          bnds = _getElemBnds(el);
          continue;
        }
        bnds = _cmprBnds(el, bnds);
      }
      // group contains a mask -> search this mask
      if (el.typename == 'GroupItem' && el.clipped) {
        var groupPaths = el.pathItems;

        for (var i = 0; i < groupPaths.length; i++) {
          if (groupPaths[i].clipping) {
            if (bnds == '') {
              bnds = _getElemBnds(groupPaths[i]);
              continue;
            }
            bnds = _cmprBnds(groupPaths[i], bnds);
          }
        }
      }
      // group contains no a mask and a groups
      if (el.typename == 'GroupItem' && !el.clipped && !el.groupItems) {
        if (bnds == '') {
          bnds = _getElemBnds(el);
          continue;
        }
        bnds = _cmprBnds(el[bndsType], bnds);
      }
      // group contains no a mask, but contains a groups -> recurse
      if (el.typename == 'GroupItem' && !el.clipped && el.groupItems) {
        bnds = _getMaxBnds(el.pageItems, bnds);
        continue;
      }
    }
    return bnds;
  }
  /**
   * comparing the geometricBounds of two PageItems
   *
   * @param {PageItem} elem - the object of Illustrator DOM PageItem class
   * @param {Array} boundsToCompare
   * @return {Array} [left, top, right, bottom]
   * */
  function _cmprBnds(elem, bndsToCompare) {
    var elemBnds = _getElemBnds(elem);
    return [
      Math.min(elemBnds[0], bndsToCompare[0]),
      Math.max(elemBnds[1], bndsToCompare[1]),
      Math.max(elemBnds[2], bndsToCompare[2]),
      Math.min(elemBnds[3], bndsToCompare[3])
    ]
  }
  /**
   * get the bounds of one element
   *
   * @param {PageItem} elem - object of PageItem of Illustrator DOM class
   * @return {Array} elemBnds - element bounds
   * */
  function _getElemBnds(elem) {
    var elemBnds;
    if (elem.typename == 'TextFrame') {
      var elemCurvedCopy = elem.duplicate().createOutline();
      elemBnds           = elemCurvedCopy[bndsType];
      elemCurvedCopy.remove();
    } else {
      elemBnds = elem[bndsType];
    }
    return elemBnds;
  }
}
