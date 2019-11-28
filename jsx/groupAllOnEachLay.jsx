//@target illustrator-22

;(function groupAllOnEachLay() {
  var doc  = activeDocument,
      lays = doc.layers;

  executeMenuCommand('unlockAll');
  for (var i = 0; i < lays.length; i++) {lays[i].visible = false}

  for (var i = 0; i < lays.length; i++) {
    lays[i].visible = true;
    executeMenuCommand('selectall');
    executeMenuCommand('group');
    lays[i].visible = false;
  }

  for (var i = 0; i < lays.length; i++) {lays[i].visible = true}
}());
