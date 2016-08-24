/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 24.08.2016
 *
 * cutPathByPoints
 */

//@target illustrator-20

(function cutPathByPoints (pth) {
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

} (selection[0]));

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


