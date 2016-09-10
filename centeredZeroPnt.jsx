(function centeredZeroPoint (){
  var doc = activeDocument;
  
  var artInd = doc.artboards.getActiveArtboardIndex();
  var art = doc.artboards[artInd];
  
  doc.rulerOrigin = [doc.width/2, doc.height/2];
  art.rulerOrigin = [doc.width/2, doc.height/2];
} ());
