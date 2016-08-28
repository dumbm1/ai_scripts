/**
 * ai_cs6+.jsx (c)MaratShagiev m_js@bk.ru 29.08.2016
 *
 * cutPathByCornerPoints_v2
 *
 * What's new:
 * * Added processing collections
 * 
 * Using:
 * * Select group[s] or path item[s];
 * * Run the script
 *
 * Great destination:
 * * cutting path item into pieces;
 * * the point of cutting path item - corner points;
 * * cut closed and open paths;
 *
 * What is really going on here:
 * * source path is used as a template;
 * * on top of the original path created new paths;
 * * the original path is deleted;
 */

//@target illustrator

try {
  var collection = selection;
  executeMenuCommand ('deselectall');
  recurs (cutByCornPnts, selection);
} catch (e) {
  alert ('Error: ' + e.message + '\rin line #' + e.line);
}

function recurs (fn, collection) {
  if (!collection.length) throw new Error ('Select items and run script');
  for (var i = 0; i < collection.length; i++) {
    var elem = collection[i];
    switch (elem.typename) {
      case 'GroupItem':
        recurs (fn, elem.pageItems);
        break;
      case 'PathItem':
        fn (elem);
        break;
      case 'CompoundPathItem':
        break;
      default:
        break;
    }
  }
}

function cutByCornPnts (pth) {
  pth.selected = true;
  if (_cut (pth)) pth.remove ();

  function _cut (pth) {
    var remPth = false;

    if (pth.closed) {
      for (var i = 0; i < pth.pathPoints.length; i++) {
        var pnt = pth.pathPoints[i];
        if (!__isCornerPoint (pnt)) continue;
        __addPathByTmpl (pth, i);
        remPth = true;
      }
    } else {
      for (var k = 1; k < pth.pathPoints.length - 1; k++) {
        // path that doesn't contain the corner points shouldn't redrawn
        if (!__isCornerPoint (pth.pathPoints[k])) continue;
        // redraw path that contains corner points
        for (var i = 0; i < pth.pathPoints.length; i++) {
          var pnt = pth.pathPoints[i];
          i       = __addPathByTmpl (pth, i);
          remPth  = true;
        }
        break;
      }
    }
    pth.selected = false;
    return remPth;

    function __addPathByTmpl (pathTmpl, iStartPnt) {

      var doc       = activeDocument,
          j, pntTmpl, pthDupl, pnt,
          endPthAdd = 0,
          pnts      = [pathTmpl.pathPoints [iStartPnt]];
      if (pathTmpl.closed) endPthAdd = 1;

      try {
        for (j = iStartPnt + 1; j < pathTmpl.pathPoints.length + endPthAdd; j++) {
          pntTmpl = pathTmpl.pathPoints[j];
          if (__isCornerPoint (pntTmpl)) {
            pnts.push (pntTmpl);
            break;
          }
          pntTmpl = pathTmpl.pathPoints[j];
          pnts.push (pntTmpl);
        }
      } catch (e) {
        for (j = 0; j < iStartPnt + endPthAdd; j++) {
          pntTmpl = pathTmpl.pathPoints[j];
          if (__isCornerPoint (pntTmpl)) {
            pnts.push (pntTmpl);
            break;
          }
          pntTmpl = pathTmpl.pathPoints[j];
          pnts.push (pntTmpl);
        }
      }
      if (pnts.length > 1) {
        pthDupl = doc.activeLayer.pathItems.add ();
        pthDupl.move (pathTmpl, ElementPlacement.PLACEBEFORE);
        for (var i = 0; i < pnts.length; i++) {
          var pnt          = pnts[i];
          var p            = pthDupl.pathPoints.add ();
          p.anchor         = [pnt.anchor[0], pnt.anchor[1]];
          p.leftDirection  = [pnt.leftDirection[0], pnt.leftDirection[1]];
          p.rightDirection = [pnt.rightDirection[0], pnt.rightDirection[1]];
          p.pointType      = pnt.pointType;
        }
      }

      iStartPnt = j; // for closed paths
      return --j; // for open paths
    }

    /**
     * Unfortunately the Pen Tool creates all the points as smooth.
     * Even if in fact they are corner.
     * One way to solve this problem -
     * check all the points with this helper.
     *
     * todo: make this function more accurate...
     *
     * @param {Object} pnt - object of class PathPoint
     * @return {Boolean}
     * */
    function __isCornerPoint (pnt) {
      if (pnt.pointType == PointType.CORNER) return true;

      var x_1, x_2, x_3,
          y_1, y_2, y_3,
          prec    = 100000,
          precLow = 10;

      x_1 = Math.round (pnt.leftDirection [0] * prec) / prec; // x
      y_1 = Math.round (pnt.leftDirection [1] * prec) / prec; // y
      x_2 = Math.round (pnt.rightDirection [0] * prec) / prec;
      y_2 = Math.round (pnt.rightDirection [1] * prec) / prec;
      x_3 = Math.round (pnt.anchor [0] * prec) / prec;
      y_3 = Math.round (pnt.anchor [1] * prec) / prec;

      if ((x_1 == x_2 && x_2 == x_3) && (y_1 == y_2 && y_2 == y_3)) return true;

      if ((x_1 == x_2) && (y_1 == y_2)) return true; // directions is equals
      if ((x_1 == x_3) && (y_1 == y_3)) return true; // left directon equals with anchor
      if ((x_2 == x_3) && (y_2 == y_3)) return true; // right direction equals with anchor

      // The equation of a straight line
      // points 1, 2, 3 are not equal and don't lie on one straight line
      if (
        Math.ceil (((x_3 - x_1) * (y_2 - y_1)) * precLow) / precLow !=
        Math.ceil (((x_2 - x_1) * (y_3 - y_1)) * precLow) / precLow
      ) return true;

      return false;
    }
  }
}
