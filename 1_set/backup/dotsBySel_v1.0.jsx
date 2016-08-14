/**
 * .jsx for Illustrator ~CC. Marat Shagiev. Date: 05.10.2014
 * todo: добавить интерфейс с настройкой диаметра и величины смещения точки
 * todo: флаги "Запомнить" и "Больше не выводить окно настроек"
 */

var dotsBySel = function () {

  var PT_TO_MM = 2.834645668;
  var lay = _makeLay();          // здесь можно менять имя слоя (например на 'micro-dots')
  var shift = -0.5 * PT_TO_MM;   // здесь можно менять величину смещения (> 0 — внутрь)
  var dotSize = 0.3 * PT_TO_MM;  // здесь можно менять размер микро-точки (например на 0.4)

  var cornerCoord = [
    [_getSelBounds()[0], _getSelBounds()[1]],
    [_getSelBounds()[2], _getSelBounds()[1]],
    [_getSelBounds()[2], _getSelBounds()[3]],
    [_getSelBounds()[0], _getSelBounds()[3]]
  ];

  _makeDot({lay: lay, left: cornerCoord[0][0] + shift, top: cornerCoord[0][1] - shift, });
  _makeDot({lay: lay, left: cornerCoord[1][0] - shift, top: cornerCoord[1][1] - shift, });
  _makeDot({lay: lay, left: cornerCoord[2][0] - shift, top: cornerCoord[2][1] + shift, });
  _makeDot({lay: lay, left: cornerCoord[3][0] + shift, top: cornerCoord[3][1] + shift, });

  function _makeLay(name) {
    var name = name || 'dots@' + ("" + (+new Date()) * Math.random() * 10000).slice(-7, -1);
    var lay = activeDocument.layers.add();
    lay.name = name;
    return lay;
  }

  function _makeDot(o) {
    var lay = o.lay || activeDocument.layers[0];
    var size = o.size || dotSize;
    var top = o.top || 0;
    var left = o.left || 0;
    var shift = o.shift || 0;
    var regColor;
    
    try{
        regColor = app.activeDocument.swatches.getByName('[Registration]');
        } catch (e){
             regColor = app.activeDocument.swatches.getByName('[Совмещение]');
            }

    var dot = lay.pathItems.ellipse(top + size / 2, left - size / 2, size, size);

    dot.fillColor = regColor.color;
    dot.stroked = false;

    return dot;
  }

  function _getSelBounds() {
    var sel = selection;
    var bounds = [];
    for (var i = 0; i < 4; i++) {
      bounds.push(sel[0].geometricBounds[i]);
    }
    for (var i = 1; i < sel.length; i++) {
      var nextBounds = sel[i].geometricBounds;
      nextBounds[0] < bounds[0] ? bounds[0] = nextBounds[0] : '';
      nextBounds[1] > bounds[1] ? bounds[1] = nextBounds[1] : '';
      nextBounds[2] > bounds[2] ? bounds[2] = nextBounds[2] : '';
      nextBounds[3] < bounds[3] ? bounds[3] = nextBounds[3] : '';
    }
    return bounds;
  }
}();