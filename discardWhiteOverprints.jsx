/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.10.2016.
 *
 * disableWhiteOverprint 0.5
 */
//@target illustrator-19
(function disableWhiteOverprint () {
  var discardCount = 0,
      errCount     = 0,
      msg          = '',
      errMsgs      = [];

  var win         = new Window ('dialog', 'Disable White Overprint'),
      reportTitle = win.add ('statictext', undefined, 'Process status'),
      reportText  = win.add ('edittext', [0, 0, 250, 150], msg, {multiline: true}),
      btnGr       = win.add ('group'),
      btnOk       = btnGr.add ('button', undefined, 'Start'),
      btnClose    = btnGr.add ('button', undefined, 'Close'),
      btnQuit     = btnGr.add ('button', undefined, 'Quit');

  reportTitle.alignment = 'left';

  btnClose.onClick = function () {
    win.close ();
  }
  btnQuit.onClick  = function () {
    killWinProcess ('Illustrator.exe');
  }
  btnOk.onClick    = function () {
    _disWhOverpr ();
    redraw ();
  }
  win.show ();

  function _disWhOverpr () {
    var doc       = activeDocument,
        cmykWhite = new CMYKColor ();

    if (doc.pathItems.length == 0 && doc.textFrames.length == 0) {
      _updWin ('No supported elements');
      return;
    }

    for (var p = 0; p < doc.pathItems.length; p++) {
      //    if (_isLock (doc.pathItems[p])) continue;
      _updWin (msg + 'Paths: ' + p);
      if (doc.pathItems[p].parent.typename == "CompoundPathItem") {
        _discardInPath (doc.pathItems[p].parent.pathItems[0]);
      } else {
        _discardInPath (doc.pathItems[p]);
      }
    }
    msg += 'Paths: ' + p + '\n';

    for (var t = 0, chrCount = 0; t < doc.textFrames.length; t++) {
      //   if (_isLock (doc.textFrames[t])) continue;
      var frameChars = doc.textFrames[t].textRange.characters;
      for (var c = 0; c < frameChars.length; c++) {
        _discardInText (frameChars[c].characterAttributes);
        _updWin (msg + 'Characters: ' + ++chrCount);
      }
    }
    msg += 'Characters: ' + chrCount + '\n';

    _updWin (msg + 'Discards white overprints: ' + discardCount +
      '\n' + 'Error count: ' + errCount + '\n' + errMsgs.join ('\n'));

    /**
     * LIB
     */
    function _discardInPath (elem) {
      // SPOT fill
      try {
        if ((elem.fillColor + '' ) == '[SpotColor]' && elem.fillColor.tint < 1 && (elem.fillOverprint == true)) {
          elem.fillColor.colorType = ColorModel.PROCESS;
          elem.fillColor           = cmykWhite;
          elem.fillOverprint       = false;
          discardCount++;
        }
        // SPOT stroke
        if ((elem.strokeColor + '' ) == '[SpotColor]' && elem.strokeColor.tint < 1 && (elem.strokeOverprint == true)) {
          elem.strokeColor.colorType = ColorModel.PROCESS;
          elem.strokeColor           = cmykWhite;
          elem.strokeOverprint       = false;
          discardCount++;
        }
        // CMYK fill
        if ((elem.fillColor + '' ) == '[CMYKColor]' && (elem.fillOverprint == true )) {
          if (
            elem.fillColor.cyan < 1 && elem.fillColor.magenta < 1 &&
            elem.fillColor.yellow < 1 && elem.fillColor.black < 1) {
            elem.fillOverprint = false;
            discardCount++
          }
        }
        // CMYK stroke
        if ((elem.strokeColor + '' ) == '[CMYKColor]' && (elem.strokeOverprint == true )) {
          if (elem.strokeColor.cyan < 1 && elem.strokeColor.magenta < 1 &&
            elem.strokeColor.yellow < 1 && elem.strokeColor.black < 1) {

            elem.strokeOverprint = false;
            discardCount++;
          }
        }
        // GRAYSCALE fill
        if ((elem.fillColor + '' ) == '[GrayColor]' && elem.fillColor.gray < 1 && (elem.fillOverprint == true )) {
          elem.fillColor     = cmykWhite;
          elem.fillOverprint = false;
          discardCount++
        }
        // GRAYSCALE stroke
        if ((elem.strokeColor + '' ) == '[GrayColor]' && elem.strokeColor.gray < 1 && (elem.strokeOverprint == true )) {
          elem.strokeColor     = cmykWhite;
          elem.strokeOverprint = false;
          discardCount++;
        }
      } catch (e) {
        _storeErr (e);
      }
    }

    function _discardInText (elem) {
      // SPOT fill
      try {
        if ((elem.fillColor + '' ) == '[SpotColor]' && elem.fillColor.tint < 1 && (elem.overprintFill == true)) {
          elem.fillColor.colorType = ColorModel.PROCESS;
          elem.fillColor           = cmykWhite;
          elem.overprintFill       = false;
          discardCount++;
        }
        // SPOT stroke
        if ((elem.strokeColor + '' ) == '[SpotColor]' && elem.strokeColor.tint < 1 && (elem.overprintStroke == true)) {
          elem.strokeColor.colorType = ColorModel.PROCESS;
          elem.strokeColor           = cmykWhite;
          elem.overprintStroke       = false;
          discardCount++;
        }
        // CMYK fill
        if ((elem.fillColor + '' ) == '[CMYKColor]' &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.fillColor.cyan < 1 && elem.fillColor.magenta < 1 &&
              elem.fillColor.yellow < 1 && elem.fillColor.black < 1) {
              elem.overprintFill = false;
              discardCount++;
            }
          }
        }
        // CMYK stroke
        if ((elem.strokeColor + '' ) == '[CMYKColor]' &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.strokeColor.cyan < 1 && elem.strokeColor.magenta < 1 &&
              elem.strokeColor.yellow < 1 && elem.strokeColor.black < 1) {
              elem.overprintStroke = false;
              discardCount++;
            }
          }
        }
        // GRAYSCALE fill
        if ((elem.fillColor + '' ) == '[GrayColor]' && elem.fillColor.gray < 1 && (elem.overprintFill == true)) {
          elem.overprintFill = false;
          elem.fillColor     = cmykWhite;
          discardCount++;
        }
        // GRAYSCALE stroke
        if ((elem.strokeColor + '' ) == '[GrayColor]' && elem.strokeColor.gray < 1 && (elem.overprintStroke == true)) {
          elem.overprintStroke = false;
          elem.strokeColor     = cmykWhite;
          discardCount++;
        }
      } catch (e) {
        _storeErr (e);
      }
    }

    function _updWin (str) {
      reportText.text = str;
      win.update ();
    }

    function _storeErr (e) {
      errCount++;
      errMsgs.push (e.message);
    }

    /**
     * @param {PageItem}
     * @return {Boolean}
     * */
    function _isLock (elem) {
      try {
        elem.selected = true;
        elem.selected = false;
        return false;
      } catch (e) {
        return true;
      }
    }
  }

  function killWinProcess (winProcessName) {
    /**
     * CEPHTMLEngine.exe
     * Illustrator.exe
     * ExtendScript Toolkit.exe
     * Photoshop.exe
     * Acrobat.exe
     * ...
     */
    _execFile (
      Folder.temp.absoluteURI + '/' + 'tasks_kill.bat',
      'taskkill /IM "' + winProcessName + '" /f'
    );
    /**
     * make new file by full path, write to disk with some file contenr, execute file
     *
     * @param {String} filePath - FULL path (include file-extension)
     * @param {String} fileContent - content to new file
     */
    function _execFile (filePath, fileContent) {
      if (new File (filePath).exists) {
        new File (filePath).remove ();
      }

      var f = new File (filePath);

      f.open ('e');
      f.write (fileContent);
      f.close ();
      f.execute ();
    }
  }
} ());

