/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 01.02.2015
 */

//@target illustrator
//@targetengine "session"

+function () {
  var fontsLogicAll =
        [
          'ArialUnicodeMS', 'Cambria', 'CambriaMath', 'LucidaSansUnicode',
          'DejaVuSans', 'DejaVuSansMono', 'DejaVuSerif', 'SegoeUISymbol', 'MeiryoUI'
        ],
      fontsLogicAvailable = getFontsAvailable ( fontsLogicAll ),
      symb = makeLogicSymbols (),
      symbArr = [ '↔', '≡', '∧', '⋅', '∨', '→', '¬', '⊕', '↓' ];

  var p = new Window ( 'palette', 'Insert Logic Symbol Palette v0.5.1' ),
      gr = p.add ( 'group' ),
      btnGr = gr.add ( 'group' ),
      btns = [],
      fontListGr = gr.add ( 'group' ),
      fontList;

  p.margins = 0;
  p.spacing = 0;
  btnGr.margins = 0;
  btnGr.spacing = 0;

  (function makeButtons () {
    for ( var i = 0; i < symb.getSymbArr ().length; i++ ) {
      var logicSymb = symbArr[ i ];
      btns [ i ] = btnGr.add ( 'button', [ 0, 0, 25, 25 ], logicSymb );
    }
  }) ();

  (function makeFontList () {
    fontList = fontListGr.add ( 'dropdownlist', undefined, fontsLogicAvailable );
    fontList.selection = 0;
  }) ();

  (function makeDebugButton () {
    p.debugButton = p.add ( 'button', undefined, 'debugging' );
    p.debugButton.onClick = function () {
      var bt = new BridgeTalk ();
      bt.target = 'illustrator';
      var fontCurr = fontList.selection.text;
      bt.body = "alert(selection.textRanges.length)";
      bt.send ();
    }
  }) ();

  (function setHandlerToFontList () {
    fontList.onChange = function () {
      var bt = new BridgeTalk ();
      bt.target = 'illustrator';
      var fontCurr = fontList.selection.text;
      bt.body = setFont.toString () + ";" + getDocEditCase.toString () + ";" + "setFont (\"" + fontCurr + "\");";
      bt.send ();
    }
  }) ();

  (function setHendlersToButtons () {
    for ( var i = 0; i < symb.getSymbArr ().length; i++ ) {
      var logicSymb = symb[ symb.getSymbArr ()[ i ] ];
      btns[ i ].onClick = function () {
        var bt = new BridgeTalk ();
        bt.target = 'illustrator';
        bt.body = "\
         txtSel = app.activeDocument.selection;" +
        "txtSel.contents ='" + this.text + ' ' + "';\n" +
        "txtSel.select();\
        for ( var i = 0; i < txtSel.textRanges.length; i++) {\
        txtSel.deSelect();\
        txtSel.characters[1].select();\
        illustrator.reveal(new File(activeDocument.fullName))\
        txtSel.textRanges[ i ].characterAttributes.textFont =\
         textFonts.getByName ( '" + fontList.selection.text + "' );\
        }"
        bt.send ();
      }
    }
  }) ();

  p.location = [ 100, 150 ];
  p.show ();

  function getFontsAvailable ( fontNamesArray ) {
    var fonts = [];

// записать шрифты с поддержкой всех символов логических операций в массив
    for ( var i = 0; i < fontNamesArray.length; i++ ) {
      try {
        fonts.push ( (textFonts.getByName ( fontNamesArray[ i ] ).name) );
      } catch ( e ) {
      }
    }
    return fonts;
  }

  function makeLogicSymbols () {
    var s = {
      ident:     '↔',
      ident2:    '≡',
      mult:      '∧',
      mult2:     '⋅',
      sum:       '∨',
      implic:    '→',
      inv:       '¬',
      xor:       '⊕',
      pirsArrow: '↓',

      getSymbArr: function () {
        var keys = [];
        for ( var key in this ) {
          if ( typeof this[ key ] == 'function' ) continue;
          keys.push ( key );
        }
        return keys;
      }
    }
    return s;
  }

  function setFont ( fontCurr ) {
    var editMode = getDocEditCase ();

    switch ( editMode ) {
      case 0:
        alert ( "Перейдите в режим редактирования текста" );
        break;
      case 2:
        alert ( "Перейдите в режим редактирования текста" );
        break;
      case 1:
        _setFont ();
        break;
      case 3:
        _setFont ();
        break;
      default:
        break;
    }

    function _setFont () {
      if ( editMode === 1 ) { // редактирование текста, что-то выделено
        for ( var i = 0; i < selection.textRanges.length; i++ ) {
          selection.textRanges[ i ].characterAttributes.textFont = textFonts.getByName ( fontCurr );
        }
      }
      if ( editMode === 3 ) { // редактирование текста, ничего не выделено
        selection.characterAttributes.textFont = textFonts.getByName ( fontCurr );
      }
    }

    illustrator.reveal ( new File ( activeDocument.fullName ) );
  }

  function pasteSymb ( str ) {

    illustrator.reveal ( new File ( activeDocument.fullName ) );
  }

  /**
   * активный режим редактирования И наличие выделенного объекта:
   * 2 режима редактирования: текстовый, НЕ текстовый (редактирование PageItems)
   * режим определяется по ( typeof sel.contents == 'string' )    // true/false
   * наличие выделения определяется по ( selection.length == 0 )  // true/false
   * маска режима редактирования - 1, наличия выделения - 2
   *
   * вывод описания текущего режима:
   *
   * @return {Number} editMode 0-3 , описание каждого режима в статической ф-ции modeDescription()
   */
  function getDocEditCase () {
    var sel = selection,
        MASK_STR_MODE = 1,
        MASK_SEL_LENGTH = 2,
        editCase;

    editCase = ( typeof sel.contents == 'string' ) * MASK_STR_MODE | ( sel.length == 0 ) * MASK_SEL_LENGTH;

    getDocEditCase.modeDescription = function ( editCase ) {
      var modesDescription = [ 'режим редактирования объектов, что-то выделено',           // 0 | 0 = 0
                               'режим редактирования текста, что-то выделено',             // 1 | 0 = 1
                               'режим редактирования объектов, ничего не выделено',        // 0 | 2 = 2
                               'режим редактирования текста, ничего не выделено' ];        // 1 | 2 = 3
      return modesDescription [ editCase ];
    }

    return editCase;
  }

} ();
