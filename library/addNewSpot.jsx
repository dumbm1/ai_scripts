/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 05.04.2015
 */

function addNewSpot (name, col) {

  var newSpot = activeDocument.spots.add (),
      newColor = new CMYKColor (),
      newSpotColor = new SpotColor ();

  newColor.cyan = col[ 0 ];
  newColor.magenta = col[ 1 ];
  newColor.yellow = col[ 2 ];
  newColor.black = col[ 3 ];

  newSpot.name = name;
  newSpot.colorType = ColorModel.SPOT;
  newSpot.color = newColor;

  newSpotColor.spot = newSpot;
  newSpotColor.tint = 100;

  return newSpotColor;
}
