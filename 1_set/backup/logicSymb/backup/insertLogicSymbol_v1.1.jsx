/**
 * .jsx for Adobe Illustrator. Marat Shagiev: marat_js@bk.ru. 05.2014
 * скрипт для оформления задач из школьного курса алгебры логики
 * вставка в текст символов конъюнкции, дизъюнкции, импликации и тп
 * символ вставляется в место расположения текстового курсора
 * или в конец текстового фрейма - если был выделен фрейм
 * todo: несколько уровней инверсии в виде надчеркивания над группой высказываний... хз как это сделать
 */

//@targetengine illustrator

var pasteSymb = (function () {

  var sel = selection, doc = activeDocument, resultStr = '';

//  Объект с юникодными шрифтами
  var uniFontsObj = function () {
    var o = {};
    var fontArr = [
      'ArialUnicodeMS', 'Cambria', 'CambriaMath', 'LucidaSansUnicode', /*'OpenSymbol',*/
      'DejaVuSans', 'DejaVuSansMono', 'DejaVuSerif', 'SegoeUISymbol', /*'SymbolMT',*/ 'MeiryoUI' ];

//    найти и записать сюда шрифты
    for ( var i = 0; i < fontArr.length; i++ ) {
      try {
        o[ fontArr[ i ] ] = textFonts.getByName ( fontArr[ i ] );
      } catch ( e ) {
      }
    }
//    метод возвращает массив имен найденных шрифтов
    o.toArr = function () {
      var arr = [];
      for ( var key in this ) {
        if ( key == 'toArr' ) continue;
        arr.push ( key );
      }
      return arr;
    }
    return o;
  } ();

//  interface
  var dialogInterface = function () {

//    сокращения для элементов окна
    var ch = 'checkbox', stat = 'statictext', bt = 'button', gr = 'group', pan = 'panel', lb = 'listbox', item = 'item',
        ls = 'dropdownlist';

    var symb = {
      ident: '↔', ident2: '≡', mult: '∧', mult2: '⋅', sum: '∨', implic: '→',
      inv:   '¬', xor: '⊕', pirsArrow: '↓'
    }

    var face = new Window ( 'dialog', 'Вставить символ' );

//    checkboxes
    face.chPan = face.add ( pan );
    face.chPan.orientation = 'row';
    for ( var key in symb ) {
      face.chPan[ key ] = face.chPan.add ( ch, undefined, symb[ key ] );
    }

//    dropdownlist
    var uniFontsArr = uniFontsObj.toArr (); // найденные подходящие юникодные шрифты
    uniFontsArr.unshift ( 'default' ); // вставить пункт "по-умолчанию"
    face.chPan.fList = face.chPan.add ( ls, undefined, uniFontsArr );
    face.chPan.fList.selection = uniFontsArr[ 0 ];
    face.chPan.fList.text = 'шрифты:'

//    buttons
    face.btPan = face.add ( gr );
    face.btPan.orientation = 'row';

    face.btPan.ok = face.btPan.add ( bt, undefined, 'Да' );
    face.btPan.cancel = face.btPan.add ( bt, undefined, 'Нет' );

//    event hendlers
    face.btPan.cancel.onClick = function () {
      face.close ();
    }
    face.btPan.ok.onClick = function () {
      face.close ();
      for ( var key in symb ) {
        if ( face.chPan[ key ].value == true ) {
          if ( key != 'inv' ) {
            resultStr += symb[ key ] + ' ';
          } else if ( key == 'inv' ) {
            resultStr += symb[ key ];
          }
        }
      }

      // вставка результирующей строки символов
      if ( selection == '' ) {
        var newTxtFrame = doc.textFrames.add ();
        newTxtFrame.contents = resultStr;
        newTxtFrame.textRange.characterAttributes.textFont = uniFontsObj[ face.chPan.fList.selection.text ];
      }

      if ( resultStr ) {
        if ( sel[ 0 ] ) {
          if ( sel[ 0 ].typename.toLowerCase () == 'textframe' ) {
            sel[ 0 ].characters.add ( resultStr );
          }
        } else if ( sel ) {
          if ( sel.typename.toLowerCase () == 'textrange' ) {
            sel.contents = resultStr;
            sel.select ( true );
            sel.deSelect ();
          }
        }
      }
      //      назначить шрифт
      (sel[ 0 ] == undefined) ? sel.characterAttributes.textFont = uniFontsObj[ face.chPan.fList.selection.text ]
        : sel[ 0 ].textRange.characterAttributes.textFont = uniFontsObj[ face.chPan.fList.selection.text ];

      bt.onResult = function ( rr ) {
        alert ( rr.body );
      }
      bt.onError = function () {
        alert ( 'Error' );
      }
      bt.send ();

    }

    face.location = [ 100, 150 ];
    face.show ();
    return face;
  } ();

}) ();

