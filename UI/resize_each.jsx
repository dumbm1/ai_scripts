/**
 * ai.jsx �MaratShagiev m_js@bk.ru 15.08.2015
 **
 * resizeEach_v1.3
 **
 * complements the native Illustrator dialog "Transform Each"
 *
 * resizing each of selected objects in two ways:
 *  1. by top object dimension (height or widrh)
 *  2. by exact size (in pt/px or mm)
 *
 * uniform/nonuniform
 * support scaling strokes, fill patterns and stroke patterns
 *
 * palette settings and location saved
 * in win8 here: C:\Users\<��� ������������>\AppData\Roaming\LocalStore\resizeEach
 * in Mac OS maibe here: ~/Library/Application Support/LocalStore/resizeEach
 *
 * */

//@target illustrator
//@targetengine "session"

 resizeEach ();

function resizeEach () {
  try {
    resize ();
  } catch ( e ) {
    alert ( e.line + '\n' + e.message );
  }

  function resize () {

    var w = makePalette ();
    w.show ();

    function makePalette () {

      var opts = getOpts ();

      var scaleAboutArr = [ 'Center', 'Top', 'Bottom', 'Left', 'Right',
                            'Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right',
                            'Document Origin' ];

      var w                = new Window ( 'palette', 'Resize Each v1.3' ),
          gr_opts          = w.add ( 'group' ),
          gr_opts_exact    = gr_opts.add ( 'group' ),
          gr_opts_exact_ch = gr_opts_exact.add ( 'group' );

      w.gr_opts_exactIn = gr_opts_exact.add ( 'group' );

      var gr_opts_scale      = gr_opts.add ( 'group', undefined, 'options' ),
          gr_opts_scaleAbout = gr_opts.add ( 'group' ),
          gr_btns            = w.add ( 'group' );

      w.ch_exact = gr_opts_exact_ch.add ( 'checkbox', undefined, 'Exact size:' );

      var gr_opts_exact_rd = gr_opts_exact_ch.add ( 'group' );

      w.radio_mm = gr_opts_exact_rd.add ( 'radiobutton', undefined, 'mm' );
      w.radio_pt = gr_opts_exact_rd.add ( 'radiobutton', undefined, 'pt/px' );
      w.gr_opts_exactIn.add ( 'statictext', undefined, 'width:' );
      w.txt_inputW = w.gr_opts_exactIn.add ( "edittext", [ 0, 0, 57, 25 ], "", { multiline: false, scrolling: false } );
      w.gr_opts_exactIn.add ( 'statictext', undefined, 'height:' );
      w.txt_inputH = w.gr_opts_exactIn.add ( "edittext", [ 0, 0, 57, 25 ], "", { multiline: false, scrolling: false } );

      w.ch_uniform = gr_opts_scale.add ( 'checkbox', undefined, 'Uniform' );
      w.ch_changeFillPatt = gr_opts_scale.add ( 'checkbox', undefined, 'Scale fill pattern' );
      w.ch_changeStrokePatt = gr_opts_scale.add ( 'checkbox', undefined, 'Scale stroke pattern' );
      w.ch_changeStroke = gr_opts_scale.add ( 'checkbox', undefined, 'Scale stroke' );

      gr_opts_scaleAbout.add ( 'statictext', undefined, 'Scale about: ' );
      w.drop_scaleAbout = gr_opts_scaleAbout.add ( 'dropdownlist', undefined, scaleAboutArr );

      w.btn_toWidth = gr_btns.add ( 'button', [ 0, 0, 60, 25 ], 'to width' );
      w.btn_toHieght = gr_btns.add ( 'button', [ 0, 0, 66, 25 ], 'to height' );
      w.btn_toExact = gr_btns.add ( 'button', [ 0, 0, 60, 25 ], 'exact' );

      var copir = w.add ( 'statictext', undefined, '�MaratShagiev m_js@bk.ru aug-2015' );
      copir.enabled = false;

      gr_opts.orientation = 'column';
      gr_opts_scale.orientation = 'column';

      gr_opts_exact.alignChildren = 'left';
      gr_opts.alignChildren = 'left';
      gr_opts_exact.orientation = 'column';

      gr_opts_scale.alignment = 'left';
      gr_opts_scale.alignChildren = 'left';

      w.btn_toWidth.onClick = function () {
        var bt = new BridgeTalk ();
        bt.target = "illustrator";

        var opts = toJsonStr ( getPanValues ( 'w' ) );

        bt.body =
          focusToFile.toString () + ";" +
          getBoundsExtend.toString () + ";" +
          parseJsonStr.toString () + ";" +
          resizeByObj.toString () + ";" +
          setStroke.toString () + ";resizeByObj('" + opts + "');focusToFile();";

        bt.send ();
      }

      w.btn_toHieght.onClick = function () {
        var bt = new BridgeTalk ();
        bt.target = "illustrator";

        var opts = toJsonStr ( getPanValues ( 'h' ) );

        bt.body =
          focusToFile.toString () + ";" +
          getBoundsExtend.toString () + ";" +
          parseJsonStr.toString () + ";" +
          resizeByObj.toString () + ";" +
          setStroke.toString () + ";resizeByObj('" + opts + "');focusToFile();";

        bt.send ();
      }

      w.btn_toExact.onClick = function () {
        var bt = new BridgeTalk ();
        bt.target = "illustrator";

        var opts = toJsonStr ( getPanValues ( 'b' ) );

        bt.body =
          focusToFile.toString () + ";" +
          getBoundsExtend.toString () + ";" +
          parseJsonStr.toString () + ";" +
          resizeByObj.toString () + ";" +
          setStroke.toString () + ";resizeByObj('" + opts + "');focusToFile();";

        bt.send ();
      }

      w.ch_exact.onClick = function () {
        if ( w.ch_exact.value == true ) {
          w.gr_opts_exactIn.enabled = true;
          w.radio_mm.enabled = true;
          w.radio_pt.enabled = true;
          w.btn_toExact.enabled = true;
          w.btn_toHieght.enabled = w.btn_toWidth.enabled = false;
        } else {
          w.gr_opts_exactIn.enabled = false;
          w.radio_mm.enabled = false;
          w.radio_pt.enabled = false;
          w.btn_toHieght.enabled = w.btn_toWidth.enabled = true;
          w.btn_toExact.enabled = false;
          w.txt_inputW.text = w.txt_inputH.text = '';
        }
      }

      w.txt_inputW.onActivate = function () {
        if ( w.ch_uniform.value == true ) {
          w.txt_inputH.text = '';
        }
      }

      w.txt_inputH.onActivate = function () {
        if ( w.ch_uniform.value == true ) {
          w.txt_inputW.text = '';
        }
      }

      w.txt_inputH.addEventListener ( 'changing', function ( e ) {
        var re = /[^\d\.,]/gmi;
        var re2 = /[,]/gmi;
        var re3 = /[\.]{2,}/gmi;
        w.txt_inputH.text = (w.txt_inputH.text).replace ( re, '' );
        w.txt_inputH.text = (w.txt_inputH.text).replace ( re2, '.' );
        w.txt_inputH.text = (w.txt_inputH.text).replace ( re3, '.' );
      } )

      w.txt_inputW.addEventListener ( 'changing', function ( e ) {
        var re = /[^\d\.,]/gmi;
        var re2 = /[,]/gmi;
        var re3 = /[\.]{2,}/gmi;
        w.txt_inputW.text = (w.txt_inputW.text).replace ( re, '' );
        w.txt_inputW.text = (w.txt_inputW.text).replace ( re2, '.' );
        w.txt_inputW.text = (w.txt_inputW.text).replace ( re3, '.' );
      } )

      w.ch_uniform.onClick = function () {
        if ( w.ch_uniform.value == true ) {
          if ( w.txt_inputW.text != '' ) {
            w.txt_inputH.text = '';
          }
        }
      }

      w.onClose = function () {
        writeIni ( toJsonStr ( getPanValues ( 'w' ) ) );
        var bt = new BridgeTalk ();
        bt.target = "illustrator";
        bt.body = focusToFile.toString () + ";focusToFile();";
        bt.send ();
      }

      function resizeByObj ( jsonString ) {

        var i,
            selWidth,
            selHeight,
            scaleFactorX,
            scaleFactorY,
            tmplWidth,
            tmplHeight,
            CONVERS_FACTOR_UNITS  /*2.834645668*/,
            scaleAboutArr   = [ 'Center', 'Top', 'Bottom', 'Left', 'Right',
                                'Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right',
                                'Document Origin' ],
            scaleAboutValue = '';

        var o = parseJsonStr ( jsonString );
        scaleAboutValue = (scaleAboutArr[ o.scaleAbout ]).replace ( /[- ]/g, '' ).toUpperCase ();

        o.mm == true ? CONVERS_FACTOR_UNITS = 2.834645668 : CONVERS_FACTOR_UNITS = 1;

        if ( o.exact == true ) {
          (o.inputW == '' || o.inputW == 0) ? tmplWidth = +o.inputW : tmplWidth = parseFloat ( o.inputW );
          (o.inputH == '' || o.inputH == 0) ? tmplHeight = +o.inputH : tmplHeight = parseFloat ( o.inputH );

          if ( tmplWidth == 0 && tmplHeight > 0 && o.uniform == true ) {
            o.side = 'h';
          } else if ( tmplWidth > 0 && tmplHeight == 0 && o.uniform == true ) {
            o.side = 'w';
          } else if ( tmplWidth > 0 && tmplHeight > 0 && o.uniform == false ) {
            o.side = 'b';
          }
          i = 0;
        } else {
          /* tmplWidth = selection[ 0 ].width;
           tmplHeight = selection[ 0 ].height;*/
          tmplWidth = getBoundsExtend ( selection[ 0 ], [] )[ 1 ];
          tmplHeight = getBoundsExtend ( selection[ 0 ], [] )[ 2 ];

          i = 1;
        }

        for ( var j = i; j < selection.length; j++ ) {
          /*selWidth = selection[ j ].width;
           selHeight = selection[ j ].height;*/
          selWidth = getBoundsExtend ( selection[ j ], [] )[ 1 ];
          selHeight = getBoundsExtend ( selection[ j ], [] )[ 2 ];

          if ( o.side == 'w' ) {

            if ( o.exact == true ) {
              scaleFactorX = tmplWidth * CONVERS_FACTOR_UNITS * 100 / selWidth;
            } else {
              scaleFactorX = tmplWidth * 100 / selWidth;
            }
            if ( o.uniform == false ) {
              scaleFactorY = 100;
            } else {
              scaleFactorY = scaleFactorX;
            }
            selection[ j ].resize (
              scaleFactorX, scaleFactorY, true,
              o.changeFillPatt, o.changeFillGrad, o.changeStrokePatt,
              undefined, Transformation[ scaleAboutValue ]
            );
          } else if ( o.side == 'h' ) {
            if ( o.exact == true ) {
              scaleFactorY = tmplHeight * CONVERS_FACTOR_UNITS * 100 / selHeight;
            } else {
              scaleFactorY = tmplHeight * 100 / selHeight;
            }
            if ( o.uniform == false ) {
              scaleFactorX = 100;
            } else {
              scaleFactorX = scaleFactorY;
            }
            selection[ j ].resize (
              scaleFactorX, scaleFactorY, true,
              o.changeFillPatt, o.changeFillGrad, o.changeStrokePatt,
              undefined, Transformation[ scaleAboutValue ]
            );
          } else if ( o.side == 'b' ) {
            if ( tmplHeight != 0 && tmplWidth != 0 ) {
              scaleFactorX = tmplWidth * CONVERS_FACTOR_UNITS * 100 / selWidth;
              scaleFactorY = tmplHeight * CONVERS_FACTOR_UNITS * 100 / selHeight;
            } else if ( tmplWidth == 0 ) {
              scaleFactorY = tmplHeight * CONVERS_FACTOR_UNITS * 100 / selHeight;
              scaleFactorX = 100;
            } else if ( tmplHeight == 0 ) {
              scaleFactorX = tmplWidth * CONVERS_FACTOR_UNITS * 100 / selWidth;
              scaleFactorY = 100;
            }

            selection[ j ].resize (
              scaleFactorX, scaleFactorY, true,
              o.changeFillPatt, o.changeFillGrad, o.changeStrokePatt,
              undefined, Transformation[ scaleAboutValue ]
            );
          }
        }

        if ( o.changeStroke == true ) {
          for ( var k = i; k < selection.length; k++ ) {
            var scaleFactor_copy = scaleFactorX / 100;
            setStroke ( selection[ k ], scaleFactor_copy );
          }
        }
      }

      function setStroke ( elem, scaleFactor ) {

        try {
          switch ( elem.typename ) {

            case 'GroupItem' :
              for ( var j = 0; j < elem.pageItems.length; j++ ) {
                setStroke ( elem.pageItems[ j ], scaleFactor );
              }
              break;

            case 'PathItem':
              if ( elem.stroked ) {
                elem.strokeWidth *= scaleFactor;
              }
              break;

            case 'CompoundPathItem':
              if ( elem.pathItems[ 0 ].stroked ) {
                elem.pathItems[ 0 ].strokeWidth *= scaleFactor;
              }
              break;

            case 'TextFrame':
              var frameChars = elem.textRange;
              if ( frameChars.characterAttributes.strokeColor != '[NoColor]' ) {
                frameChars.characterAttributes.strokeWeight *= scaleFactor;
              }
              break;

            default:
              break;
          }
        } catch ( e ) {}
      }

      function getPanValues ( side ) {
        return {
          side:                    side,
          scaleAbout:              indexOf ( scaleAboutArr, w.drop_scaleAbout.selection.text ),
          changeFillPatt:          w.ch_changeFillPatt.value,
          changeStrokePatt:        w.ch_changeStrokePatt.value,
          changeStroke:            w.ch_changeStroke.value,
          uniform:                 w.ch_uniform.value,
          exact:                   w.ch_exact.value,
          mm:                      w.radio_mm.value,
          pt:                      w.radio_pt.value,
          inputW:                  w.txt_inputW.text,
          inputH:                  w.txt_inputH.text,
          winLeft:                 w.location[ 0 ],
          winTop:                  w.location[ 1 ],
          mm_enabled:              w.radio_mm.enabled,
          pt_enabled:              w.radio_pt.enabled,
          btn_toWidth_enabled:     w.btn_toWidth.enabled,
          btn_toHeight_enabled:    w.btn_toHieght.enabled,
          btn_toExact_enabled:     w.btn_toExact.enabled,
          gr_opts_exactIn_enabled: w.gr_opts_exactIn.enabled
        }
      }

      function writeIni ( opts ) {
        var iniName = 'resizeEach_v1.3.ini';
        var iniPath = Folder.userData + '/LocalStore/resizeEach/';

        if ( (new File ( iniPath + iniName ).exists) ) {
          (new File ( iniPath + iniName )).remove ();
        }

        var iniFolder = new Folder ( iniPath );

        if ( !iniFolder.exists ) {
          iniFolder.create ();
        }

        var ini = new File ( iniPath + iniName );

        ini.open ( 'e' );

        ini.writeln ( opts );
        ini.close ();

        return ini;
      }

      function readIni () {
        var iniName = 'resizeEach_v1.3.ini';
        var iniPath = Folder.userData + '/LocalStore/resizeEach/';
        var ini = new File ( iniPath + iniName );

        if ( ini.exists ) {
          ini.open ( 'r' );
          var str = ini.readln ();
          ini.close ();
          return str;
        }
        return false;
      }

      function getOpts () {
        var ini = readIni ();
        if ( ini ) {
          return parseJsonStr ( ini );
        } else {
          return {
            side:                    '',
            scaleAbout:              0,
            changeFillPatt:          true,
            changeStrokePatt:        true,
            changeStroke:            true,
            uniform:                 true,
            exact:                   false,
            mm:                      true,
            pt:                      false,
            inputW:                  '',
            inputH:                  '',
            mm_enabled:              false,
            pt_enabled:              false,
            btn_toWidth_enabled:     true,
            btn_toHeight_enabled:    true,
            btn_toExact_enabled:     false,
            gr_opts_exactIn_enabled: false
          }
        }
      }

      function setOpts ( o, pan ) {

        if ( o.winLeft && o.winTop ) {
          pan.location = [ o.winLeft, o.winTop ];
        }
        pan.drop_scaleAbout.selection = o.scaleAbout;
        pan.ch_changeFillPatt.value = o.changeFillPatt;
        pan.ch_changeStrokePatt.value = o.changeStrokePatt;
        pan.ch_changeStroke.value = o.changeStroke;
        pan.ch_uniform.value = o.uniform;
        pan.ch_exact.value = o.exact;
        pan.radio_mm.value = o.mm;
        pan.radio_pt.value = o.pt;
        pan.txt_inputW.text = o.inputW;
        pan.txt_inputH.text = o.inputH;
        pan.radio_mm.enabled = o.mm_enabled;
        pan.radio_pt.enabled = o.pt_enabled;
        pan.gr_opts_exactIn.enabled = o.gr_opts_exactIn_enabled;
        pan.btn_toWidth.enabled = o.btn_toWidth_enabled;
        pan.btn_toHieght.enabled = o.btn_toHeight_enabled;
        pan.btn_toExact.enabled = o.btn_toExact_enabled;
      }

      function toJsonStr ( opts ) {
        var optsStr = '{',
            val     = '';

        for ( var key in opts ) {
          if ( opts[ key ] == '' && typeof opts[ key ] == 'string' ) {
            val = '""';
          } else if ( opts[ key ] != '' && typeof opts[ key ] == 'string' ) {
            val = '"' + opts[ key ] + '"';
          } else {
            val = opts[ key ];
          }
          optsStr += '"' + key + '":' + val + ',';
        }

        return optsStr.slice ( 0, -1 ) + '}';
      }

      function parseJsonStr ( jsonString ) {
        var o = {};
        var arr = (jsonString.slice ( 1, -1 )).split ( ',' );
        var tmpArr;

        for ( i = 0; i < arr.length; i++ ) {
          tmpArr = arr[ i ].split ( ':' );
          tmpArr[ 0 ] = tmpArr[ 0 ].slice ( 1, -1 );

          if ( tmpArr[ 1 ] == 'true' ) {
            tmpArr[ 1 ] = true;
          } else if ( tmpArr[ 1 ] == 'false' ) {
            tmpArr[ 1 ] = false;
          } else if ( _isNum ( tmpArr[ 1 ] ) ) {
            tmpArr[ 1 ] = +tmpArr[ 1 ];
          } else {
            tmpArr[ 1 ] = tmpArr[ 1 ].slice ( 1, -1 );
          }
          o[ tmpArr[ 0 ] ] = tmpArr[ 1 ];
        }
        return o;
        function _isNum ( n ) {
          return !isNaN ( parseFloat ( n ) ) && isFinite ( n );
        }
      }

      function focusToFile () {
        illustrator.reveal ( new File ( activeDocument.fullName ) );
      }

      function indexOf ( arr, str ) {

        for ( var i = 0; i < arr.length; i++ ) {
          if ( arr[ i ] === str ) return i;
        }
        return -1;
      }

      /**
       * get selection.bounds:  [left, top, right, bottom]
       * calculate width, height �� bounds
       *
       * @param [Object/Collection]
       * @return {Array} [ bounds: [left, top, right, bottom], width, height ]
       */
      function getBoundsExtend ( selectElems ) {

        var bounds = _getBounds ( selectElems, [] ),
            width  = _calcElemWidthByBounds ( bounds ),
            height = _calcElemHeightByBounds ( bounds );

// recursive search of maximal bounds
        function _getBounds ( collection, bounds ) {
          var clipGroupElems, i, j;

          if ( collection.typename != 'GroupItem' ) { // ����� ��������� ������� �����������
            return collection.geometricBounds;
          }
          if ( collection.clipped ) { // ������ � ������ => ���� �����
            clipGroupElems = collection.pathItems;

            for ( i = 0; i < clipGroupElems.length; i++ ) {
              if ( clipGroupElems[ i ].clipping ) {
                if ( bounds == '' ) {
                  bounds = clipGroupElems[ i ].geometricBounds;
                  continue;
                }
                bounds = _compareBounds ( clipGroupElems[ i ], bounds );
              }
            }
            return bounds;
          }

          // ������ ��� ����������� ����� => ���� �� ��������� ������
          for ( j = 0; j < collection.pageItems.length; j++ ) {

            var el = collection.pageItems [ j ];

            if ( el.typename != 'GroupItem' ) { // ����� pageItem ����� ������
              if ( bounds == '' ) {
                bounds = el.geometricBounds;
                continue;
              }
              bounds = _compareBounds ( el, bounds );
            }

            if ( el.typename == 'GroupItem' && el.clipped ) { // ������ � ������ => ���� �����
              clipGroupElems = el.pathItems;
              for ( i = 0; i < clipGroupElems.length; i++ ) {
                if ( clipGroupElems[ i ].clipping ) {
                  if ( bounds == '' ) {
                    bounds = clipGroupElems[ i ].geometricBounds;
                    continue;
                  }
                  bounds = _compareBounds ( clipGroupElems[ i ], bounds );
                }
              }
              continue;
            }

            if ( el.typename == 'GroupItem' && !el.groupItems && !el.clipped ) { // ������ ��� ����� � ��� �����
              if ( bounds == '' ) {
                bounds = el.geometricBounds;
//          bounds = getBoundsExtend ( el.pageItems, bounds );
                continue;
              }
              bounds = _compareBounds ( el.geometricBounds, bounds );
              continue;
            }

            if ( el.typename == 'GroupItem' && el.groupItems ) { // ������ ��� �����, �� � �������� => ��������
              for ( var l = 0; l < el.pageItems.length; l++ ) {
                /* if ( bounds == '' ) {
                 bounds = getBoundsExtend ( el.pageItems[l], '' );
                 }*/
                bounds = getBoundsExtend ( el.pageItems[ l ], bounds );
              }
              continue;
            }
          }
          return bounds;

          // �������� � ������� ����� ������� geometricBounds ��������
          function _compareBounds ( elem, boundsToCompare ) {
            var elemBounds = elem.geometricBounds;
            elemBounds[ 0 ] < boundsToCompare[ 0 ] ? boundsToCompare[ 0 ] = elemBounds[ 0 ] : '';
            elemBounds[ 1 ] > boundsToCompare[ 1 ] ? boundsToCompare[ 1 ] = elemBounds[ 1 ] : '';
            elemBounds[ 2 ] > boundsToCompare[ 2 ] ? boundsToCompare[ 2 ] = elemBounds[ 2 ] : '';
            elemBounds[ 3 ] < boundsToCompare[ 3 ] ? boundsToCompare[ 3 ] = elemBounds[ 3 ] : '';
            return boundsToCompare;
          }
        }

// calculate item width by it left and right bounds
        function _calcElemWidthByBounds ( bounds ) {
          var elemWidth = 0,
              left      = bounds[ 0 ],
              right     = bounds[ 2 ];

          (left <= 0 && right <= 0) || (left >= 0 && right >= 0) ? elemWidth = Math.abs ( left - right ) : '';
          left <= 0 && right >= 0 ? elemWidth = Math.abs ( left ) + right : '';

          return elemWidth;
        }

// calculate item height bu it top and bottom bounds
        function _calcElemHeightByBounds ( bounds ) {
          var elemHeight = 0,
              top        = bounds[ 1 ],
              bottom     = bounds[ 3 ];

          (top <= 0 && bottom <= 0) || (top >= 0 && bottom >= 0) ? elemHeight = Math.abs ( top - bottom ) : '';
          top >= 0 && bottom <= 0 ? elemHeight = top + Math.abs ( bottom ) : '';
          return elemHeight;
        }

        return [ bounds, width, height ];
      }

      setOpts ( opts, w );

      return w;
    }
  }
}
