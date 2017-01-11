//@target illustrator-21

/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 07.01.2017
 *
 * randUniqFill_v0.0.2
 *
 * Only PathItem and CompoundPathItem supported
 * */

(function randUniqFill() {
  if (!documents.length) return /*throw new Error('Expected document')*/;
  if (!selection.length) return /*throw new Error('Expected selection')*/;

  var obj = {
    length: function() {
      var i = 0;
      for (var key in this) {
        if (typeof this[key] == 'string') {
          i++;
        }
      }
      return i;
    }
  }
  var sel = selection;

  if (isCmykSpace()) {
    setObjUniqCmyk(obj);
    setCmykFill(obj, sel);
  } else {
    setObjUniqRgb(obj);
    setRgbFill(obj, sel);
  }

  /**
   * LIB
   */
  function setObjUniqRgb(obj) {
    var r, g, b, resRGB;
    for (var j = 0; j < selection.length; j++) {
      _setCoponents();
    }
    while (sel.lenght > obj.length()) {
      _setCoponents();
    }
    function _setCoponents() {
      r           = rndInt(0, 255);
      g           = rndInt(0, 255);
      b           = rndInt(0, 255);
      resRGB      = '' + r + ',' + g + ',' + b;
      obj[resRGB] = resRGB;
    }
  }

  function setObjUniqCmyk(obj) {
    var c, m, y, k, resCMYK;
    for (var j = 0; j < selection.length; j++) {
      _setCmyk();
    }
    while (sel.lenght > obj.length()) {
      _setCmyk();
    }
    function _setCmyk() {
      c            = rndInt(0, 100);
      m            = rndInt(0, 100);
      y            = rndInt(0, 100);
      k            = rndInt(0, 100);
      resCMYK      = '' + c + ',' + m + ',' + y + ',' + k;
      obj[resCMYK] = resCMYK;
    }
  }

  function setRgbFill(obj, sel) {
    var n = 0;
    for (var key in obj) {
      if (typeof obj[key] == 'string') {
        var item = sel[n];
        if (!isPathItem(item.typename)) {
          n++;
          continue;
        }
        var rgbColor   = new RGBColor();
        rgbColor.red   = +key.split(',')[0];
        rgbColor.green = +key.split(',')[1];
        rgbColor.blue  = +key.split(',')[2];
        item.fillColor = rgbColor;
        n++;
      }
    }
  }

  function setCmykFill(obj, sel) {
    var n = 0;
    for (var key in obj) {
      if (typeof obj[key] == 'string') {
        var item = sel[n];
        if (!isPathItem(item.typename)) {
          n++;
          continue;
        }
        var cmykColor     = new CMYKColor();
        cmykColor.cyan    = +key.split(',')[0];
        cmykColor.magenta = +key.split(',')[1];
        cmykColor.yellow  = +key.split(',')[2];
        cmykColor.black   = +key.split(',')[3];
        item.fillColor    = cmykColor;
        n++;
      }
    }
  }

  function isPathItem(typename) {
    return typename == 'CompoundPathItem' || typename == 'PathItem';
  }

  function isCmykSpace() {
    return activeDocument.documentColorSpace == DocumentColorSpace.CMYK;
  }

  /**
   * random INTEGER number from min to max
   *
   * @param {Number} min
   * @param {Number} max
   * @return {Number) rand
   * */
  function rndInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand     = Math.round(rand);
    return rand;
  }
}());
 