recolSpotSG();

function recolSpotSG(){
  /* js+aisc5 plain */

  var colInf = app.activeDocument.groupItems.getByName('__[colorMarksGroup]__');
  /*группа, в которой живет надпись на рельсе*/
  var layoutInfGroup = app.activeDocument.groupItems.getByName('__$layoutInfGroup$__');

  applySpotColInf();
  makeRegistration();
  applySpotFill(20, '__$railGroup$__');
  applySpotStroke('__$crossGroup$__');
  applySpotFill(100, '__[colorMarksGroup]__');
  makeCMYK();

  /*перекрашивает в пантоны буквенные обозначения цветов в рельсе*/
  function applySpotColInf() {

    var txtFrames = colInf.textFrames;
    var sw = app.activeDocument.swatches; // взять все цвета в палитре

    /*цикл по фреймам каждый фрейм - обозначение отдельного цвета*/
    outer:
      for (var i = 0; i < txtFrames.length; i++) {

        // перебор swatches и сравнение с именем фрейма
        for (var l = 0; l < sw.length; l++) {
          if (txtFrames[i].name != sw[l].name) {
            continue; // имя не совпало, продолжаем перебирать палитру
          } else if (txtFrames[i].name == sw[l].name) {

            // перебор букв в текущем фрейме
            for (var n = 0; n < txtFrames[i].textRange.characters.length; n++) {
              var charAttr = txtFrames[i].textRange.characters[n].characterAttributes;
              charAttr.fillColor = sw[l].color;
            }
            continue outer; // идем к следующему фрейму
          }
        }
        /* соответствующий swatch не найден, значит создаем новый */
        var charAttr = txtFrames[i].textRange.characters[0].characterAttributes;
        var c = Math.round(charAttr.fillColor.cyan);
        var m = Math.round(charAttr.fillColor.magenta);
        var y = Math.round(charAttr.fillColor.yellow);
        var k = Math.round(charAttr.fillColor.black);

        var colName = txtFrames[i].name;
        var spotCol = new SpotColor();
        spotCol.spot = makeSpot(colName, c, m, y, k);

        //rails[n].fillColor = spotCol; // рельса получает цвет - пантон
        // перебор букв в текущем фрейме и заливка в спот
        for (var n = 0; n < txtFrames[i].textRange.characters.length; n++) {
          var charAttr = txtFrames[i].textRange.characters[n].characterAttributes;
          charAttr.fillColor = spotCol;
        }
      }
  }

  /*строку с инфой о верстке красит в registration*/
  function makeRegistration() {

    /*цвет Registration из палитры swatches*/
    var regColor = app.activeDocument.swatches.getByName('[Registration]');
    /*информация на рельсе*/
    var layoutInf = app.activeDocument.textFrames.getByName('__$layoutInf$__');
    var charCount = layoutInf.textRange.characters.length
    var chars = layoutInf.textRange.characters;
    for (var i = 0; i < chars.length; i++) {
      chars[i].characterAttributes.fillColor = regColor.color;
      chars[i].characterAttributes.overprintFill = true;
    }
  }

  /*создает spot с указанным значением cmyk*/
  function makeSpot(name, c, m, y, k) {

    var pantone = app.activeDocument.spots.add(); // add new color to swatches palette
    var cmyk = new CMYKColor(); // color components

    cmyk.cyan = c;
    cmyk.magenta = m;
    cmyk.yellow = y;
    cmyk.black = k;

    pantone.color = cmyk;
    pantone.colorType = ColorModel.SPOT;
    pantone.name = name;
    return pantone;
  }

  /*ф-ция красит рельсы в указанный процент от пантона*/
  function applySpotFill(persent, itemName) {

    itemName = itemName || '__$railGroup$__';

    var sw = app.activeDocument.swatches; // взять все цвета в палитре

    /* взять все группы, потом взять группу по имени, в этой группе взять pathItems */
    var groups = app.activeDocument.groupItems;
    var railsGroup = groups.getByName(itemName);
    var rails = railsGroup.pathItems;

    outer: for (var n = 0; n < rails.length; n++) {

      for (var i = 0; i < sw.length; i++) { // перебор палитры swatches
        /* сравнение имени рельсы с именем цвета в палитре  swtches */
        if (rails[n].name != sw[i].name) {
          continue; // имя не совпало, продолжаем перебор палитры swatches

          /* имя совпало, значим красим рельсу в этот swatch */
        } else if (rails[n].name == sw[i].name) {
          rails[n].fillColor = sw[i].color;
          rails[n].fillColor.tint = persent;
          continue outer; // взять следующую рельсу
        }
      }
      /* соответствующий swatch не найден, значит создаем новый */
      var c = Math.round(rails[n].fillColor.cyan);
      var m = Math.round(rails[n].fillColor.magenta);
      var y = Math.round(rails[n].fillColor.yellow);
      var k = Math.round(rails[n].fillColor.black);

      var colName = rails[n].name;
      var spotCol = new SpotColor();
      spotCol.spot = makeSpot(colName, c, m, y, k);
      spotCol.tint = persent;

      rails[n].fillColor = spotCol; // рельса получает цвет - пантон
    }

  }

  /* красит кресты в пантоны */
  function applySpotStroke(itemName) {

    itemName = itemName || '__$crossGroup$__';

    var sw = app.activeDocument.swatches; // взять все цвета в палитре

    /* взять все группы, потом взять группу по имени, в этой группе взять pathItems */
    var crossGroup = app.activeDocument.groupItems.getByName(itemName);
    var cross = crossGroup.groupItems;

    outer: for (var n = 0; n < cross.length; n++) {

      for (var i = 0; i < sw.length; i++) { // перебор палитры swatches
        /* сравнение имени рельсы с именем цвета в палитре  swtches */
        if (cross[n].name != sw[i].name) {
          continue; // имя не совпало, продолжаем перебор палитры swatches

          /* имя совпало, значим красим рельсу в этот swatch */
        } else if (cross[n].name == sw[i].name) {
          cross[n].pathItems[0].strokeColor = sw[i].color;
          cross[n].pathItems[1].strokeColor = sw[i].color;
          continue outer; // взять следующую рельсу
        }
      }
      /* соответствующий swatch не найден, значит создаем новый */
      var c = Math.round(cross[n].strokeColor.cyan);
      var m = Math.round(cross[n].strokeColor.magenta);
      var y = Math.round(cross[n].strokeColor.yellow);
      var k = Math.round(cross[n].strokeColor.black);

      var colName = cross[n].name;
      var spotCol = new SpotColor();
      spotCol.spot = makeSpot(colName, c, m, y, k);

      /*красим крест в пантон*/
      cross[n].pathItems[0].strokeColor = spotCol;
      cross[n].pathItems[1].strokeColor = spotCol;
    }

  }

  /*удаляет из swatches Process и самодельный White
   * преврящая их в обычный CMYK и белый, соответственно*/
  function makeCMYK() {
    var sw = app.activeDocument.swatches;

    try {
      sw['PANTONE Process Cyan C'].remove();
    } catch (e) {
    }
    try {
      sw['PANTONE Process Magenta C'].remove();
    } catch (e) {
    }
    try {
      sw['PANTONE Process Yellow C'].remove();
    } catch (e) {
    }
    try {
      sw['PANTONE Process Black C'].remove();
    } catch (e) {
    }
    try {
      sw['PANTONE White C'].remove();
    } catch (e) {
    }
  }
}