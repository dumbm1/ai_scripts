/**
 * Adobe ExtendScript for Illustrator CS4±
 * Marat Shagiev m_js@bk.ru
 * Autor: Vasily Hall
 * */

//@target illustrator-19

(function recolorArtwork () {
  if (app.documents.length == 0) {
    alert ("No open documents detected.");
    return;
  }
  var csvFile = File.openDialog ("Open CSV File", "*.csv");
  if (!csvFile) {
    alert ("No file chosen");
    return;
  }
  var regionsAndColors = getCells (readSemicolonCSV (csvFile));
  var doc              = app.activeDocument;

  for (var i = 1; i < regionsAndColors.length; i++) {
    applyColorSettingsRow (regionsAndColors[i][0], regionsAndColors[i][1]);
  }

  function readSemicolonCSV (filePath) {
    var f = File (filePath);
    if (!f.exists) {
      alert (f + " is not found.");
      return false;
    }
    var str = "";
    f.open ("r");
    str = f.read ();
    f.close ();
    return str;
  }

  function getCells (str) {
    var rows = str.split (/[\n\r]/g);
    for (var i = 0; i < rows.length; i++) {
      rows[i] = rows[i].split (/;/g);
    }
    return rows;
  }

  function applyColorSettingsRow (regionName, colorName) {
    var doc = app.activeDocument, thisRegionShape, thisColor;
    try {
      thisRegionShape           = doc.layers.getByName (regionName).pathItems[0];
      thisColor                 = doc.swatches.getByName (colorName);
      thisRegionShape.fillColor = thisColor.color;
    } catch (e) {
      $.writeln ("Region: " + regionName + "\tColor: " + colorName + "\r" + e + "\n\n");
    }
  }

} ());
