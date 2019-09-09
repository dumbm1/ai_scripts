/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 05.04.2015
 */

function addNewSpot(name, col) {

  var newSpot      = activeDocument.spots.add(),
      newColor     = new CMYKColor(),
      newSpotColor = new SpotColor();

  newColor.cyan    = col[0];
  newColor.magenta = col[1];
  newColor.yellow  = col[2];
  newColor.black   = col[3];

  sw.name = name;
  sw.colorType = ColorModel.SPOT;
  sw.color = newColor;

  newSpotColor.spot = sw;
  newSpotColor.tint = 100;

  return newSpotColor;
}
