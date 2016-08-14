/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 12.02.2015
 */

//@target illustrator
//@targetengine "session"

logicSymol ();

function logicSymol () {
  var aiVers = '',
      fontsLogicAll =
        [
          'ArialUnicodeMS', 'Cambria', 'CambriaMath', 'LucidaSansUnicode',
          'DejaVuSans', 'DejaVuSansMono', 'DejaVuSerif', 'SegoeUISymbol', 'MeiryoUI'
        ],
      fontsLogicAvailable = _getFontsAvailable ( fontsLogicAll ), // текущий массив пригодных шрифтов
      symb = _makeLogicSymbols (),
      symbArr = symb.getSymbArr ();

  var p = new Window ( 'palette', 'Insert Logic Symbol Palette v' + $.fileName.slice ( -9, -4 ) ),
      gr = p.add ( 'group' ),
      btnGr = gr.add ( 'group' ),
      btns = [],
      fontListGr = gr.add ( 'group' ),
      fontList,
      fontCurr;

  p.margins = 0;
  p.spacing = 0;
  btnGr.margins = 0;
  btnGr.spacing = 0;

  (function makeButtons () {
    for ( var i = 0; i < symbArr.length; i++ ) {
      btns [ i ] = btnGr.add ( 'button', [ 0, 0, 25, 25 ], symbArr[ i ] );
    }
  }) ();

  (function makeFontList () {
    fontList = fontListGr.add ( 'dropdownlist', undefined, fontsLogicAvailable );
    fontList.selection = 0;
  }) ();

  (function setHandlerToFontList () {
    fontList.onChange = function () {
      var bt = new BridgeTalk ();
      bt.target = 'illustrator' + aiVers;

      fontCurr = fontList.selection.text;

      bt.body =
        _setAvailableFont.toString () + ";" +
        _getDocEditCase.toString () + ";" +
        "_setAvailableFont (\"" + fontCurr + "\");";

      bt.onError = function () {
        alert ( 'ops! error' );
      }
      bt.send ();
    }
  }) ();

  (function setHendlersToButtons () {
    for ( var i = 0; i < symbArr.length; i++ ) {
      btns[ i ].onClick = function () {
        var bt = new BridgeTalk ();
        bt.target = 'illustrator' + aiVers;

        fontCurr = fontList.selection.text;

        bt.body =
          _getDocEditCase.toString () + ";" +
          _addSLogicSymb.toString () + ";" +
          "_addSLogicSymb(\"" + this.text + "\"," + "\"" + fontCurr + "\")";

        bt.onError = function () {
          alert ( 'ops! error' );
        }
        bt.send ();
      }
    }
  }) ();

  p.location = [ 100, 150 ];
  p.show ();

  function _getFontsAvailable ( fontNamesArray ) {
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

  function _makeLogicSymbols () {
    var s = {
      ident:     String.fromCharCode ( 8596 ),    // '↔'
      ident2:    String.fromCharCode ( 8801 ),    // '≡'
      mult:      String.fromCharCode ( 8743 ),    // '∧'
      mult2:     String.fromCharCode ( 8901 ),   // '⋅'
      sum:       String.fromCharCode ( 8744 ),   // '∨'
      implic:    String.fromCharCode ( 8594 ),    // '→'
      inv:       String.fromCharCode ( 172 ),    // '¬'
      xor:       String.fromCharCode ( 8853 ),   // '⊕'
      pirsArrow: String.fromCharCode ( 8595 ),    // '↓'

      getSymbArr: function () {
        var keys = [];
        for ( var key in this ) {
          if ( typeof this[ key ] == 'function' ) continue;
          keys.push ( this[ key ] );
        }
        return keys;
      }
    }
    return s;
  }

  function _setAvailableFont ( fontCurr ) {
    var editMode = _getDocEditCase ();
    var editMessage = _getDocEditCase.modeDescription ( editMode );

    switch ( editMode ) {
      case 0:
      case 2:
        alert ( "Перейдите в режим редактирования текста" );
        break;
      case 1:
      case 3:
        __setFont ();
        break;
      default:
        break;
    }

    function __setFont () {

      if ( editMode === 1 ) { // редактирование текста, что-то выделено
        for ( var i = 0; i < selection.textRanges.length; i++ ) {
          selection.characters[ i ].characterAttributes.textFont = textFonts.getByName ( fontCurr );
        }
      }
      if ( editMode === 3 ) { // редактирование текста, ничего не выделено
        selection.characterAttributes.textFont = textFonts.getByName ( fontCurr );
      }
    }

    illustrator.reveal ( new File ( activeDocument.fullName ) );
  }

  function _addSLogicSymb ( str, fontCurr ) {
    var editMode = _getDocEditCase ();
    var editMessage = _getDocEditCase.modeDescription ( editMode );

    switch ( editMode ) {
      case 0:
      case 2:
        alert ( "Перейдите в режим редактирования текста" );
        break;
      case 1:
      case 3:
        __addSymb ();
        break;
      default:
        break;
    }

    function __addSymb () {
      var selText = selection;

      selText.contents = str + ' ';

      selText.select ();
      selText.deSelect ();
      selText.characters[ 1 ].select ();

      for ( var i = 0; i < selText.characters.length; i++ ) {
        selText.characters[ i ].characterAttributes.textFont = textFonts.getByName ( fontCurr );
      }

      illustrator.reveal ( new File ( activeDocument.fullName ) );
    }

  }

  function _switchByEditMode ( f ) {
    var editMode = _getDocEditCase ();
    var editMessage = _getDocEditCase.modeDescription ( editMode );

    switch ( editMode ) {
      case 0:
      case 2:
        alert ( "Перейдите в режим редактирования текста" );
        break;
      case 1:
      case 3:
        f ();
        break;
      default:
        break;
    }
  }

  /**
   * текущий случай редактирования ( режим + выделение )
   * маска режима редактирования - 1, наличия выделения - 2
   * @return (Number) editCase 0-3 текущий случай редактирования
   */
  function _getDocEditCase () {

    var sel = selection,
        MASK_STR_MODE = 1,
        MASK_SEL_LENGTH = 2,
        editCase;

    editCase = ( typeof sel.contents == 'string' ) * MASK_STR_MODE | ( sel.length == 0 ) * MASK_SEL_LENGTH;

    /**
     * статическая ф-ция: вывод описания текущего случая редактирования
     * @param {Number} editCase текущий случай редактирования (режим + выделение)
     * @return {String} modesDescription [ editCase ] описание текущего случая редактирования
     */
    _getDocEditCase.modeDescription = function ( editCase ) {
      var modesDescription = [ 'режим редактирования объектов, что-то выделено',           // 0 | 0 = 0
                               'режим редактирования текста, что-то выделено',             // 1 | 0 = 1
                               'режим редактирования объектов, ничего не выделено',        // 0 | 2 = 2
                               'режим редактирования текста, ничего не выделено' ];        // 1 | 2 = 3
      return modesDescription [ editCase ];
    }

    return editCase;
  }
}
