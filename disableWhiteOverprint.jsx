/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.10.2016.
 *
 * disableWhiteOverprint
 *
 * GREAT DESTINATION:
 * test active document for white overprints
 * IF FIND:
 * - recolor grey-white and spot-white to CMYK-white,
 * - remove white overprints
 * - support color models: CMYK, SPOT and GRAYSCALE
 * - support class objects: Path, CompaoundPath, TextRrame
 *
 * - text-frames processed as indivisible single objects
 * rather then characters collections (couse it was a slow tempo)
 */
//@target illustrator
//@targetengine session
(function disableWhiteOverprint () {
  var globalCount = 0;
  var win         = new Window ('dialog', 'Disable White Overprint');
  var count       = win.add ('statictext', [0, 0, 200, 20], 'Process status: ');
  var btnGr       = win.add ('group');
  var btnOk       = btnGr.add ('button', undefined, 'OK');
  var btnClose    = btnGr.add ('button', undefined, 'Close');

  btnClose.onClick = function () {
    win.close ();
  }
  btnOk.onClick    = function () {
    killer ();
    redraw ();
  }
  win.show ();

  function killer () {
    var doc         = activeDocument;
    var cmykWhite   = new CMYKColor ();
    var pathCollect = doc.pathItems;
    var compCollect = doc.compoundPathItems;
    var txtCollect  = doc.textFrames;

    // if current document  have no supported elements, out function
    if (pathCollect.length == 0 && compCollect.length == 0 && txtCollect.length == 0) {
      alert ('No supported elements');
      return;
    }

    // the array for all collected elements
    var elemArr = [];

    // push all elems to array
    for (var p = 0; p < pathCollect.length; p++) {
      if (pathCollect[p].parent.typename == "CompoundPathItem") continue; // avoid duplicating objects
      elemArr.push (pathCollect[p]);
      _updWin ('path count: ' + p);
    }
    $.sleep (1000);

    for (var c = 0; c < compCollect.length; c++) {
      elemArr.push (compCollect[c]);
      _updWin ('compound path count: ' + c);
    }
    $.sleep (1000);

    for (var t = 0; t < txtCollect.length; t++) {
      elemArr.push (txtCollect[t]);
      _updWin ('text count: ' + t);
    }
    $.sleep (1000);

    // scanning, finding and killing
    for (var j = 0; j < elemArr.length; j++) {
      _updWin (j);
      //  depending on the typename of elems define vars elem.fillColor and elem.strokeColor
      try {
        switch (elemArr[j].typename) {
          case 'PathItem':
            _killerWeapon (elemArr[j]);
            break;
          case 'CompoundPathItem':
            _killerWeapon (elemArr[j].pathItems[0]);
            break;
          case 'TextFrame':
            // textFrame as a collection of characters
            /*
             var frameChars = elemArr[j].textRange.characters;
             for (var i = 0; i < frameChars.length; i++) {
             _killerWeapon(frameChars[i].characterAttributes);
             }
             */
            // textFrame as a single indivisible object
            var frameChars = elemArr[j].textRange;
            _killerWeapon (frameChars.characterAttributes);
            break;
          default:
            // default action
            break;
        }
      } catch (e) {
      }
    }

    _updWin ('Process Items Count: ' + globalCount);

    // COMMON TOOL
    function _killerWeapon (elem) {
      // SPOT
      // fill
      try {
        if ((elem.fillColor + '' ) == '[SpotColor]' && elem.fillColor.tint < 1 &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          elem.fillColor.colorType = ColorModel.PROCESS;
          elem.fillColor           = cmykWhite;
          elem.fillOverprint       = false;
          elem.overprintFill       = false;
          globalCount++;
          return;
        }
      } catch (e) {
      }
      // stroke
      try {
        if ((elem.strokeColor + '' ) == '[SpotColor]' && elem.strokeColor.tint < 1 &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          elem.strokeColor.colorType = ColorModel.PROCESS;
          elem.strokeColor           = cmykWhite;
          elem.strokeOverprint       = false;
          elem.overprintStroke       = false;
          globalCount++;
          return;
        }
      } catch (e) {
      }
      // CMYK
      // fill
      try {
        if ((elem.fillColor + '' ) == '[CMYKColor]' &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.fillColor.cyan < 1 && elem.fillColor.magenta < 1 &&
              elem.fillColor.yellow < 1 && elem.fillColor.black < 1) {
              elem.fillOverprint = false;
              elem.overprintFill = false;
              globalCount++;
              return;
            }
          }
        }
      } catch (e) {
      }
      //stroke
      try {
        if ((elem.strokeColor + '' ) == '[CMYKColor]' &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.strokeColor.cyan < 1 && elem.strokeColor.magenta < 1 &&
              elem.strokeColor.yellow < 1 && elem.strokeColor.black < 1) {
              elem.strokeOverprint = false;
              elem.overprintStroke = false;
              globalCount++;
              return;
            }
          }
        }
      } catch (e) {
      }
      // GRAYSCALE
      // fill
      try {
        if ((elem.fillColor + '' ) == '[GrayColor]' && elem.fillColor.gray < 1 &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          elem.fillOverprint = false;
          elem.overprintFill = false;
          elem.fillColor     = cmykWhite;
          globalCount++;
          return;
        }
      } catch (e) {
      }
      //stroke
      try {
        if ((elem.strokeColor + '' ) == '[GrayColor]' && elem.strokeColor.gray < 1 &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          elem.strokeOverprint = false;
          elem.overprintStroke = false;
          elem.strokeColor     = cmykWhite;
          globalCount++;
          return;
        }
      } catch (e) {
      }
    }

    function _updWin (str) {
      count.text = str;
      win.update ();
    }
  }
} ());

