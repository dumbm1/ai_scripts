//@target illustrator

// bench(selBySize, 10, [{size: [10, 10], units: 'mm'}]);
size_filter({
            units: 'pt',
            size: [100, 100],
          });

/**
 * Select ungrouped PathItems and CompoundPathItems in activeLayer
 *
 * @param {Object} {opts.size: [width, height], opts.units: String - 'mm' or 'pt'}
 * */
function size_filter(opts) {
  var MM_TO_PT = 2.834645668,
      factor;

  var opts = opts || {};
  opts.size = opts.size || [10, 10];
  opts.units = opts.units || 'mm';

  opts.units === 'pt' ? factor = 1 : factor = MM_TO_PT;

  executeMenuCommand('deselectall');

  var elW = opts.size[0] * factor;
  var elH = opts.size[1] * factor;
  var doc = activeDocument;
  var lay = doc.activeLayer;
  var elPaths = lay.pathItems;
  var elCompPaths = lay.compoundPathItems;

  for (var i = 0; i < elPaths.length; i++) {
    var elPath = elPaths[i];
    if (elPath.width > elW || elPath.height > elH) continue;
    elPath.selected = true;
  }

  for (var i = 0; i < elCompPaths.length; i++) {
    var elCompPath = elCompPaths[i];
    if (elCompPath.width > elW || elCompPath.height > elH) continue;
    elCompPath.selected = true;
  }
}

/**
 * repeat function 'f' 'count' times
 *
 * @param {Function} f - function to benchmarking
 * @param {Number} count - input-number of repeats
 * @param {Array} any input-number of any parameters, that passed to a function 'f'
 * @return {Array} [average execution time, total bench time]
 * */
function bench(f, count) {
  var args;
  if (arguments.length > 1) args = Array.apply(null, arguments).slice(2);
  var date = new Date();
  for (var i = 0; i < count; i++) {
    apply.f(null, args);
  }
  return [(new Date() - date) / count / 1000, (new Date() - date)];
}