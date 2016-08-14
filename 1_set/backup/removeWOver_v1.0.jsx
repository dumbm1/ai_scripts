/** killWhiteOver_beta0.2.jsx
 * for Adobe Illustrator. Marat Shagiev. marat_js@bk.ru. Date ~ 26.05.14
 * MODE:
 * test active document for white overprints
 * IF FIND:
 * - recolor grey-white and spot-white to CMYK-white,
 * - remove white overprints
 * - support color models: CMYK, SPOT and GRAYSCALE
 * - support elements: paths, compound paths, text
 * CHANGES VERSUS beta0.1:
 * - repair some buggs
 * - text-frames processed as indivisible single objects
 * rather then characters collections (couse it was a slow tempo)
 */

//@target illustrator
var killWhiteOver = function () {

  var doc = activeDocument;
  var cmykWhite = new CMYKColor(); // cmyk-white

  // START PROCESS
  killer();

  function killer() {
    // collect all support elements
    var pathCollect = doc.pathItems;
    var compCollect = doc.compoundPathItems;
    var txtCollect = doc.textFrames;

    // if current document  have no supported elements, out function
    if (pathCollect.length == 0 && compCollect.length == 0 && txtCollect.length == 0) {
      alert('No supported elements');
      return;
    }

    // the array for all collected elements
    var elemArr = [];

    // push all elems to array
    for (var p = 0; p < pathCollect.length; p++) {
      if (pathCollect[p].parent.typename == "CompoundPathItem") continue; // avoid duplicating objects
      elemArr.push(pathCollect[p]);
    }
    for (var c = 0; c < compCollect.length; c++) {
      elemArr.push(compCollect[c]);
    }
    for (var t = 0; t < txtCollect.length; t++) {
      elemArr.push(txtCollect[t]);
    }

    // scanning, finding and killing
    for (var j = 0; j < elemArr.length; j++) {
      //  depending on the typename of elems define vars elem.fillColor and elem.strokeColor
      try {
        switch (elemArr[j].typename) {
          case 'PathItem':
            killerWeapon(elemArr[j]);
            break;
          case 'CompoundPathItem':
            killerWeapon(elemArr[j].pathItems[0]);
            break;
          case 'TextFrame':
            // textFrame as a collection of characters
            /*
             var frameChars = elemArr[j].textRange.characters;
             for (var i = 0; i < frameChars.length; i++) {
             killerWeapon(frameChars[i].characterAttributes);
             }
             */
            // textFrame as a single indivisible object
            var frameChars = elemArr[j].textRange;
            killerWeapon(frameChars.characterAttributes);
            break;
          default:
            // default action
            break;
        }
      } catch (e) {
      }
    }

    // COMMON TOOL
    function killerWeapon(elem) {
      // SPOT
      // fill
      try {
        if ((elem.fillColor + '' ) == '[SpotColor]' && elem.fillColor.tint < 1 &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          elem.fillColor.colorType = ColorModel.PROCESS;
          elem.fillColor = cmykWhite;
          elem.fillOverprint = false;
          elem.overprintFill = false;
        }
      } catch (e) {
      }
      // stroke
      try {
        if ((elem.strokeColor + '' ) == '[SpotColor]' && elem.strokeColor.tint < 1 &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          elem.strokeColor.colorType = ColorModel.PROCESS;
          elem.strokeColor = cmykWhite;
          elem.strokeOverprint = false;
          elem.overprintStroke = false;
        }
      } catch (e) {
      }
      // CMYK
      // fill
      try {
        if ((elem.fillColor + '' ) == '[CMYKColor]' &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.fillColor.cyan < 1 && elem.fillColor.magenta < 1 &&
              elem.fillColor.yellow < 1 && elem.fillColor.black < 1) {
              elem.fillOverprint = false;
              elem.overprintFill = false;
            }
          }
        }
      } catch (e) {
      }
      //stroke
      try {
        if ((elem.strokeColor + '' ) == '[CMYKColor]' &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          for (var l = 0; l < 3; l++) {
            if (elem.strokeColor.cyan < 1 && elem.strokeColor.magenta < 1 &&
              elem.strokeColor.yellow < 1 && elem.strokeColor.black < 1) {
              elem.strokeOverprint = false;
              elem.overprintStroke = false;
            }
          }
        }
      } catch (e) {
      }
      // GRAYSCALE
      // fill
      try {
        if ((elem.fillColor + '' ) == '[GrayColor]' && elem.fillColor.gray < 1 &&
          (elem.fillOverprint == true || elem.overprintFill == true)) {
          elem.fillOverprint = false;
          elem.overprintFill = false;
          elem.fillColor = cmykWhite;
        }
      } catch (e) {
      }
      //stroke
      try {
        if ((elem.strokeColor + '' ) == '[GrayColor]' && elem.strokeColor.gray < 1 &&
          (elem.strokeOverprint == true || elem.overprintStroke == true)) {
          elem.strokeOverprint = false;
          elem.overprintStroke = false;
          elem.strokeColor = cmykWhite;
        }
      } catch (e) {
      }
    }
  }
}();
