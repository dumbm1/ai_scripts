/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 01.02.2015
 */

//@target illustrator-18
//@targetengine "session"

(function () {

  var fontArr = getLogicFonts();
  var symb = {
    ident: '↔', ident2: '≡', mult: '∧', mult2: '⋅', sum: '∨', implic: '→',
    inv:   '¬', xor: '⊕', pirsArrow: '↓'
  }
  var idx = 0;
  var resArr = [];
  var str = '±';
  var spaceStr = ' ';

  var w = new Window ( 'palette', '' );
  var actBtn = w.add ( 'button', [ 0, 0, 40, 20 ], 'push' );

  actBtn.onClick = function ( e ) {
    var bt = new BridgeTalk ();
    bt.target = 'illustrator-18';
    bt.body = "\
    txtSel = app.activeDocument.selection;" +
    "txtSel.contents ='" + symb.abc + spaceStr + "';\n" +
    "txtSel.select();\
    txtSel.deSelect();\
    txtSel.characters[3].select();\
    illustrator.reveal(new File(activeDocument.fullName))\
    for ( var i = 0; i < txtSel.textRanges.length; i++) {\
    txtSel.textRanges[ i ].characterAttributes.textFont = textFonts.getByName ('" + fontArr[ 0 ] + "' );\
    }\
   "

    /*bt.onResult = function ( rObj ) {
     resArr[ idx ] = rObj.body;
     idx++;
     }

     bt.onReceived = function () {
     alert ( 'Recived' );
     }

     bt.onReceive = function () {
     alert ( 'Recive' );
     }

     bt.onError = function () {
     alert ( "Error" );
     }*/

    bt.send ();
  }

  w.show ();
  /**
   * LIBRARY
   * */
  /**
   * получить в массив шрифты с поддержкой всех символов логических операций
   *
   * @return {Array} fonts массив шрифтов
   */
  function getLogicFonts () {
    var fontNames = [
          'ArialUnicodeMS', 'Cambria', 'CambriaMath', 'LucidaSansUnicode',
          'DejaVuSans', 'DejaVuSansMono', 'DejaVuSerif', 'SegoeUISymbol', 'MeiryoUI' ],
        fonts = [];

// записать шрифты с поддержкой всех символов логических операций в объект
    for ( var i = 0; i < fontNames.length; i++ ) {
      try {
        fonts.push ( textFonts.getByName ( fontNames[ i ] ) );
      } catch ( e ) {
      }
    }
    return fonts;
  }
}) ();


