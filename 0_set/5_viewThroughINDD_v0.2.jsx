/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 22.04.2016 18:39
 *
 * viewThroughINDD_v0.2
 *
 * place the active document in the InDesign(R)
 * to monitor the values of the percentage of colors
 */

//@target illustrator




(function viewThroughINDD () {
  var fPath = '' + activeDocument.fullName;
  var w     = activeDocument.width;
  var h     = activeDocument.height;

  var bt    = new BridgeTalk ();
  bt.target = _getLastOrRunningTarget ('indesign');
  bt.body   = addAndPlaceINDD.toString () + 'addAndPlaceINDD("' + fPath + '","' + w + '","' + h + '")';
  bt.send ();

  function addAndPlaceINDD (fPathAi, w, h) {

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
