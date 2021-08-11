/**
 * ai_CS5-2021.jsx ©MaratShagiev m_js@bk.ru 11.08.2021
 *
 * Генератор кода EAN 13 (доп. символ - на заказ опционально)
 *
 * Проверено в Illustrator CS5, 2021.
 * Тип интерфейса - плавающая панель.
 * Обязательное условие - шрифт OCRB10PitchBT-Regular - приложен (выбор шрифтов - на заказ опционально).
 * Код помещается на активный слой, который должен быть видим и разлочен.
 * Контроль ввода: 12 символов, только цифровые символы
 (тут есть особенность - при ошибочном вводе курсор слетает в начало поля ввода).
 * Запоминает предыдущее положение панели (в файле <имя скрипта>.ini рядом со скриптом).
 * Выполнение по нажатию Enter или кнопки Generate.
 * Закрыть окно можно стандартной кнопкой или комбинацией Ctrl+Alt+Shift+Esc (только при активной панели).
 *
 исправлено два недочёта:
 1. Исправлено позиционирование - левая верхняя точка первого штриха теперь всегда в левом верхнем углу активного артборда.
 2. Теперь можно запускать один скрипт одновременно в нескольких открытых версиях иллюстратора.

 upd 11.08.21
 добавил белую подложку под штрих-код
 */

//@target illustrator
//@targetengine "session"

(function () {
  var tmp = '';

  var w = makePalet();
  w.show();

  function makePalet() {

    var targ = "illustrator";
    if ((app.version).slice(0, 2) == '15') {
      targ += '-15';
    } else if ((app.version).slice(0, 2) == '16') {
      targ += '-16';
    } else if ((app.version).slice(0, 2) == '17') {
      targ += '-17';
    } else if ((app.version).slice(0, 2) == '18') {
      targ += '-18';
    }

    var w = new Window('palette', 'EAN-13  v' + ($.fileName.slice(-9, -4)));
    var code = w.add('group');
    w.field = code.add('edittext', undefined, '');
    w.checkDigit = code.add('statictext', undefined, 'x');
    w.indicator = code.add('checkbox', [0, 2, 30, 20], '>');
    w.butt = w.add('button', undefined, 'Generate');

    w.margins = w.spacing = 0;

    _isIni() != false ? w.location = _r_w_ini('r') : "";

    w.field.active = true;
    w.field.characters = 12;
    w.butt.alignment = 'fill';
    w.indicator.alignment = ['', 'bottom'];

    w.field.onChanging = function (e) {
      var bt = new BridgeTalk();
      bt.target = targ;
      bt.body = _trunc();
      bt.send();
    };

    w.butt.onClick = function () {
      var bt = new BridgeTalk();
      bt.target = targ;
      var strCode = w.field.text + w.checkDigit.text;
      var LED = w.indicator.value;
      bt.body = _focusToFile.toString() + ";" + makeEan13.toString() + ";" +
        "makeEan13('" + strCode + "','" + LED + "');_focusToFile()";
      bt.send();
    };

    w.addEventListener('close', function () {
      _r_w_ini("w", [w.location[0], w.location[1]]);
    });

    w.addEventListener('keydown', function (k) {
      if (k.keyName == 'Enter') {
        var bt = new BridgeTalk();
        bt.target = targ;
        var strCode = w.field.text + w.checkDigit.text;
        var LED = w.indicator.value;
        bt.body = _focusToFile.toString() + ";" + makeEan13.toString() + ";" +
          "makeEan13('" + strCode + "','" + LED + "');_focusToFile()";
        bt.send();
      } else if (k.keyName == 'Q' && k.altKey && k.shiftKey && k.ctrlKey) {
        w.close();
      }
    });

    /**
     * Запрещает ввод > 12 символов и не цифровых символов
     **/
    function _trunc() {
      if (w.field.text.length < 13 && w.field.text.search(/[^\d]/) == -1) {
        tmp = w.field.text;
        w.checkDigit.text = 'x';
      } else if (w.field.text.length > 12 || w.field.text.search(/[^\d]/) != -1) {
        w.field.text = tmp;
      }

      if (w.field.text.length == 12) {
        w.checkDigit.text = _calcCheskDigit(w.field.text);
      }

      function _calcCheskDigit(str) {
        var x = 0, y = 0, z = 0, checkDigit;
        for (var i = 0; i < str.length; i++) {
          (i % 2 != 0) ? x += +str.slice(i, i + 1) : y += +str.slice(i, i + 1);
        }
        z = 3 * x + y;
        (z % 10 == 0) ? checkDigit = 0 : checkDigit = (10 - (z + 10) % 10);
        return checkDigit;
      }
    }

    return w;
  }

//encoding table: L R G; R = _mirror ( L ); G = _reverse ( _mirror ( L ) )
  function makeEan13(code, LED) {
    if (code.length < 13) return;
    if (activeDocument.activeLayer.visible == false) return;
    if (activeDocument.activeLayer.locked == true) return;
    if (documents.length == 0) return;

    activeDocument.rulerOrigin = [0, activeDocument.height]; // Set Zero point ruler on Document

    var encodeString,
        symbol,
        col          = new CMYKColor(),
        MM_TO_PT     = 2.834645669,
        structure    = [
          'LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'],
        encodeDigits = [
          '0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111',
          '0001011'];

    col.black = 100;

    encodeString = _makeEnodeStr(code);
    symbol = _makeBars(encodeString);
    _makeDigits(code, symbol);

    var rect = _makeWhiteBg(symbol.top, (-3.63) * MM_TO_PT, 37.29 * MM_TO_PT, 25.93 * MM_TO_PT/*symbol.height*/, symbol, 0, new CMYKColor());
    rect.move(symbol, ElementPlacement.PLACEATEND);
    rect.stroked = false;

    function _makeDigits(code, container) {
      var digits = container.groupItems.add();
      var top = -(22.85 - 0.634 + 0.4) * MM_TO_PT;
      var left = -3 * MM_TO_PT;

      __addFrame(code.slice(0, 1), digits, top, left, 11);
      left += 4 * MM_TO_PT;
      __addFrame(code.slice(1, 7), digits, top, left, 11);
      left += 15.25 * MM_TO_PT;
      __addFrame(code.slice(7), digits, top, left, 11);
      left += 15.3 * MM_TO_PT;
      if (LED.toLowerCase() == "true") {
        __addFrame('>', digits, top, left, 11);
      }

      function __addFrame(contents, digits, top, left, size) {
        var pointText = digits.textFrames.add();

        pointText.textRange.size = size;
        pointText.contents = contents;
        pointText.top = top;
        pointText.left = left;
        pointText.textRange.characterAttributes.textFont = textFonts.getByName("OCRB10PitchBT-Regular");

        return pointText;
      }

    }

    function _makeBars(str) {
      var bars = activeDocument.activeLayer.groupItems.add();
      var x                                    = .33 * MM_TO_PT,
          top = 0, left = 0, width = 0, height = 22.85 * MM_TO_PT;
      for (var i = 0; i < str.length; i++) {
        if (str[i] == '0') {
          if (width) {
            str [i - 1] == '7' ? height = 24.5 * MM_TO_PT : height = 22.85 * MM_TO_PT;
            _makeRect(top, left, width, height, bars);
            left += width + x;
            width = 0;
            continue;
          }
          left += x;
          continue;
        }
        if (str [i] == '1' || str [i] == '7') {
          width += x;
        }
      }
      if (width) {
        height = 24.5 * MM_TO_PT;
        _makeRect(top, left, width, height, bars);
      }
      return bars;
    }

    function _makeEnodeStr(code) {
      var resultStr = '707';
      var structStr = structure [+code [0]];
      var codeStart = code.slice(1, 7);
      for (var i = 0; i < codeStart.length; i++) {
        switch (structStr [i]) {
          case 'L':
            resultStr += encodeDigits [codeStart [i]];
            break;
          case 'G':
            resultStr += _reverse(_mirror(encodeDigits [codeStart [i]]));
            break;
          default:
            break;
        }
      }
      resultStr += '07070';
      var codeEnd = code.slice(7);
      for (var j = 0; j < codeEnd.length; j++) {
        resultStr += _mirror(encodeDigits[codeEnd[j]]);
      }
      resultStr += '707';
      return resultStr;
    }

    function _makeRect(top, left, width, height, container) {
      container = container || activeDocument.activeLayer;
      var rect = container.pathItems.rectangle(top, left, width, height);
      rect.stroked = false;
      rect.fillColor = col;
    }

    function _reverse(str) {
      return str.split('').reverse().join('');
    }

    function _mirror(str) {
      var mirStr = '';
      for (var i = 0; i < str.length; i++) {
        str[i] == '1' ? mirStr += '0' : mirStr += '1';
      }
      return mirStr;
    }

    function _makeWhiteBg(top, left, width, height, container, reduce, col) {
      container = container || activeDocument.activeLayer;
      var rect = container.pathItems.rectangle(top, left, width + reduce, height);
      rect.stroked = false;
      rect.fillColor = col;
      rect.fillOverprint = false;
      return rect;
    }

    return encodeString;
  }

  /**
   * возврат фокуса с панели обратно на документ
   * */
  function _focusToFile() {
    illustrator.reveal(new File(activeDocument.fullName));
  }

  function _isIni() {
    return File($.fileName.slice(0, -3) + "ini").exists;
  }

  function _readIni() {

  }

  function _writeIni() {

  }

  function _r_w_ini(mode, data) {
    data = data || [''];

    var ini = File($.fileName.slice(0, -3) + "ini");

    switch (mode) {
      case "r":
        if (!(ini.exists)) {
          ini.open('w');
          ini.writeln('');
          ini.close();
          return false;
        } else {
          var location = [];
          ini.open('r');
          for (var i = 0; i < 2; i++) {
            location.push(ini.readln());
          }
          return location;
        }
        break;
      case "w":
        ini.open('w');
        for (var i = 0; i < data.length; i++) {
          ini.writeln(data[i]);
        }
        ini.close();
        break;
      case "e":
        //
        break;
      default:
        break;
    }
  }
})();
