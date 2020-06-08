//@target illustrator-22

/**
 * !!! WARNING !!!
 * !!! IT`S VERY DANGEROUS SCRIPT !!!
 *
 * unlock layers
 * unlock all items
 * make unvisible all layers
 * group all objects on layers exclude layers that contained sublayers
 * make visible all layers
 * */

;(function groupAllOnEachLay() {
  var doc  = activeDocument,
      lays = doc.layers;

  for (var i = 0; i < lays.length; i++) {lays[i].visible = true}
  for (var i = 0; i < lays.length; i++) {lays[i].locked = false}
  executeMenuCommand('unlockAll');
  for (var i = 0; i < lays.length; i++) {lays[i].visible = false}

  for (var i = 0; i < lays.length; i++) {
    if (lays[i].layers.length) continue;
    lays[i].visible = true;
    executeMenuCommand('selectall');
    executeMenuCommand('group');
    lays[i].visible = false;
  }

  for (var i = 0; i < lays.length; i++) {lays[i].visible = true}
}());
