/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.10.2016.
 *
 * disableWhiteOverprint 0.4
 */
//@target illustrator
(function disableWhiteOverprint () {
  var globalCount = 0,
      errCount    = 0;

  var win         = new Window ('dialog', 'Disable White Overprint'),
      count       = win.add ('statictext', [0, 0, 200, 40], 'Process status: ', {Multiline: true}),
      btnGr       = win.add ('group'),
      btnOk       = btnGr.add ('button', undefined, 'Start'),
      btnClose    = btnGr.add ('button', undefined, 'Close');

  btnClose.onClick = function () {
    win.close ();
  }
  btnOk.onClick    = function () {
    killer ();
    redraw ();
  }
  win.show ();

  function killer () {
    var doc         = activeDocument,
        cmykWhite   = new CMYKColor (),
        pathCollect = doc.pathItems,
        compCollect = doc.compoundPathItems,
        txtCollect  = doc.textFrames;

    if (pathCollect.length == 0 && compCollect.length == 0 && txtCollect.length == 0) {
      _updWin ('No supported elements');
      return;
    }

    for (var p = 0, pCount = 0; p < pathCollect.length; p++) {
      if (pathCollect[p].parent.typename == "CompoundPathItem") continue; // avoid duplicating objects
      _killerWeapon (pathCollect[p]);
      pCount++;
      _updWin ('Paths: ' + pCount);
    }
    $.sleep (1000);

    for (var c = 0; c < compCollect.length; c++) {
      _killerWeapon (compCollect[c].pathItems[0]);
      _updWin ('Compound paths: ' + c);
    }
    $.sleep (1000);

    for (var t = 0; t < txtCollect.length; t++) {
      /**
       * slowly, more accurate (overprint discards from only white chars)
       * */
      var frameChars = txtCollect[t].textRange.characters;
      for (var i = 0; i < frameChars.length; i++) {
        _killerWeapon (frameChars[i].characterAttributes);
      }
      /**
       * faster, but overprint discards from all text frame
       */
      // _killerWeapon (txtCollect[t].textRange);

      _updWin ('Characters: ' + t);
    }
    $.sleep (1000);

    _updWin ('Discards white overprints: ' + globalCount + '\n' + 'Error count: ' + errCount);
    return;

    /**
     * LIB
     */
    function _killerWeapon (elem) {
      // SPOT fill
      try {
        if ((elem.fillColor + '' ) == '[SpotColor]' && elem.fillColor.tint < 1 &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          elem.fillColor.colorType = ColorModel.PROCESS;
          elem.fillColor           = cmykWhite;
          elem.fillOverprint       = false;
          elem.overprintFill       = false;
          globalCount++;
        }
      } catch (e) {
        errCount++;
      }
      // SPOT stroke
      try {
        if ((elem.strokeColor + '' ) == '[SpotColor]' && elem.strokeColor.tint < 1 &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          elem.strokeColor.colorType = ColorModel.PROCESS;
          elem.strokeColor           = cmykWhite;
          elem.strokeOverprint       = false;
          elem.overprintStroke       = false;
          globalCount++;
        }
      } catch (e) {
        errCount++;
      }
      // CMYK fill
      try {
        if ((elem.fillColor + '' ) == '[CMYKColor]' &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.fillColor.cyan < 1 && elem.fillColor.magenta < 1 &&
              elem.fillColor.yellow < 1 && elem.fillColor.black < 1) {
              elem.fillOverprint = false;
              elem.overprintFill = false;
              globalCount++;
            }
          }
        }
      } catch (e) {
        errCount++;
      }
      // CMYK stroke
      try {
        if ((elem.strokeColor + '' ) == '[CMYKColor]' &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.strokeColor.cyan < 1 && elem.strokeColor.magenta < 1 &&
              elem.strokeColor.yellow < 1 && elem.strokeColor.black < 1) {
              elem.strokeOverprint = false;
              elem.overprintStroke = false;
              globalCount++;
            }
          }
        }
      } catch (e) {
        errCount++;
      }
      // GRAYSCALE fill
      try {
        if ((elem.fillColor + '' ) == '[GrayColor]' && elem.fillColor.gray < 1 &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          elem.fillOverprint = false;
          elem.overprintFill = false;
          elem.fillColor     = cmykWhite;
          globalCount++;
        }
      } catch (e) {
        errCount++;
      }
      // GRAYSCALE stroke
      try {
        if ((elem.strokeColor + '' ) == '[GrayColor]' && elem.strokeColor.gray < 1 &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          elem.strokeOverprint = false;
          elem.overprintStroke = false;
          elem.strokeColor     = cmykWhite;
          globalCount++;
        }
      } catch (e) {
        errCount++;
      }
    }

    function _updWin (str) {
      count.text = str;
      win.update ();
    }
  }
} ());

