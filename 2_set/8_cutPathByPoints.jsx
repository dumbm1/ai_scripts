/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 24.08.2016
 *
 * cutByCornPnts
 */

//@target illustrator-20

cutByCornPnts (selection[0]);

function cutByCornPnts (pth) {
  _emc_unite (pth);
  _cut (pth);
  pth.remove ();

  function _cut (pth) {
    for (var i = 0; i < pth.pathPoints.length; i++) {
      var pnt = pth.pathPoints[i];
      if (pnt.pointType != PointType.CORNER) continue;
      i = __addPathByTmpl (pth, i);
    }

    function __addPathByTmpl (pathTmpl, iStartPnt) {

      var doc  = activeDocument,
          j, pntTmpl, pth, pnt,
          pnts = [pathTmpl.pathPoints [iStartPnt]];

      try {
        for (j = 1; j < pathTmpl.pathPoints.length + 1; j++) {
          pntTmpl = pathTmpl.pathPoints[j + iStartPnt];
          if (pntTmpl.pointType == PointType.CORNER) {
            pnts.push (pntTmpl);
            break;
          }
          pntTmpl = pathTmpl.pathPoints[j + iStartPnt];
          pnts.push (pntTmpl);
        }
      } catch (e) {
        for (j = 0; j < iStartPnt + 1; j++) {
          pntTmpl = pathTmpl.pathPoints[j];
          if (pntTmpl.pointType == PointType.CORNER) {
            pnts.push (pntTmpl);
            break;
          }
          pntTmpl = pathTmpl.pathPoints[j];
          pnts.push (pntTmpl);
        }
      }
      pth = doc.pathItems.add ();
      for (var i = 0; i < pnts.length; i++) {
        var pnt          = pnts[i];
        var p            = pth.pathPoints.add ();
        p.anchor         = [pnt.anchor[0], pnt.anchor[1]];
        p.leftDirection  = [pnt.leftDirection[0], pnt.leftDirection[1]];
        p.rightDirection = [pnt.rightDirection[0], pnt.rightDirection[1]];
        p.pointType      = pnt.pointType;
      }
      return j;
    }
  }

  function _emc_unite (pth) {
    executeMenuCommand ('deselectall');
    pth.selected = true;
    executeMenuCommand ("group");
    executeMenuCommand ("Live Pathfinder Add");
    executeMenuCommand ("expandStyle");
    executeMenuCommand ("ungroupall");
    executeMenuCommand ('deselectall');
  }
}
