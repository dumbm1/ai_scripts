/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 26.10.2016.
 *
 * swap position of two first selected element
 */
(function swapTwoSel () {
  var aboutCenter = false;
  var a           = selection[0];
  var b           = selection[1];
  var aX          = a.position[0];
  var aY          = a.position[1];
  var bX          = b.position[0];
  var bY          = b.position[1];
  var aW          = a.width;
  var aH          = a.height;
  var bW          = b.width;
  var bH          = b.height;
  var aX_new, aY_new, bX_new, bY_new;

  if (aboutCenter) {
    aX_new                 = bX - (aW - bW) / 2;
    aY_new                 = bY + (aH - bH) / 2;
    bX_new                 = aX - (bW - aW) / 2;
    bY_new                 = aY + (bH - aH) / 2;
    selection [0].position = [aX_new, aY_new];
    selection [1].position = [bX_new, bY_new];
  } else {
    selection[0].position = [bX, bY];
    selection[1].position = [aX, aY];
  }

} ());

