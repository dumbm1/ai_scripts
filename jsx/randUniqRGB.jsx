/**
 * Adobe ExtendScript for Illustrator CS4+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 07.01.2017
 * */

//@target illustrator

// randUniqRGB();
function randUniqRGB (){
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
  for (var j = 0; j < selection.length; j++) {
    var r       = rndInt(0, 255);
    var g       = rndInt(0, 255);
    var b       = rndInt(0, 255);
    var resRGB  = '' + r + ',' + g + ',' + b;
    obj[resRGB] = resRGB;
  }
  while (sel.lenght > obj.length()) {
    r           = rndInt(0, 255);
    g           = rndInt(0, 255);
    b           = rndInt(0, 255);
    resRGB      = '' + r + ',' + g + ',' + b;
    obj[resRGB] = resRGB;
  }
  var n = 0;
  for (var key in obj) {
    if (typeof obj[key] == 'string') {
      var item       = sel[n];
      var col        = new RGBColor();
      col.red        = +key.split(',')[0];
      col.green      = +key.split(',')[1];
      col.blue       = +key.split(',')[2];
      item.fillColor = col;
      n++;
    }
  }
  /**
   * random INTEGER number from min to max
   * @param {Number} min
   * @param {Number} max
   * */
  function rndInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand     = Math.round(rand);
    return rand;
  }
}
 