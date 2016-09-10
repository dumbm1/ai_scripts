(function elongationLine () {

  if (documents.length < 1) return;
  if (activeDocument.selection.length != 1) return;
  if (activeDocument.selection[0].typename != "PathItem") return;
  if (activeDocument.selection[0].pathPoints.length != 2) return;

  var PT_TO_MM = 2.834645668,
      PRECIS   = 3,
      line     = activeDocument.selection[0],
      directs  = [], // filled the radiobuttons from the interface
      scalePoint, // scale from..
      startLen = Math.sqrt (Math.pow(line.height, 2) + Math.pow(line.width, 2)),
      resLen;

// round to the desired precission (PRECIS constant) and discard the zeros after the decimal point
  startLen = (Math.round (startLen / (PT_TO_MM * Math.pow (10, -PRECIS)))) / Math.pow (10, PRECIS);

  var w = new Window ("dialog", "Elongation Line");

  var pan_direct = w.add ("panel", undefined, "Elongation from:");
  directs[0]     = pan_direct.add ("radiobutton", undefined, "left");
  directs[1]     = pan_direct.add ("radiobutton", undefined, "center");
  directs[2]     = pan_direct.add ("radiobutton", undefined, "right");

  var pan_lineLen = w.add ("panel", undefined, "Line length (mm): ");
  var fld_len     = pan_lineLen.add ("edittext", undefined, startLen);

  var gr_btns = w.add ("group");
  gr_btns.add ("button", undefined, "OK");
  gr_btns.add ("button", undefined, "Cancel");

  w.alignChildren           = "left";
  pan_direct.alignChildren  = "left";
  pan_lineLen.orientation   = "column";
  pan_lineLen.alignChildren = "left";
  fld_len.characters        = 8;
  directs[1].value          = true;

  if (w.show () == 1) {
    resLen = (+fld_len.text);
    scalePoint = _getCorner (line, _getDirect ());
    line.resize (resLen / startLen * 100, resLen / startLen * 100, true, false, false, false, false, scalePoint);
  }

  function _getDirect () {
    for (var i = 0; i < directs.length; i++) {
      if (!directs[i].value) continue;
      return i;
    }
  }

  function _getCorner (line, direct) {
    var left, right, lcorner, rcorner;

    if (line.pathPoints[0].anchor[0] < line.pathPoints[1].anchor[0]) {
      left  = 0;
      right = 1;
    } else {
      left  = 1;
      right = 0;
    }
    if (line.pathPoints[left].anchor[1] < line.pathPoints[right].anchor[1]) {
      lcorner = Transformation.BOTTOMLEFT;
      rcorner = Transformation.TOPRIGHT;
    } else {
      lcorner = Transformation.TOPLEFT;
      rcorner = Transformation.BOTTOMRIGHT;
    }
    if (direct == 0) return lcorner;
    if (direct == 1) return Transformation.CENTER;
    if (direct == 2) return rcorner;
  }

} () );
