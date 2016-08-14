/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 29.02.2016.
 *
 * selectByTint_v0.5
 *
 * EN Description:
 * Usage:
 * select one or more items with the same Pantone fill/stroke color;
 * choose Illustrator menu item "Select > Same > Fill/Stroke Color";
 * run the script;
 * in the popup set the options (stroke/fill, tint value) and press OK button.
 *
 * РУC Описание:
 * Выделение по заданному проценту заливки/обводки от пантона
 * Дополнение к функциям Illustrator доступным из меню Select > Same > Fill /Stroke Color
 *
 * Использование:
 * С помощью меню меню Select > Same > Fill /Stroke Color выделить все объекты с пантоном
 * Запустить скрипт
 * В появившемся диалоговом окне в поле "Select same:" выбрать где искать процент: Fill - в заливке, Stroke - в обводке
 * В поле "Tint value:" указать искомый процент
 * Нажать ОК и дождаться закрытия диалогового окна
 * В результате выделенными останутся только объекты с нужным процентом заливки/обводки
 *
 * Особенности:
 * Последние выбранные настройки сохраняются в папке данных пользователя в файле LocalStore\selTint\selTint.ini (в
 * Win10 это может быть C:\Users\<user name>\AppData\Roaming\LocalStore\selTint\selTint.ini; в macOS
 * ~/Library/Application Support/LocalStore/selTint/selTint.ini) Если выделенных объектов много (~> 10000), то
 * выполнение скрипта, вероятно, может затянуться до нескольких [десятков] минут
 */

(function selectByTint () {

  makeDialog ();

  function makeDialog ( name ) {

    name = name || 'Select By Tint';

    var defValues  = [ "true", "false", "100", "100" ],
        values     = [],
        infoString = '',
        aiVers     = (app.version).slice( 0, 2 ),
        storePath  = Folder.userData + '/LocalStore/selTint/',
        store      = new Folder ( storePath ),
        f          = new File ( storePath + '/selTint.ini' );

    if ( !store.exists ) store.create();

    if ( !f.exists ) {
      values = defValues;
    } else {
      values = _readSettings ( f );
    }

    var w         = new Window ( 'dialog', name ),
        mainGr    = w.add( 'group' ),
        infoGr    = w.add( 'group' ),
        buttGr    = w.add( 'group' ),
        copyright = w.add( 'statictext', undefined, '(c)MaratShagiev m_js@bk.ru' );

    var chPan    = mainGr.add( 'panel', undefined, 'Select same:' ),
        chFill   = chPan.add( 'radiobutton', undefined, 'fill' ),
        chStroke = chPan.add( 'radiobutton', undefined, 'stroke' );

    var valPan      = mainGr.add( 'panel', undefined, 'Tint value:' ),
        eTxtFillVal = valPan.add( 'edittext {justify:"center"}' ),
        eTxtStrkVal = valPan.add( 'edittext {justify:"center"}' );

    var okBtn     = buttGr.add( 'button', undefined, 'OK' ),
        cancelBtn = buttGr.add( 'button', undefined, 'Cancel' );

    w.alignChildren = 'left';

    chPan.alignChildren = 'left';
    chPan.alignment = 'top';
    chPan.margins = [ 10, 20, 10, 10 ];
    chPan.preferredSize.width = 100;
    chPan.preferredSize.height = 100;
    values[ 0 ] == 'true' ? chFill.value = true : chFill.value = false;
    values[ 1 ] == 'true' ? chStroke.value = true : chStroke.value = false;

    valPan.alignChildren = 'left';
    valPan.alignment = 'top';
    valPan.margins = [ 10, 20, 10, 10 ];
    valPan.preferredSize.width = 100;
    valPan.preferredSize.height = 100;
    eTxtFillVal.text = values[ 2 ];
    eTxtFillVal.characters = 5;
    eTxtStrkVal.text = values[ 3 ];
    eTxtStrkVal.characters = 5;

    buttGr.alignment = 'center';
    copyright.alignment = 'center';

    _enableTintFields ();

    chFill.onClick = _enableTintFields;
    chStroke.onClick = _enableTintFields;

    okBtn.onClick = function () {
      _sel ( [ chFill.value, chStroke.value, eTxtFillVal.text, eTxtStrkVal.text ] );
      _writeSettings ( [ chFill.value, chStroke.value, eTxtFillVal.text, eTxtStrkVal.text ], f );
      w.close();
    }

    function _enableTintFields () {
      eTxtFillVal.enabled = chFill.value;
      eTxtFillVal.active = chFill.value;
      eTxtStrkVal.enabled = chStroke.value;
      eTxtStrkVal.active = chStroke.value;
    }

    function _writeSettings ( values, f ) {

      f.open( 'w' );
      for ( var i = 0; i < values.length; i++ ) {
        var obj = values[ i ];
        f.writeln( obj );
      }
      f.close();
    }

    function _readSettings ( f ) {
      var values = [];

      f.open( 'r' );
      while ( !f.eof ) {
        values.push( f.readln() );
      }
      f.close();
      return values;
    }

    function _sel ( values ) {
      var fill     = values[ 0 ],
          stroke   = values[ 1 ],
          fillTint = +values[ 2 ] || 0,
          strkTint = +values[ 3 ] || 0;

      var paths     = [],
          compPaths = [],
          i;

      // todo: if (fillTint === undefined) return; // maibe fillTint === 0

      for ( i = 0; i < selection.length; i++ ) {
        _pushPaths ( selection[ i ] );
      }

      if ( +aiVers <= 15 ) {
        for ( var j = 0; j < activeDocument.layers.length; j++ ) {
          var obj = activeDocument.layers[ j ];
          obj.hasSelectedArtwork = false;
        }
      } else {
        executeMenuCommand ( 'deselectall' );
      }

      /* if ( paths.length + compPaths.length > 10000 ) {
       // todo: confirm to continue
       }*/

      if ( paths.length != 0 ) {
        for ( i = 0; i < paths.length; i++ ) {
          paths[ i ].selected = true;
        }
      }
      if ( compPaths.length != 0 ) {
        for ( i = 0; i < compPaths.length; i++ ) {
          compPaths[ i ].selected = true;
        }
      }

      function _pushPaths ( obj ) {

        // todo: add checking for equality fillColor.spot/strokeColor.spot of all items;

        switch ( obj.typename ) {
          case 'CompoundPathItem':
            try {
              if ( fill && !stroke ) {
                Math.round( obj.pathItems[ 0 ].fillColor.tint ) == fillTint ? compPaths.push( obj ) : '';
              } else if ( !fill && stroke ) {
                Math.round( obj.pathItems[ 0 ].strokeColor.tint ) == strkTint ? compPaths.push( obj ) : '';
              }
            } catch ( e ) {
              /*executeMenuCommand ( 'deselectall' );
               obj.selected = true;
               copy ();
               return;
               $.writeln( obj );*/
            }
            break;
          case 'GroupItem':
            try {
              for ( var i = 0; i < obj.pageItems.length; i++ ) {
                _pushPaths ( obj.pageItems[ i ] );
              }
            } catch ( e ) {
              /*executeMenuCommand ( 'deselectall' );
               obj.selected = true;
               copy ();
               return;
               $.writeln( obj );*/
            }
            break;
          case 'PathItem':
            try {
              if ( obj.parent.typename != 'CompoundPathItem' ) {
                if ( fill && !stroke ) {
                  Math.round( obj.fillColor.tint ) == fillTint ? paths.push( obj ) : '';
                } else if ( !fill && stroke ) {
                  Math.round( obj.strokeColor.tint ) == strkTint ? paths.push( obj ) : '';
                }
              }
            } catch ( e ) {/*
             executeMenuCommand ( 'deselectall' );
             obj.selected = true;
             copy ();
             return;
             $.writeln( obj );*/
            }
            break;
          default:
            break;
        }
      }

    }

    w.show();
  }
} ());
