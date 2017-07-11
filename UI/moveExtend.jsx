/**
 * .jsx for Adobe Illustrator CS5-CC. Marat Shagiev. Date: 05.09.2014
 */

////@target illustrator-18.064 // директива для extendscript

moveExtend ();

function moveExtend () {

  var PT_TO_MM = 2.834645668; // константа

  // если нет документа, выходим из ф-ции
  try {
    var doc = activeDocument;
  } catch ( e ) {
    alert ( "1. Make document" + "\n" + "2. Select the object" );
    return;
  }

  // если ничего не выделено, выходим из ф-ции
  var sel = selection;
  if ( !sel.length ) {
    alert ( "Make selection" );
    return;
  }

  /**
   INTERFACE: "DIALOG"
   */
  var win = (function f () {
    var w = new Window ( 'dialog', 'Move Extended' );

    /**
     PANEL: 'MAKEUP'
     complex layout in three columns
     */
    (function () {
      w.makeup = w.add ( 'panel', undefined, 'Makeup' );
      w.makeup.alignment = 'left';
      w.makeup.orientation = 'row';

      w.makeup.txt = w.makeup.add ( 'group' );
      w.makeup.txt.hor = w.makeup.txt.add ( 'radiobutton', undefined, 'Horizontal:' );
      w.makeup.txt.ver = w.makeup.txt.add ( 'radiobutton', undefined, 'Vertical:' );
      w.makeup.txt.copyHor = w.makeup.txt.add ( 'statictext', undefined, 'Horizontal copy:' );
      w.makeup.txt.copyVer = w.makeup.txt.add ( 'statictext', undefined, 'Vertical copy:' );

      w.makeup.txt.orientation = 'column';
      w.makeup.txt.alignChildren = 'right';
      w.makeup.txt.hor.value = true;

      // поля ввода значений
      w.makeup.val = w.makeup.add ( 'group' );
      w.makeup.val.hor = w.makeup.val.add ( 'edittext', undefined, '0', { name: "Horizontal" } );
      w.makeup.val.ver = w.makeup.val.add ( 'edittext', undefined, '0', { name: "Vertical" } );
      w.makeup.val.copyHor = w.makeup.val.add ( 'edittext', undefined, '0', { name: "Horizontal copy" } );
      w.makeup.val.copyVer = w.makeup.val.add ( 'edittext', undefined, '0', { name: "Vertical copy" } );

      w.makeup.val.orientation = 'column';
      w.makeup.val.alignChildren = 'right';
      w.makeup.val.hor.preferredSize.width =
        w.makeup.val.ver.preferredSize.width =
          w.makeup.val.copyHor.preferredSize.width =
            w.makeup.val.copyVer.preferredSize.width = 80;

      w.makeup.ch = w.makeup.add ( 'group' );
      w.makeup.ch.horGr = w.makeup.ch.add ( 'checkbox', undefined, 'group' );
      w.makeup.ch.verGr = w.makeup.ch.add ( 'checkbox', undefined, 'group' );
      w.makeup.ch.add ( 'statictext' ); // костыль для форматирования checkbox
      w.makeup.ch.add ( 'statictext' ); // костыль для форматирования checkbox
      w.makeup.ch.orientation = 'column';

    }) ();
    /**
     CHECKBOX: "SAVE PREFERENCES TO INI-FILE"
     */
    (function () {
      w.save = w.add ( 'checkbox', undefined, 'Save preferences to ini-file' );
      w.save.alignment = 'left';
      w.save.value = true;

      w.button = w.add ( 'group' );
      w.button.alignment = 'right';
      w.button.OK = w.button.add ( 'button', undefined, 'Ok' );
      w.button.cancel = w.button.add ( 'button', undefined, 'Cancel' );
      w.button.add ( 'statictext', [ 0, 0, 15, 0 ] ); // костыль, чтобы отодвинуть RESET немного (на 15px) вправо
      w.button.reset = w.button.add ( 'button', undefined, 'Reset' );
    }) ();
//<<============<< END INTERFACE <<==========<<

    /**
     * Инициализация ini-файла
     * Загрузка значений в интерфейс из ini-файла с диска, если возможно
     * !!! переменная 'f' используется в обработчиках
     * */
    var f = function init () {
      // инициализируем файл настроек
      var f = makeIni ();
      if ( f.exists ) {
        var len = getDialogValues ( w ).length;
        var arr = readIni ( f, len );
        loadFromIni ( arr );
      }
      return f;
    } ();

    /**
     * EVENT HENDLERS
     * */
    (function () {
      /**
       * Обработчики текстовых полей
       * */
      w.makeup.val.hor.addEventListener ( 'blur', function () {
        try {
          w.makeup.val.hor.text = eval ( w.makeup.val.hor.text );
        } catch ( e ) {
        }
      } )
      w.makeup.val.ver.addEventListener ( 'blur', function () {
        try {
          w.makeup.val.ver.text = eval ( w.makeup.val.ver.text );
        } catch ( e ) {
        }
      } )
      w.makeup.val.copyHor.addEventListener ( 'blur', function () {
        try {
          w.makeup.val.copyHor.text = eval ( w.makeup.val.copyHor.text );
        } catch ( e ) {
        }
      } )
      w.makeup.val.copyVer.addEventListener ( 'blur', function () {
        try {
          w.makeup.val.copyVer.text = eval ( w.makeup.val.copyVer.text );
        } catch ( e ) {
        }
      } )

      /**
       *  обработчик кнопки 'RESET'
       * */
      w.button.reset.onClick = function () {
        if ( confirm ( 'Reset all settings to defaults?' ) ) {
          loadDefaults ();
        }
      }
      /**
       * Обработчик кнопки OK
       * срабатывает так же при нажатии Enter, т.к. кнопка OK всегда активна
       * */
      w.button.OK.onClick = function () {

        var chckVal = checkVal ( w );

        if ( chckVal ) {
          // если стоит галка 'Save to ini-file'
          if ( w.save.value == true ) {
            var arr = getDialogValues ( w );
            writeIni ( f, arr );
          } // удалить ini-файл, если он есть и не стоит галка
          else if ( w.save.value == false && f.exists ) {
            f.remove ();
          }

          makeup (
            w.makeup.val.hor.text,
            w.makeup.val.ver.text,
            w.makeup.val.copyHor.text,
            w.makeup.val.copyVer.text,
            w.makeup.txt.hor.value,
            w.makeup.ch.horGr.value,
            w.makeup.ch.verGr.value
          );

          w.close ();
        } else {
          alert ( checkVal.msg );
        }
      }

    }) ();

    /**
     * взять параметры интрефейса
     * !!! ВАЖЕН ПОРЯДОК СЛЕДОВАНИЯ ЭЛЕМЕНТОВ !!!
     * return {Array}
     * */
    function getDialogValues ( w ) {
      var arr = [
        w.makeup.txt.hor.value, /*w.makeup.txt.ver.value всегда противоположно*/
        w.makeup.val.hor.text,
        w.makeup.val.ver.text,
        w.makeup.val.copyHor.text,
        w.makeup.val.copyVer.text,
        w.makeup.ch.horGr.value,
        w.makeup.ch.verGr.value,
        w.save.value ];
      return arr;
    }

    /**
     * инициализация ini-файла
     * поэтому iniFile.exists == false
     * (файл запишется на диск если его открыть на запись iniFile.open('w'))
     * */
    function makeIni () {
      var jsxFile = new File ( $.fileName );
      var jsxFileName = (jsxFile.name).slice ( 0, -4 );
      // var iniFilePath = Folder.desktop.absoluteURI + '/' + jsxFileName + '.ini'; // на рабочий стол
      // var iniFilePath = Folder.temp.absoluteURI + '/' + jsxFileName + '.ini'; // в %TEMP%
      var iniFilePath = jsxFile.path + '/' + jsxFileName + '.ini'; // рядом со скриптом
      var iniFile = new File ( iniFilePath );
      return iniFile;
    }

    /**
     * Загрузить умолчания
     * */
    function loadDefaults () {

      w.makeup.txt.hor.value = true;
      w.makeup.txt.ver.value = false;

      w.makeup.val.hor.text = 0;
      w.makeup.val.ver.text = 0;
      w.makeup.val.copyHor.text = 0;
      w.makeup.val.copyVer.text = 0;

      w.makeup.ch.horGr.value = false;
      w.makeup.ch.verGr.value = false;

      w.save.value = true;
    }

    /**
     * Загрузить параметры из ini-файла
     * */
    function loadFromIni ( arr ) {
      w.makeup.txt.hor.value = +arr[ 0 ];
      w.makeup.txt.ver.value = !+arr[ 0 ];
      w.makeup.val.hor.text = arr[ 1 ];
      w.makeup.val.ver.text = arr[ 2 ];
      w.makeup.val.copyHor.text = arr[ 3 ];
      w.makeup.val.copyVer.text = arr[ 4 ];
      w.makeup.ch.horGr.value = +arr[ 5 ];
      w.makeup.ch.verGr.value = +arr[ 6 ];
      w.save.value = +arr[ 7 ];
    }

    function writeIni ( f, arr/*каждое значение массива запишется как строка-параметр*/ ) {
      f.open ( 'w' );

      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[ i ] == true || arr[ i ] == false ) {
          f.writeln ( +arr[ i ] );
        } else {
          f.writeln ( arr[ i ] );
        }
      }

      f.close ();
      return f;
    }

    function readIni ( f, iniLines/*количество считываемых линий, начиная с первой строки ini-файла*/ ) {

      var arr = [];
      f.open ( 'r' );
      for ( var i = 0; i < iniLines; i++ ) {
        arr[ i ] = +f.readln ();
      }
      f.close ();
      return arr;
    }

    /**
     * Верстка, т.е.
     * дублирование объекта в горизонтальный ряд влево или вправо,
     * а затем всего ряда по вртикали вверх или вниз
     * */
    function makeup ( hVal, vVal, hCount, vCount, priority, hGr, vGr ) {

      hVal = hVal.replace(',', '.');
      vVal = vVal.replace(',', '.');

      hVal = hVal || 0;
      vVal = vVal || 0;
      hCount = hCount || 0;
      vCount = vCount || 0;
      if ( hVal == 0 && vVal == 0 && hCount == 0 && vCount == 0 ) return;

      var sel = [];

      // статичный массив объектов из selection
      for ( var j = 0; j < selection.length; j++ ) {
        sel[ j ] = selection[ j ];
      }

      /**
       * верстка происходит в этом блоке switch
       * */
      switch ( +priority ) {
        case 1:
          var hSel = _moveHor ( sel );
          // redraw(); // для наглядности, исполнение скрипта в два шага
          _moveVer ( hSel );

          break;
        case 0:
          var vSel = _moveVer ( sel );
          //  redraw(); // для наглядности, исполнение скрипта в два шага
          _moveHor ( vSel );
          break;
        default:
          // default action
          break;
      }

      /**
       * дублирование всего selection по горизонтали
       *
       * @private
       * @param {Array} массив из текущего selection
       * @return {Array} массив из текущего selection
       * */
      function _moveHor ( sel ) {
        if ( hVal == 0 && hCount == 0 )  return sel;
        var duplArr = [];
        var totalArr = [ sel ];
        if ( parseInt ( hCount ) > 0 ) {
          for ( var j = 0; j < hCount; j++ ) {

            for ( var i = 0; i < sel.length; i++ ) {
              duplArr[ i ] = sel[ i ].duplicate ();
              _moveElem ( duplArr[ i ], hVal, 0 );
            }
            sel = duplArr;
            totalArr.push ( sel );
          }
        } else {
          for ( var i = 0; i < sel.length; i++ ) {
            _moveElem ( sel[ i ], hVal, 0 );
          }
        }
        // группировка строки, если стоит соотв. флаг
        if ( hGr && +hCount ) { // если +hCount == 0, то смысл делать группу?
          var gr = doc.groupItems.add ();
          for ( var i = 0; i < selection.length; i++ ) {
            moveInside ( selection[ i ], gr );
          }
          /**
           * !! важный момент !!
           * хотя все элементы группы выделены, но сама группа НЕТ!
           * поэтому надо группу выделить ЯВНО
           * */
          gr.selected = true;
        }

        /**
         * в конце необходимо вернуть текущее selection в виде статичного массива
         * для передачи в другую ф-цию смещения
         * */
        var newSel = [];
        for ( var j = 0; j < selection.length; j++ ) {
          newSel[ j ] = selection[ j ];
        }
        return newSel;
      }

      /**
       * дублирование всего selection по вертикали
       *
       * @private
       * @param {Array} массив из текущего selection
       * @return {Array} массив из текущего selection
       * */
      function _moveVer ( sel ) {
        if ( vVal == 0 && vCount == 0 )  return sel;
        var duplArr = [];
        //  var totalArr = [sel];
        if ( parseInt ( vCount ) > 0 ) {
          for ( var j = 0; j < +vCount; j++ ) {

            for ( var i = 0; i < sel.length; i++ ) {
              duplArr[ i ] = sel[ i ].duplicate ();
              _moveElem ( duplArr[ i ], 0, vVal );
            }
            sel = duplArr;
            //  totalArr.push(sel);
          }
        } else {
          for ( var i = 0; i < sel.length; i++ ) {
            _moveElem ( sel[ i ], 0, vVal );
          }
        }

        // группировка колонки если стоит соотв. флаг
        if ( vGr && +vCount ) { // если +vCount == 0, то смысл делать группу?
          var gr = doc.groupItems.add ();
          for ( var i = 0; i < selection.length; i++ ) {
            moveInside ( selection[ i ], gr );
          }
          /**
           * !! важный момент !!
           * хотя все элементы группы выделены, но сама группа НЕТ!
           * поэтому надо группу выделить ЯВНО
           * */
          gr.selected = true;
        }

        /**
         * в конце необходимо вернуть текущее selection в виде статичного массива
         * для передачи в другую ф-цию смещения
         * */
        var newSel = [];
        for ( var j = 0; j < selection.length; j++ ) {
          newSel[ j ] = selection[ j ];
        }
        return newSel;
      }

      // перемещение одного элемента
      function _moveElem ( elem, hor, ver ) {
        // введенные пользователем значения
        var h = parseFloat ( hor ) * PT_TO_MM;
        var v = -parseFloat ( ver ) * PT_TO_MM;
        // начальная позиция выделеного элемента
        var hBase = elem.position[ 0 ];
        var vBase = elem.position[ 1 ];
        // новая позиция
        var hNew = hBase + h;
        var vNew = vBase + v;

        elem.position = [ hNew, vNew ];
      }
    }

    /**
     * перемещает item внутрь target
     * */
    function moveInside ( item, target ) {
      if ( target && item && target.typename == 'GroupItem' || target.typename == 'Layer' ) {
        item.move ( target, ElementPlacement.INSIDE );
      }
      return target;
    }

    /**
     * проверка значений текстовых полей на число
     * */
    function checkVal ( w ) {
      // все текстовые поля интрефейса
      var fields = [ /*w.pos.horiz.val, w.pos.vert.val, w.pos.count.val,*/
        w.makeup.val.hor, w.makeup.val.ver, w.makeup.val.copyHor, w.makeup.val.copyVer, ];

      for ( var i = 0; i < fields.length; i++ ) {
        //пустое поле не проходит проверку, поэтому поставить туда "0"
        if ( fields[ i ][ 'text' ] == '' ) {
          fields[ i ][ 'text' ] = 0;
        }
        if ( _check ( fields[ i ] ) ) {
          continue;
        } else {
          return false;
        }
      }
      return true;

      function _check ( field ) {

        if ( !isNum ( field[ 'text' ] ) ) {
          checkVal.msg = "Invalid value" + "\n" +
          "Mode: " + '"' + field.parent.parent.text + '"' + '\n' + // parent.parent - жёстко
          'Field: ' + '"' + field[ 'properties' ][ 'name' ] + '"';
          field[ 'text' ] = 0;
          field.active = true;
          return false;
        } else {
          return true;
        }
      }

    }

    function isNum ( n ) {
      return !isNaN ( parseFloat ( n ) ) && isFinite ( n );
    }

    return w;
  }) ();

  win.show ();
}
