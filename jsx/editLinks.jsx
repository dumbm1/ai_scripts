/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 18.09.2016
 *
 * editLinks_1.0
 * open linked files according to the extension
 * for example: the photoshop eps links open in photoshop
 */

//@target illustrator

(function editLinks () {
  var links = activeDocument.placedItems,
      paths = {};

  for (var i = 0; i < links.length; i++) {
    if (links[i].selected == true) {
      paths[(links[i].file).fullName] = i;
    }
  }

  for (var key in paths) {
    var fileExt;

    if (~key.lastIndexOf ('.')) {
      fileExt = key.slice (key.lastIndexOf ('.'));
    } else {
      continue;
    }

    switch (fileExt.toLowerCase ()) {
      case '.ai':
      case '.pdf':
      case '.svg':
        _openInIllustrator (key);
        break;
      case '.eps':
        _processEps (key);
        break;
      case '.psd':
      case '.png':
      case '.apng':
      case '.jpeg':
      case '.jpg':
      case '.gif':
      case '.tiff':
      case '.tif':
      case '.bmp':
        _openInPhotoshop (key);
        break;
      default:
        break;
    }
  }

  /**
   * LIB
   * */
  function _openInPhotoshop (filePath) {
    var bt    = new BridgeTalk ();
    bt.target = 'photoshop';
    bt.body   = 'var f = (new File("' + filePath + '")); app.open(f);';
    bt.send ();
  }

  function _openInIllustrator (filePath) {
    open (new File (filePath));
  }

  function _processEps (filePath) {
    var epsFile = new File (filePath),
        epsFileStr;

    epsFile.open ('r');
    epsFileStr = epsFile.read ();

    if (epsFileStr.match ('Creator: Adobe Photoshop')) {
      _openInPhotoshop (filePath);
    } else {
      _openInIllustrator (filePath);
    }

    epsFile.close ();
  }
} () );
