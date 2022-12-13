/**
 * 13.12.2022
 * make scales for GammaFlex
 */

var dPantNames = getDocPantNames();
var dCMYK = ['cyan', 'magenta', 'yellow', 'black'];
var dColors = dPantNames.concat(dCMYK);

make_scales({
              colorNames: dColors,
              figure: "rectangle",
            });

function make_scales(opts) {

  var MM_TO_PT = 2.834645668,
      doc      = activeDocument;

  var opts       = opts || {},
      colorSteps = opts.colorSteps || [100, 70, 50, 30, 3],
      figure     = opts.figure || 'ellipse',
      RADIUS     = opts.radius * MM_TO_PT || 5 * MM_TO_PT,
      colorNames = opts.colorNames || ['cyan', 'magenta', 'yellow', 'black'],
      shiftTop   = opts.shiftTop * MM_TO_PT || 0,
      shiftLeft  = opts.shiftLeft * MM_TO_PT || 0;

  if (figure != 'ellipse' && figure !== 'rectangle') {
    throw new Error('"' + figure + '" is unsupported element type');
  }

  nextColorName:
    for (var j = 0; j < colorNames.length; j++) {
      var colorName = colorNames[j];

      switch (colorName) {
        case 'cyan':
        case 'magenta':
        case 'yellow':
        case 'black':

          for (var i = 0; i < colorSteps.length; i++, shiftTop -= RADIUS) {
            var el = doc.pathItems[figure](shiftTop, shiftLeft, RADIUS, RADIUS);
            var col = new CMYKColor();
            col[colorName] = colorSteps[i];
            el.fillColor = col;
            el.stroked = false;
          }
          break;

        default:

          try {
            var spotItem = doc.spots.getByName(colorName);
            var newSpot = new SpotColor();

            newSpot.spot = spotItem;

            if (spotItem.colorType != 'ColorModel.SPOT') continue nextColorName;

            for (var i = 0; i < colorSteps.length; i++, shiftTop -= RADIUS) {
              var el = doc.pathItems[figure](shiftTop, shiftLeft, RADIUS, RADIUS);
              newSpot.tint = colorSteps[i];
              el.fillColor = newSpot;
              el.stroked = false;
            }
          } catch (e) {
            continue nextColorName;
          }

          break;
      }

    }

  return 'the scales is good!';
}

function getDocPantNames(doc) {
  try {
    var d = doc || activeDocument;
  } catch (e) {
    return e.line;
  }

  var spots      = d.spots,
      dPantNames = [];

  for (var i = 0; i < spots.length; i++) {
    var spot = spots[i];
    if (spot.colorType != 'ColorModel.SPOT') continue;
    dPantNames.push(spot.name);
  }

  return dPantNames;
}
