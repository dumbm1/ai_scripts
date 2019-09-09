/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 07.04.2015
 */

/**
 * берёт spot из палитры swatches по имени, а если такого нет, то создаёт новый
 *
 * Пример:
 * var spotCol = setSpotByName ( 'w2', [ 70, 5, 100, 0 ] );
 * var squard = activeDocument.activeLayer.pathItems.rectangle (0, 0, 20, 20)
 * squard.fillColor = spotCol.spot.color;
 *
 * @param {String} name имя плашечного цвета
 * @param {Array} col цветовые компоненты в модели cmyk
 * @return {SpotColor} объект класса SpotColor
 */
function setSpotByName ( name, col ) {

  var sp = _getSpotByNameStrict (),
      sameSpot = _getSameSpot (),
      newSp;

  if ( sp ) { // точное совпадение
    sp = _modifySpot ( sp, false, col );
    return sp;
  } else if ( sameSpot ) {
    sameSpot = _modifySpot ( sameSpot, name, col );
    return sameSpot;
  } else {
    newSp = _addNewSpot ();
    return newSp;
  }

  function _getSpotByNameStrict () {
    for ( var i = 0; i < activeDocument.spots.length; i++ ) {
      if ( activeDocument.spots[ i ].name == name ) {
        return activeDocument.spots[ i ];
      } else {
        continue;
      }
    }
    return false;
  }

  function _getSameSpot () {
    try {
      return activeDocument.spots.getByName ( name );
    } catch ( e ) {
      return false;
    }
  }

  function _addNewSpot () {

    var newSpot = activeDocument.spots.add (),
        newColor = new CMYKColor (),
        newSpotColor = new SpotColor ();

    newColor.cyan = col[ 0 ];
    newColor.magenta = col[ 1 ];
    newColor.yellow = col[ 2 ];
    newColor.black = col[ 3 ];

    sw.name = name;
    sw.colorType = ColorModel.SPOT;
    sw.color = newColor;

    newSpotColor.spot = sw;
    newSpotColor.tint = 100;

    return newSpotColor;
  }

  function _modifySpot ( spot, name, col ) {

    if ( col ) {
      spot.color.cyan = col[ 0 ];
      spot.color.magenta = col[ 1 ];
      spot.color.yellow = col[ 2 ];
      spot.color.black = col[ 3 ];
    }

    if ( name ) {
      spot.name = name;
    }

    return spot;
  }
}