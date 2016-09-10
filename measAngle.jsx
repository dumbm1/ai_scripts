/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 12.03.2016.
 */

/**
 * You must select three any anchor points
 * */

//@target illustrator
try {
  (function measAngleByPoint () {

    /**
     * CHECK THE INITIAL CONDITIONS
     * */
    (function initCheck () {
      if (!documents.length) throw new Error ('No open documents.');
      if (!selection.length) throw new Error ('No selected objects.');
      if (selection.length > 1) throw new Error ('Too many selections. You must select one anchor point.');
      if (!selection[0].typename.match("Path")) {
        throw new Error ('Incorrect selected object. You must select one anchor point.');
      }
      if (selection[0].selectedPathPoints.length > 3) {
        throw new Error ('Too many selected points. You must select one anchor point.');
      }
    } ());

    (function main () {
      var lineLen    = 20,
          pnts       = getPoints (),
          leftPath   = activeDocument.pathItems.add(),
          rightPath  = activeDocument.pathItems.add(),
          centerPath = activeDocument.pathItems.add();

      leftPath.setEntirePath([
        [pnts[0].anchor[0], pnts[0].anchor[1]],
        [pnts[1].anchor[0], pnts[1].anchor[1]]
      ]);
      rightPath.setEntirePath([
        [pnts[0].anchor[0], pnts[0].anchor[1]],
        [pnts[2].anchor[0], pnts[2].anchor[1]]
      ]);

      leftPath.resize(lineLen / leftPath.length * 100, lineLen / leftPath.length * 100, true, false, false, false, false, Transformation.BOTTOMLEFT);
      rightPath.resize(lineLen / rightPath.length * 100, lineLen / rightPath.length * 100, true, false, false, false, false, Transformation.TOPLEFT);

      centerPath.setEntirePath([
        [leftPath.geometricBounds[2], leftPath.geometricBounds[1]],
        [rightPath.geometricBounds[2], rightPath.geometricBounds[3]]
      ]);

    } ());

    function getTrnsfPnt (pnts) {
      var c = points[0], // center point
          p = points[1], // previous sibling point, if count the counterclockwise
          n = points[2]; // next sibling point, if count the counterclockwise

      var trnsfPnts = [
        Transformation.LEFT, Transformation.TOPLEFT, Transformation.TOP, Transformation.TOPRIGHT,
        Transformation.RIGHT, Transformation.BOTTOMRIGHT, Transformation.BOTTOM, Transformation.BOTTOMLEFT
      ]

    }

    /**
     * @return {Array} [center point, left point, right point]
     * */
    function getPoints () {
      var pnts     = selection[0].selectedPathPoints,
          swapPnts = [];

      for (var i = 0; i < pnts.length; i++) {
        var pnt = pnts[i];
        pnt.selected == PathPointSelection.ANCHORPOINT ? swapPnts[0] = pnt : '';
        if (pnt.selected == PathPointSelection.LEFTDIRECTION &&
          selection[0].polarity == PolarityValues.POSITIVE) {
          swapPnts[1] = pnt;
        } else if (pnt.selected == PathPointSelection.LEFTDIRECTION &&
          selection[0].polarity == PolarityValues.NEGATIVE) {
          swapPnts[2] = pnt;
        }
        if (pnt.selected == PathPointSelection.RIGHTDIRECTION &&
          selection[0].polarity == PolarityValues.POSITIVE) {
          swapPnts[2] = pnt;
        } else if (pnt.selected == PathPointSelection.RIGHTDIRECTION &&
          selection[0].polarity == PolarityValues.NEGATIVE) {
          swapPnts[1] = pnt;
        }
      }
      return swapPnts;
    }

  } ());

} catch (e) {
  alert (e);
}
