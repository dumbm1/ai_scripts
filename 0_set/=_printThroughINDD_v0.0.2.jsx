/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 15.08.16
 *
 * printThroughINDD_v0.0.2
 *
 * conditions: ai-file save as pdf-compatible
 * action:
 * place the active document in the InDesign
 * print chosen separations to ps-file
 */

//@target illustrator

(function printThroughINDD () {
  var fPath = '' + activeDocument.fullName;
  var w     = activeDocument.width;
  var h     = activeDocument.height;

  var bt    = new BridgeTalk ();
  bt.target = _getLastOrRunningTarget ('indesign');
  bt.body   = _placeToIndd.toString () + ';' + _print.toString () +
    ';_placeToIndd("' + fPath + '","' + w + '","' + h + '")' + ';_print()';
  bt.send ();

  function _print () {
    try {
      var ad           = app.activeDocument;
      var prfs         = ad.printPreferences;
      prfs.colorOutput = ColorOutputModes.SEPARATIONS;
      prfs.printer     = Printer.postscriptFile;

      for (var i = 0; i < ad.inks.length; i++) {
        var _ink = ad.inks[i];
        if (!_ink.isProcessInk) {
          _ink.printInk = false;
        }
      }
    } catch (e) {
      alert (e);
    }

    app.activeDocument.print ();
  }

  function _placeToIndd (fPathAi, w, h) {

    var re_ext = new RegExp ('\.[^\.]+$'),
        fPathIndd;

    if (fPathAi.match (re_ext) != null) {
      fPathIndd = fPathAi.replace (re_ext, '.indd');
    } else {
      fPathIndd = fPathAi + '.indd';
    }

    var doc                            = app.documents.add ();
    doc.documentPreferences.pageHeight = h + 'pt';
    doc.documentPreferences.pageWidth  = w + 'pt';

    doc.viewPreferences.verticalMeasurementUnits =
      doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;

    doc.pages.item (0).marginPreferences.top =
      doc.pages.item (0).marginPreferences.bottom =
        doc.pages.item (0).marginPreferences.left =
          doc.pages.item (0).marginPreferences.right = 0;

    app.activeDocument.layoutWindows[0].overprintPreview = true;
    app.activeDocument.layoutWindows[0].zoom (ZoomOptions.FIT_PAGE);

    var rect       = doc.rectangles.add ();
    rect.fillColor =
      rect.strokeColor = doc.swatches[0];
    rect.geometricBounds = [0, 0, h + 'pt', w + 'pt']; // top left hight width

    rect.place (new File (fPathAi), false);
    rect.fit (FitOptions.CENTER_CONTENT);

//     doc.save ( new File ( fPathIndd ), true, 'File for overprint CMYK preview of procentage of colors', true );

    return fPathIndd;
  }

  function _getLastOrRunningTarget (targetName) {
    var targetsAll = BridgeTalk.getTargets ('-100000');
    var targets    = [];

    for (var i = 0; i < targetsAll.length; i++) {
      var obj = targetsAll[i];
      if (obj.match (targetName)) {
        targets.push (obj);
      }
    }

    for (var j = 0; j < targets.length; j++) {
      var targ = targets[j];
      if (BridgeTalk.isRunning (targ)) {
        return targ;
      }
    }

    return targets[targets.length - 1];
  }

} ());
