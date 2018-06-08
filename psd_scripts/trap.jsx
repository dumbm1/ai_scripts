//@target photoshop
try {
  var trapW = +prompt('Traping Width', '1');
  var aDoc = activeDocument;
  var tmpDoc = aDoc.duplicate('tmpTrapDoc');
  tmpDoc.trap(trapW);
  tmpDoc.activeLayer.copy();
  tmpDoc.close(SaveOptions.DONOTSAVECHANGES);
  aDoc.activeLayer = activeDocument.layers[0];
  aDoc.paste();
}
catch (e) {
  alert(e);
}
