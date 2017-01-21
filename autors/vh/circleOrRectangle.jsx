/**
 * Adobe ExtendScript for Illustrator
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 15.01.2017
 * */

//@target illustrator

(function circOrRect() {
  /*------------------------------------Circle or Rectangle---------------------------------------*/
  // Finds perfect circles and/or rectangles in document and  colors them.
  // Silly-V

  function makeCmykColor(c, m, y, k)  // Handy color-making function.
  {
    var newCmykColor     = new CMYKColor();
    newCmykColor.cyan    = c;
    newCmykColor.magenta = m;
    newCmykColor.yellow  = y;
    newCmykColor.black   = k;
    return newCmykColor;
  }

  if (app.documents.length > 0) {
    var doc      = app.documents[0];
    var myShapes = new Array();
    for (i = 0; i < doc.pageItems.length; i++) {
      var myShape = doc.pageItems[i];
      myShapes.push(myShape);
      if (myShape.typename == "PathItem") {
        if (myShape.pathPoints.length == 4) { // RECTANGLE CHECKER
          //--------------------2 diagonals-------------------------
          var recEquaDistOne = parseInt(Math.pow((myShape.pathPoints[0].anchor[0] - myShape.pathPoints[2].anchor[0]), 2) +
            Math.pow((myShape.pathPoints[0].anchor[1] - myShape.pathPoints[2].anchor[1]), 2)); // diagonal
          var recEquaDistTwo = parseInt(Math.pow((myShape.pathPoints[1].anchor[0] - myShape.pathPoints[3].anchor[0]), 2) +
            Math.pow((myShape.pathPoints[1].anchor[1] - myShape.pathPoints[3].anchor[1]), 2)); // diagonal
          //---------------------4 sides of rectangle---------------
          var sideA = parseInt(Math.pow((myShape.pathPoints[0].anchor[0] - myShape.pathPoints[1].anchor[0]), 2) +
            Math.pow((myShape.pathPoints[0].anchor[1] - myShape.pathPoints[1].anchor[1]), 2));
          var sideB = parseInt(Math.pow((myShape.pathPoints[1].anchor[0] - myShape.pathPoints[2].anchor[0]), 2) +
            Math.pow((myShape.pathPoints[1].anchor[1] - myShape.pathPoints[2].anchor[1]), 2));
          var sideC = parseInt(Math.pow((myShape.pathPoints[2].anchor[0] - myShape.pathPoints[3].anchor[0]), 2) +
            Math.pow((myShape.pathPoints[2].anchor[1] - myShape.pathPoints[3].anchor[1]), 2));
          var sideD = parseInt(Math.pow((myShape.pathPoints[3].anchor[0] - myShape.pathPoints[0].anchor[0]), 2) +
            Math.pow((myShape.pathPoints[3].anchor[1] - myShape.pathPoints[0].anchor[1]), 2));
          if (recEquaDistOne == recEquaDistTwo) { // If two diagonals connecting opposite points are same length, it's a 90 degree box
            if ((sideA == sideC) && (sideB == sideD)) {
              for (j = 0; j < 4; j++) {
                var point = myShape.pathPoints[j];
                if ((point.leftDirection[0] == point.anchor[0]) &&
                  (point.anchor[0] == point.rightDirection[0]) &&
                  (point.leftDirection[1] == point.anchor[1]) &&
                  (point.anchor[1] == point.rightDirection[1])) {
                  myShape.isrectangle = true;
                } else {
                  myShape.isrectangle = false;
                  break;
                }
              }
            }
          }
        }
        if (myShape.pathPoints.length == 4) {  // CIRCLE CHECKER
          if (myShape.isrectangle == false || myShape.isrectangle == null) {
            var circlePts    = new Array();
            var circleSlopes = new Array();
            for (k = 0; k < 4; k++) {
              var point           = myShape.pathPoints[k];
              var leftHandleDist  = parseInt(Math.pow((point.leftDirection[0] - point.anchor[0]), 2) +
                Math.pow((point.leftDirection[1] - point.anchor[1]), 2));
              var rightHandleDist = parseInt(Math.pow((point.rightDirection[0] - point.anchor[0]), 2) +
                Math.pow((point.rightDirection[1] - point.anchor[1]), 2));
              circlePts.push(leftHandleDist, rightHandleDist);
              var leftHandleSlope  = ((point.leftDirection[0] - point.anchor[0]) / (point.leftDirection[1] - point.anchor[1])).toFixed(2);
              var rightHandleSlope = ((point.rightDirection[0] - point.anchor[0]) / (point.rightDirection[1] - point.anchor[1])).toFixed(2);
              circleSlopes.push(leftHandleSlope, rightHandleSlope);
            }
            for (f = 0; f < 8; f++) { // Allows non-rotated circles.
              if (circleSlopes[f] == "-0.00") {
                circleSlopes[f] = "0.00";
              }
              if (circleSlopes[f] == "-Infinity") {
                circleSlopes[f] = "Infinity";
              }
            }
            //$.write(circleSlopes[0] + " , " + circleSlopes[1] + "  | " + circleSlopes[2] + " , " + circleSlopes[3] +
            //" | " + circleSlopes[4] + " , " + circleSlopes[5] + " | " + circleSlopes[6] +  " , " + circleSlopes[7] + " " + myShape.name + " \r");
            //$.write("(" + circlePts[0] + ", " + circlePts[1] + ") (" + circlePts[2] + ", " + circlePts[3]
            //+ ") (" + circlePts[4] + ", " + circlePts[5] + ") (" + circlePts[6] + ", " + circlePts[7] + ")\r");
            var cirEquaDistOne = parseInt(Math.pow((myShape.pathPoints[0].anchor[0] - myShape.pathPoints[2].anchor[0]), 2) +
              Math.pow((myShape.pathPoints[0].anchor[1] - myShape.pathPoints[2].anchor[1]), 2));
            var cirEquaDistTwo = parseInt(Math.pow((myShape.pathPoints[1].anchor[0] - myShape.pathPoints[3].anchor[0]), 2) +
              Math.pow((myShape.pathPoints[1].anchor[1] - myShape.pathPoints[3].anchor[1]), 2));
            if (circleSlopes[0] != "NaN") { // Filters out asymmetric rhombus  <><><>^^^^^^<><><>
              if ((circlePts[0] == circlePts[1]) && // Filters out shapes with control handles not of equal distance from anchor point.
                (circlePts[1] == circlePts[2]) &&
                (circlePts[2] == circlePts[3]) &&
                (circlePts[3] == circlePts[4]) &&
                (circlePts[4] == circlePts[5]) &&
                (circlePts[5] == circlePts[6]) &&
                (circlePts[6] == circlePts[7]) &&
                (circlePts[7] == circlePts[0])) {
                if ((circleSlopes[0] == circleSlopes[1]) && // Filters out the equadistant 4-pointed Star shape (dismisses negative slopes).
                  (circleSlopes[2] == circleSlopes[3]) &&
                  (circleSlopes[4] == circleSlopes[5]) &&
                  (circleSlopes[6] == circleSlopes[7])) {
                  if (cirEquaDistOne == cirEquaDistTwo) { // Filters out Ellipses (non-equadistant circles).
                    // Filters out the very RARE 4-pointed star which has all control points in its center on top of each other!
                    if (((myShape.pathPoints[0].leftDirection[0]).toFixed(2) != (myShape.pathPoints[1].leftDirection[0]).toFixed(2)) &&
                      ((myShape.pathPoints[0].leftDirection[1]).toFixed(2) != (myShape.pathPoints[1].leftDirection[1]).toFixed(2))) {
                      myShape.iscircle = true;
                    } else {
                      myShape.iscircle = false;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    for (x = 0; x < myShapes.length; x++) { // PROCESSING --> Now that shapes are marked, do what you want!
      // ** Compound Paths:  They favor top-most shape color attributes **
      if (myShapes[x].isrectangle == true) { //$.writeln("A rectangle has been detected! " + [x]);
        if (myShapes[x].filled == true) {
          myShapes[x].fillColor = makeCmykColor(0, 100, 100, 0);
        }
        if (myShapes[x].stroked == true) {
          myShapes[x].strokeColor = makeCmykColor(0, 100, 100, 0);
        }
      }
      if (myShapes[x].iscircle == true) { //$.writeln("A circle has been detected! " + [x]);
        if (myShapes[x].filled == true) {
          myShapes[x].fillColor = makeCmykColor(100, 100, 0, 0);
        }
        if (myShapes[x].stroked == true) {
          myShapes[x].strokeColor = makeCmykColor(100, 100, 0, 0);
        }
      }
    }
  } else {
    alert("Please open up a document with some circles and rectangles & re-run.");
  }
}());
 