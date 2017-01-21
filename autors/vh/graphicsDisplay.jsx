/**
 * Adobe ExtendScript for Illustrator
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 15.01.2017
 * */

//@target illustrator

graphicsDisplay();

function graphicsDisplay() {
  function itemShape(myShape) {
    // Going to test for circles.
    var shapeKind = {
      isrectangle: null,
      iscircle:    null,
      isellipse:   null
    };
    if (myShape.typename == 'PathItem' && myShape.pathPoints.length == 4) { // RECTANGLE CHECKER
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
          for (var j = 0; j < 4; j++) {
            var point = myShape.pathPoints[j];
            if ((point.leftDirection[0] == point.anchor[0]) &&
              (point.anchor[0] == point.rightDirection[0]) &&
              (point.leftDirection[1] == point.anchor[1]) &&
              (point.anchor[1] == point.rightDirection[1])) {
              shapeKind.isrectangle = true;
            } else {
              shapeKind.isrectangle = false;
              break;
            }
          }
        }
      }
    }
    if (myShape.pathPoints.length == 4) {  // CIRCLE CHECKER
      if (shapeKind.isrectangle == false || shapeKind.isrectangle == null) {
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
        for (var f = 0; f < 8; f++) { // Allows non-rotated circles.
          if (circleSlopes[f] == "-0.00") {
            circleSlopes[f] = "0.00";
          }
          if (circleSlopes[f] == "-Infinity") {
            circleSlopes[f] = "Infinity";
          }
        }
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
                  shapeKind.iscircle = true;
                } else {
                  shapeKind.iscircle = false;
                }
              }
            }
          } else {
            if ((circlePts[0] == circlePts[1]) &&
              (circlePts[2] == circlePts[3]) &&
              ((circlePts[4] == circlePts[5]) && (circlePts[4] == circlePts[1]) && (circlePts[5] == circlePts[1])) &&
              ((circlePts[6] == circlePts[7]) && (circlePts[6] == circlePts[2]) && (circlePts[7] == circlePts[3]))) {
              shapeKind.isellipse = true;
            }
            //~                     $.writeln(circlePts[0]+'\r'+circlePts[1]+'\r'+circlePts[2]+'\r'+circlePts[3]+'\r'+
            //~                     circlePts[4]+'\r'+circlePts[5]+'\r'+circlePts[6]+'\r'+circlePts[7]);
          }
        }
      }
    }
    return shapeKind;
  }

  if (app.name != 'Adobe Illustrator' || app.documents.length <= 0) {
    alert('Must run in Illustrator with at least 1 document open.');
  }

  function rnd2(num) {
    return Math.round(num * 100) / 100;
  }

  function convertToUIRGB(color) {
    if (color == '[CMYKColor]') {
      var c = color.cyan, m = color.magenta, y = color.yellow, k = color.black;
      return [
        rnd2((1 - (c / 100)) * (1 - (k / 100))),
        rnd2((1 - (m / 100)) * (1 - (k / 100))),
        rnd2((1 - (y / 100)) * (1 - (k / 100)))
      ];
    } else if (color == '[GrayColor]') {
      var k         = color.gray;
      var grayValue = 1 - (Math.round(((k / 100) * 255) * 100) / 100) / 255;
      return [grayValue, grayValue, grayValue];
    } else if (color == '[GradientColor]') {
      $.writeln('Sorry, no gradient colors please.');
      return [0, 0, 0];
    } else if (color == '[PatternColor]') {
      $.writeln('Sorry, no pattern colors please.');
      return [0, 0, 0,];
    } else if (color == '[SpotColor]') {
      var clr = color.spot.getInternalColor();
      if (color.spot.spotKind == SpotColorKind.SPOTCMYK) {
        var c = clr[0], m = clr[1], y = clr[2], k = clr[3];
        return [
          rnd2((1 - (c / 100)) * (1 - (k / 100))),
          rnd2((1 - (m / 100)) * (1 - (k / 100))),
          rnd2((1 - (y / 100)) * (1 - (k / 100)))
        ];
      } else if (color.spot.spotKind == SpotColorKind.SPOTRGB) {
        return [rnd2(clr[0] / 255), rnd2(clr[1] / 255), rnd2(clr[2] / 255)];
      } else if (color.spot.spotKind == SpotColorKind.SPOTLAB) {
        var clr        = color.spot.getInternalColor();
        var whiteRef   = {
          D65: {X: 95.047, Y: 100, Z: 108.883},
          D50: {X: 96.422, Y: 100, Z: 82.521},
        };
        var illuminant = 'D65';
        var Y          = (clr[0] + 16) / 116;
        var X          = clr[1] / 500 + Y;
        var Z          = Y - clr[2] / 200;
        if (Math.pow(Y, 3) > 0.008856) {
          Y = Math.pow(Y, 3);
        }
        else {
          Y = (Y - 16 / 116) / 7.787;
        }
        if (Math.pow(X, 3) > 0.008856) {
          X = Math.pow(X, 3);
        }
        else {
          X = (X - 16 / 116) / 7.787;
        }
        if (Math.pow(Z, 3) > 0.008856) {
          Z = Math.pow(Z, 3);
        }
        else {
          Z = (Z - 16 / 116) / 7.787;
        }
        X *= whiteRef[illuminant].X, Y *= whiteRef[illuminant].Y, Z *= whiteRef[illuminant].Z;
        //alert(X+" "+Y+" "+Z);
        X /= 100, Y /= 100, Z /= 100;
        R = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
        G = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
        B = X * 0.0557 + Y * -0.2040 + Z * 1.0570;
        //alert(R+" "+G+" "+B);
        if (R > 0.0031308) {
          R = (1.055 * (Math.pow(R, (1 / 2.4)))) - 0.055;
        }
        else {
          R *= 12.92;
        }
        if (G > 0.0031308) {
          G = (1.055 * (Math.pow(G, (1 / 2.4)))) - 0.055;
        }
        else {
          G *= 12.92;
        }
        if (B > 0.0031308) {
          B = (1.055 * (Math.pow(B, (1 / 2.4)))) - 0.055;
        }
        else {
          B *= 12.92;
        }
        if (R < 0) {
          R = 0
        } else if (R > 1) {
          R = 1
        }
        if (G < 0) {
          G = 0
        } else if (G > 1) {
          G = 1
        }
        if (B < 0) {
          B = 0
        } else if (B > 1) {
          B = 1
        }
        return [rnd2(R), rnd2(G), rnd2(B)];
      }
    } else if (color == '[RGBColor]') {
      return [rnd2(color.red / 255), rnd2(color.green / 255), rnd2(color.blue / 255)];
    }
  }

  function drawFromObjString(objString, canvasArea) {
    function drawPath(shp) {
      var thisShp = shp;
      if (thisShp.ellipsePath != true) {
        var vectorPts = thisShp.pathPoints;
        canvas.newPath();
        canvas.moveTo(thisShp.pathPoints[0][0], thisShp.pathPoints[0][1]);
        for (var j = 0; j < vectorPts.length; j++) {
          var thisAnchor = vectorPts[j];
          var x          = thisAnchor[0], y = thisAnchor[1];
          canvas.lineTo(x, y);
        }
        if (thisShp.closed == true) {
          canvas.closePath();
        }
      } else {
        var cirPts = thisShp.pathPoints;
        canvas.newPath();
        canvas.ellipsePath(rnd2(cirPts[0]), rnd2(cirPts[1]), rnd2(cirPts[2]), rnd2(cirPts[3]));
        canvas.closePath();
      }
      if (thisShp.fillColor != null) {
        var clr     = thisShp.fillColor;
        var myBrush = canvas.newBrush(canvas.BrushType.SOLID_COLOR, clr);
        canvas.fillPath(myBrush);
      }
      if (thisShp.strokeColor != null) {
        var clr   = thisShp.strokeColor;
        var myPen = canvas.newPen(canvas.PenType.SOLID_COLOR, [clr[0], clr[1], clr[2], 1], thisShp.strokeWidth);
        canvas.strokePath(myPen);
      }
    }

    //$.writeln(objString.replace(/'\+\n*\r*'/g,'').replace(/(^'|';$)/g,''));
    var obj     = eval(objString.replace(/'\+\n*\r*'/g, '').replace(/(^'|';$)/g, ''));
    var canvas  = canvasArea.graphics;
    var counter = obj.total;
    while (counter >= 0) {
      for (all in obj) {
        if (all.match(/\d{1,2}$/g) && all.match(/\d{1,2}$/g) == counter) {
          var thisShp = obj[all];
          if (all.match('group')) {
            var ctr = obj[all].total;
            while (ctr >= 0) {
              for (paths in obj[all]) {
                if (paths.match(/\d{1,2}$/g) && paths.match(/\d{1,2}$/g) == ctr) {
                  drawPath(obj[all][paths]);
                }
              }
              ctr--;
            }
          } else {
            drawPath(thisShp);
          }
        }
      }
      counter -= 1;
    }
  }

  var doc = app.activeDocument;

  if (doc.height > 400 || doc.width > 600) {
    alert('Please use a document with main artboard no larger than 600x400.');
  }

  doc.rulerOrigin      = [0, doc.height];
  doc.coordinateSystem = CoordinateSystem.DOCUMENTCOORDINATESYSTEM;
  var wDims            = function() {
    var dims = {width: '', height: ''};
    if (doc.width > 220) {
      dims.width = Math.round(doc.width);
    } else {
      dims.width = 220;
    }
    if (doc.height > 20) {
      dims.height = Math.round(doc.height);
    } else {
      dims.height = 20;
    }
    return dims;
  }();

  function drawCapture(docArt, dataDisplay, graphicDisplay) {
    function capturePathItem(pathItem, drawObj, count) {
      var thisShp = pathItem, drawData = drawObj, i = count;
      if ((thisShp.filled || thisShp.stroked) && thisShp.editable == true) {
        drawData['shape_' + i]             = {};
        drawData['shape_' + i].fillColor   = null;
        drawData['shape_' + i].name        = thisShp.name;
        drawData['shape_' + i].tag         = thisShp.note;
        drawData['shape_' + i].strokeColor = null;
        drawData['shape_' + i].pathPoints  = [];
        drawData['shape_' + i].ellipsePath = false;
        if (itemShape(thisShp).iscircle == true || itemShape(thisShp).isellipse == true || thisShp.name == 'ellipse' ||
          thisShp.name == 'circle' || thisShp.name == 'cir') {
          drawData['shape_' + i].ellipsePath = true;
          drawData['shape_' + i].pathPoints  = [Math.round(thisShp.left), Math.round(-thisShp.top), Math.round(thisShp.width), Math.round(thisShp.height)];
          canvas.newPath();
          canvas.ellipsePath(Math.round(thisShp.left), Math.round(-thisShp.top), Math.round(thisShp.width), Math.round(thisShp.height));
        } else {
          var vectorPts = thisShp.pathPoints;
          canvas.newPath();
          canvas.moveTo(Math.round(vectorPts[0].anchor[0]), -Math.round(vectorPts[0].anchor[1]));
          for (var j = 0; j < vectorPts.length; j++) {
            var thisAnchor = vectorPts[j].anchor;
            var x          = Math.round(thisAnchor[0]), y = -Math.round(thisAnchor[1]);
            drawData['shape_' + i].pathPoints.push([x, y]);
            canvas.lineTo(x, y);
          }
        }
        if (thisShp.closed || drawData['shape_' + i].ellipsePath == true) {
          drawData['shape_' + i].closed = true;
          if (drawData['shape_' + i].ellipsePath != true) {
            canvas.closePath();
          }
        } else {
          drawData['shape_' + i].closed = false;
        }
        if (thisShp.filled) {
          var clr                          = thisShp.fillColor;
          var colorArray                   = convertToUIRGB(clr);
          var myBrush                      = canvas.newBrush(canvas.BrushType.SOLID_COLOR, colorArray);
          drawData['shape_' + i].fillColor = colorArray;
          canvas.fillPath(myBrush);
        }
        if (thisShp.stroked) {
          var clr                            = thisShp.strokeColor;
          var colorArray                     = convertToUIRGB(clr);
          var myPen                          = canvas.newPen(canvas.PenType.SOLID_COLOR, [colorArray[0], colorArray[1], colorArray[2], 1], Math.round(thisShp.strokeWidth));
          drawData['shape_' + i].strokeColor = colorArray;
          drawData['shape_' + i].strokeWidth = Math.round(thisShp.strokeWidth);
          canvas.strokePath(myPen);
        }
      }
    }

    // docArt is lately the layers[0].pageItems
    // draws a preview and creates a drawing data object resource.
    var drawData   = {total: 0}; //Put drawing shapes here.  Properties: stroke (rgb color | null), fill (rgb color | null), pathPoints
    var canvas     = graphicDisplay.graphics;
    vectors        = function() {
      var arr = [];
      for (var i = 0; i < docArt.length; i++) {
        var thisShp = docArt[i];
        if (thisShp.typename == 'PathItem' && thisShp.parent.typename != "GroupItem") {
          if ((thisShp.filled || thisShp.stroked) && thisShp.editable == true) {
            arr.push(thisShp);
          }
        } else if (thisShp.typename == 'GroupItem') {
          if (thisShp.pathItems.length > 0) {
            var smArr = [];
            for (var j = 0; j < thisShp.pathItems.length; j++) {
              var thisPth = thisShp.pathItems[j];
              if ((thisPth.filled || thisPth.stroked) && thisPth.editable == true) {
                smArr.push(thisPth);
              }
            }
            if (smArr.length > 0) {
              arr.push(smArr);
            }
          }
        }
      }
      return arr;
    }();
    drawData.total = vectors.length;
    for (var i = vectors.length - 1; i > -1; i--) {
      var thisShp = vectors[i];
      if (thisShp instanceof Array) {
        var grpObj = {};
        for (var j = thisShp.length - 1; j > -1; j--) {
          var thisPth = thisShp[j];
          capturePathItem(thisPth, grpObj, j);
        }
        grpObj.total                   = thisShp.length;
        var grpNm                      = function() {
          if (thisShp[0].parent.name != '') {
            return thisShp[0].parent.name + "_";
          }
          return '';
        }();
        drawData['group_' + grpNm + i] = grpObj;
      } else {
        capturePathItem(thisShp, drawData, i);
      }
    }
    return drawData;
  }

  function showDrawerFunc(objStringDisplay, wDims) {
    var w2         = new Window('dialog', 'Drawer Function');
    var containerG = w2.add('tabbedpanel');
    var funcG      = containerG.add('tab', undefined, 'Drawer Function');
    var dispE      = funcG.add('edittext', undefined, funcSrc, {multiline: true});
    dispE.size     = [580, 200];
    var selBtn     = funcG.add('button', undefined, 'Select All');
    var drawingG   = containerG.add('tab', undefined, 'Drawing:');
    var drawG      = drawingG.add('group');
    var drawP      = drawG.add('panel', undefined, '');
    drawP.size     = [wDims.width, wDims.height];
    var msgCntr    = w2.add('panel', undefined, 'Message Center:');
    var msgE       = msgCntr.add('edittext', undefined, '', {multiline: true});
    msgE.size      = [560, 40];
    var btnG       = w2.add('group');
    var okBtn      = btnG.add('button', undefined, 'Ok', {name: 'ok'});
    selBtn.onClick = function() {
      dispE.active = false;
      dispE.active = true;
    }
    drawG.onDraw   = function() {
      if (objStringDisplay.text != '') {
        try {
          drawFromObjString(objStringDisplay.text, this);
        } catch (e) {
          msgE.text = ("Something isn't right:\r" + e);
        }
      } else {
        msgE.text = ('You must first put a valid object string into the object string display area--> "Get Source Object String" button, 1st window, 1st tab.');
      }
    }
    w2.show();
  }

  function instructions() {
    var w3            = new Window('dialog', 'instructions');
    var instructions  = w3.add('edittext', undefined, '', {multiline: true});
    instructions.size = [400, 100];
    instructions.text = "1)  Have a document open, smaller than 600x400.\r\r" +
      "2)  Draw some stuff- use paths only, straight lines or ellipses only. To have script explicitly recognize ellipse, " +
      "label the path 'cir', 'circle', or 'ellipse'. Right now there's a function to detect (non-rotated) ellipses, but it is coarse.\r\r" +
      "3)  Run this script and see if your drawing was captured in the main window.\r\r" +
      "4)  Click the 'Get Object String' button and see the drawing instruction string appear.\r\r" +
      "5)  Click the 'View Drawer Function/Drawing' button to see the function used to draw scriptUI picture from" +
      " the object string and use other tab to see the drawing made with this function from that object string.\r\r" +
      "6)  Edit your string to see your picture change if needed!";
    var okBtn         = w3.add('button', undefined, 'OK');
    w3.show();
  }

  var funcSrc    = drawFromObjString.toSource();
  var dispWindow = function() {
    var drawData;
    var w = new Window('dialog', 'ScriptUI Graphics Display');

    var panel          = w.add('panel', undefined, '');
    panel.size         = [wDims.width + 6, wDims.height + 6];
    var list           = w.add('edittext', undefined, '', {multiline: true});
    list.size          = [wDims.width, 150];
    var formatG        = w.add('group');
    var formatH        = formatG.add('statictext', undefined, 'Format:');
    var format_returns = formatG.add('button', undefined, 'Returns before "(group|shape)_"');
    var btnsG          = w.add('group');
    var clickBtn       = btnsG.add('button', undefined, 'Get Source Object String');
    var selectBtn      = btnsG.add('button', undefined, 'Select All');
    var btnG2          = w.add('group');
    var funcBtn        = btnG2.add('button', undefined, 'See Drawer Function/Drawing');
    funcBtn.helpTip    = 'Uses the Object String picture info to draw using ScriptUIGraphics lineTo commands.';
    var helpBtn        = btnG2.add('button', undefined, '?');
    helpBtn.size       = [25, 25];
    panel.onDraw       = function() {
      drawData = drawCapture(doc.layers[0].pageItems, list, this);
    }
    clickBtn.addEventListener('mousedown', function() {
      list.text = drawData.toSource();
    });
    format_returns.onClick = function() {
      var str = list.text;
      var rx  = /(group|shape)_/g;
      if (str != '') {
        var rx      = /(group_|shape_)/g;
        var matches = str.match(rx);
        for (var i = 0; i < matches.length; i++) {
          var instance = rx.exec(str);
          str          = str.substring(0, rx.lastIndex - instance[0].length) + str.substr(rx.lastIndex - instance[0].length).replace(instance[0], "'+\r'" + instance[0]);
        }
      }
      list.text = "'" + str + "';";
    }
    funcBtn.onClick        = function() {
      showDrawerFunc(list, wDims);
    };
    helpBtn.onClick        = function() {
      instructions();
    }
    selectBtn.onClick      = function() {
      list.active = false;
      list.active = true;
    }
    var okBtn              = w.add('button', undefined, 'OK');
    w.show();
  }();
}
 