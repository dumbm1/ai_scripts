/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 22.12.2016
 * */
//@target illustrator
(function recolLays(lays) {
  for (var i = 0; i < lays.length; i++) {
    if (lays[i].layers.length) recolLays(lays[i].layers);
    lays[i].color = _getRandRgb();
  }
  function _getRandRgb() {
    var rgbCol   = new RGBColor();
    rgbCol.red   = __randInt(0, 255);
    rgbCol.green = __randInt(0, 255);
    rgbCol.blue  = __randInt(0, 255);
    return rgbCol;
    function __randInt(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand     = Math.floor(rand);
      return rand;
    }
  }
}(activeDocument.layers));
