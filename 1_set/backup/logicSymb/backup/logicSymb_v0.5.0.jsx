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

  var p = new Window ( 'palette', 'Insert Logic Symbol Palette v0.5' ),
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

  (function setHandlerToFontList () {
    fontList.onChange = function () {
      var bt = new BridgeTalk ();
      bt.target = 'illustrator';
      bt.body = setFont.toString () + getEditMode.toString () + ";" + "setFont ();";
      bt.send ();
    }
  }) ();

  (function setHendlersToButtons () {
    for ( var i = 0; i < symb.getSymbArr ().length; i++ ) {
      var logicSymb = symb[ symb.getSymbArr ()[ i ] ];
      btns[ i ].onClick = function () {
        var bt = new BridgeTalk ();
        bt.target = 'illustrator';
        bt.body = pasteSymb.toString () + ";" + "pasteSymb ();"
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

  function setFont () {
    var editMode = getEditMode ();

    switch ( editMode ) {
      case 0:
        // alert ( 'режим редактирования объектов, что-то выделено' );
        alert ( "Перейдите в режим редактирования текста" );
        break;
      case 1:
        // alert ( 'режим редактирования текста, что-то выделено' );
        _setFont ();
        break;
      case 2:
        // alert ( 'режим редактирования объектов, ничего не выделено' );
        alert ( "Перейдите в режим редактирования текста" );
        break;
      case 3:
        // alert ( 'режим редактирования текста, ничего не выделено' );
        _setFont ();
        break;
      default:
        break;
    }

    function _setFont () {
     var currSel = app.activeDocument.selection;
      for ( var j = 0; j < currSel.textRanges.length; j++ ) {
        if ( (currSel.contents).charCodeAt ( 0 ) ) {
          currSel.characterAttributes.textFont = textFonts.getByName ( fontList.selection.text );
        } else {
          currSel.textRanges[ j ].characterAttributes.textFont = textFonts.getByName ( fontList.selection.text );
        }
      }
      illustrator.reveal ( new File ( activeDocument.fullName ) );
    }

    illustrator.reveal ( new File ( activeDocument.fullName ) );
  }

  function pasteSymb () {
    illustrator.reveal ( new File ( activeDocument.fullName ) );
  }

  function getEditMode () {
    // case по маске: 0 | 0 = 0;  1 | 0 = 1;  0 | 2 = 2;  1 | 2 = 3
    var editMode = ( typeof selection.contents == 'string' ) * 1 | ( selection.length == 0 ) * 2;

    switch ( editMode ) {
      case 0:
        //  alert ( 'режим редактирования объектов, что-то выделено' );
        break;
      case 1:
        // alert ( 'режим редактирования текста, что-то выделено' );
        break;
      case 2:
        //  alert ( 'режим редактирования объектов, ничего не выделено' );
        break;
      case 3:
        //  alert ( 'режим редактирования текста, ничего не выделено' );
        break;
      default:
        break;
    }
    return editMode;
  }

} ();
