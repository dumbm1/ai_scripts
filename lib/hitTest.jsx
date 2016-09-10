/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.08.2016
 */

/**
 * Check the intersection of the bounding boxes of the two items
 * @param{Object} a - object of the PageItem Illustrator DOM class
 * @param{Object} b - object of the PageItem Illustrator DOM class
 * @return{Boolean}
 * */
function _hitTest (a, b) {
  var ok = 0;
  if (__isWithinX (a, b) || __isWithinX (b, a)) {
    ok++;
  }
  if (__isWithinY (a, b) || __isWithinY (b, a)) {
    ok++;
  }
  if (ok < 2) {
    return false;
  } else {
    return true;
  }

  function __isWithinX (a, b) {
    var p1 = a.geometricBounds[0];
    var p2 = b.geometricBounds[0];
    if (p2 <= p1 && p1 <= p2 + b.width) {
      return true;
    } else {
      return false;
    }
  }

  function __isWithinY (a, b) {
    var p3 = a.geometricBounds[1];
    var p4 = b.geometricBounds[1];
    if (p3 >= p4 && p4 >= (p3 - a.height)) {
      return true;
    }
    return false;
  }
}