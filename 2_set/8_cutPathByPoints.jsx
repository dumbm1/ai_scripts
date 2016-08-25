/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 24.08.2016
 *
 * cutPathByPoints
 */

//@target illustrator-19
////@target illustrator-20

cutPathByPoints_v2 (selection[0]);

function cutPathByPoints_v2 (soursePth) {
  var i, j, currPnt, firstPnt, firstPntIndex, pntIndex, pnts = [];

  executeMenuCommand ('deselectall');

  for (i = 0; i < soursePth.pathPoints.length; i++) {
    currPnt = soursePth.pathPoints[i];
    if (currPnt.pointType != PointType.CORNER) continue;
    firstPnt      = currPnt;
    firstPntIndex = i;
    break;
  }

  $.writeln (firstPntIndex);

  for (j = 0; j < soursePth.pathPoints.length; j++) {

  }
  // soursePth.remove ();
}

/***************************
 * *************************/


function cutPathByPoints (soursePth) {
  var i, j, sursePnt, nextSursePnt, targPnt, nextTargPnt, targPth,
      d = activeDocument;

  executeMenuCommand ('deselectall');

  for (i = 0; i < soursePth.pathPoints.length; i++) {
    try {
      sursePnt     = soursePth.pathPoints[i];
      nextSursePnt = soursePth.pathPoints[i + 1];
    } catch (e) {
      nextSursePnt = soursePth.pathPoints[0];
    }

    targPth = d.pathItems.add ();
    targPth.setEntirePath ([
      [sursePnt.anchor[0], sursePnt.anchor[1]],
      [nextSursePnt.anchor[0], nextSursePnt.anchor[1]]
    ]);
    targPth.pathPoints[0].leftDirection  = [sursePnt.leftDirection[0], sursePnt.leftDirection[1]];
    targPth.pathPoints[0].rightDirection = [sursePnt.rightDirection[0], sursePnt.rightDirection[1]];
    targPth.pathPoints[0].pointType      = sursePnt.pointType;
    targPth.pathPoints[1].leftDirection  = [nextSursePnt.leftDirection[0], nextSursePnt.leftDirection[1]];
    targPth.pathPoints[1].rightDirection = [nextSursePnt.rightDirection[0], nextSursePnt.rightDirection[1]];
    targPth.pathPoints[1].pointType      = nextSursePnt.pointType;

    if (sursePnt.pointType == PointType.CORNER && nextSursePnt.pointType == PointType.CORNER) {

    }
  }
  soursePth.remove ();
}

function _setPointProps (sursePnt, pnt) {
  pnt.anchor         = [sursePnt.anchor[0], sursePnt.anchor[1]];
  pnt.leftDirection  = [sursePnt.leftDirection[0], sursePnt.leftDirection[1]];
  pnt.rightDirection = [sursePnt.rightDirection[0], sursePnt.rightDirection[1]];
  pnt.pointType      = sursePnt.pointType;
  return pnt;
}

function _cut (pnt) {
  var dPnt_1 = __duplPathPoint (pnt);
  var dPnt_2 = __duplPathPoint (dPnt_1);
  executeMenuCommand ('deselectall');
  dPnt_2.selected = PathPointSelection.ANCHORPOINT;
  executeMenuCommand ('clear');

  function __duplPathPoint (pnt) {
    var pth             = pnt.parent; // same way is get selection[0]
    var dPnt            = pth.pathPoints.add ();
    dPnt.anchor         = [pnt.anchor[0], pnt.anchor[1]];
    dPnt.leftDirection  = [pnt.leftDirection[0], pnt.leftDirection[1]];
    dPnt.rightDirection = [pnt.rightDirection[0], pnt.rightDirection[1]];
    dPnt.pointType      = pnt.pointType;
    return dPnt;
  }
}

function cutCornerShapeByPoints (pth) {
  var i, j, pnt, nextPnt, smthPnts = [], cornPnts = [], pthCut;
  executeMenuCommand ('deselectall');

  for (i = 0; i < pth.pathPoints.length; i++) {
    try {
      pnt     = pth.pathPoints[i];
      nextPnt = pth.pathPoints[i + 1];
    } catch (e) {
      nextPnt = pth.pathPoints[0];
    }
    pnt.selected = PathPointSelection.ANCHORPOINT;
    if (pnt.pointType == PointType.CORNER && nextPnt.pointType == PointType.CORNER) {
      executeMenuCommand ('copy');
      executeMenuCommand ('pasteFront');
      pthCut = selection[0];
      pthCut.pathPoints[0].remove ();
      executeMenuCommand ('deselectall');
    }
  }
  pth.remove ();
}


