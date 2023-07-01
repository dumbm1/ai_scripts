processJpg();

function openEpses(opts) {
  var opts = opts || {};
  var MIN_FILE_SIZE = opts.MIN_FILE_SIZE || 500000;
  var folder = opts.folder || Folder.selectDialog();
  var files = folder.getFiles();

  var brushDoc = documents.getByName('window_brashes_vector-pack_grange-brashes.ai');
  brushDoc.activate();
  executeMenuCommand('selectall');
  copy();

  for (var i = 0, j = 0; i < files.length; i++) {
    var f = files[i];
    if (f instanceof File && f.name.slice(-4) == '.eps' && f.length <= MIN_FILE_SIZE) {
      var currDoc = open(f);
      if (currDoc == brushDoc) continue;
      var tmpLay = currDoc.layers.add();
      paste();
      tmpLay.remove();
      currDoc.close(SaveOptions.SAVECHANGES);
    }
  }

  alert('finish');

  // return JSON.stringify(files.length);
}


function processJpg() {
  var bt = new BridgeTalk();
  bt.target = 'photoshop';
  bt.body= sayHell.toString() + ";"  + "sayHell()";
  bt.send();
  function sayHell() {
    var opts = opts || {};
    var MIN_FILE_SIZE = opts.MIN_FILE_SIZE || 500000;
    var folder = opts.folder || Folder.selectDialog();
    var files = folder.getFiles();



    for (var i = 0, j = 0; i < files.length; i++) {
      var f = files[i];
      if (f instanceof File && f.name.slice(-4) == '.jpg' && f.length <= MIN_FILE_SIZE) {
        var currDoc = open(f);
        currDoc.resizeImage(currDoc.width*2, currDoc.height*2, currDoc.resolution * 2, ResampleMethod.PRESERVEDETAILS);
        currDoc.save();
        currDoc.close();
      }
    }

  }
}