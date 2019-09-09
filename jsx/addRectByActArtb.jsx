//@target illustrator-22

;(function f() {
  try {

    var doc = activeDocument;
    doc.rulerOrigin = [0, doc.height]; // Set Zero point ruler on Document

    var actArtbIndex = doc.artboards.getActiveArtboardIndex(),
        artbRect     = doc.artboards[actArtbIndex].artboardRect,
        lay          = doc.activeLayer,
        RECT_NAME    = '__artboardFilmRectangle__',
        SW_NAME      = 'film';

    try {
      //if (doc.activeLayer.pathItems.getByName(RECT_NAME)) return;
    }
    catch (e) {}

    var sw = _getSw(SW_NAME);
    var filmRect = _addRect();
    filmRect.fillColor = sw;
    filmRect.fillOverprint = false;
    filmRect.stroked = false;
    filmRect.name = RECT_NAME;

  } catch (e) {
    alert('Line: ' + e.line + '\n' + 'Error Message: ' + e.message);
  }

  function _addRect() {

    var rect = [/*[top, left, width, height]*/
      artbRect[1], artbRect[0], artbRect[2], -artbRect[3]
    ];

    return lay.pathItems.rectangle(rect[0], rect[1], rect[2], rect[3]);
  }

  function _getSw(swName) {

    try {
      return doc.swatches.getByName(swName).color;
    } catch (e) {
    }

    var sw = doc.spots.add();

    var col     = new CMYKColor(),
        spotCol = new SpotColor();

    col.black = 30;

    sw.name = swName;
    sw.colorType = ColorModel.SPOT;
    sw.color = col;

    /**
     * if you whant that sw.color == '[SpotColor]' // true
     * else sw.color == '[CMYKColor]' // true
     */
    spotCol.spot = sw;
    spotCol.tint = 100;

    return spotCol;
  }

}());