/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 01-03-2016
 *
 * editLinks_v0.3
 *
 * open all selected links
 *
 * whats new:
 * open linked files according to the extension
 * for example: the photoshop eps links open in photoshop
 */

//@target illustrator

(function editLinks () {
  var /*start = new Date (), // benchmarking*/
      links = activeDocument.placedItems,
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

  // alert ('Total time (without Photoshop work):\n' + _formatMs (new Date () - start)); // sample banchmarking
  /**
   * THE LIBRARY
   * */
  function _openInPhotoshop (filePath) {
    var bt    = new BridgeTalk ();
    bt.target = 'photoshop';
    bt.body   = 'var f = (new File("' + filePath + '")); app.open(f);';
    bt.send ();
  }

  function _openInIllustrator (filePath) {
    open (new File (filePath));
    // var bt    = new BridgeTalk ();
    // bt.target = 'illustraror';
    // bt.body   = 'var f = (new File("' + filePath + '")); app.open(f);';
    // bt.send ();
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

  function _formatMs (millisec) {

    var date       = new Date (millisec),
        formatDate =
          ('00' + date.getUTCHours ()).slice (-2) + ':' +
          ('00' + date.getMinutes ()).slice (-2) + ':' +
          ('00' + date.getSeconds ()).slice (-2) + ':' +
          ('000' + date.getMilliseconds ()).slice (-3);

    return formatDate;
  }

} () );
