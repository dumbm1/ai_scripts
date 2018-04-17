/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 18.09.2016
 *
 * editLinks_1.0
 * open linked files according to the extension
 * for example: the photoshop eps links open in photoshop
 */

//@target illustrator

(function editLinks() {
  var links = activeDocument.placedItems,
      paths = {};

  for (var i = 0; i < links.length; i++) {
    if (links[i].selected == true) {
      paths[(links[i].file).fullName] = i;
    }
  }

  for (var key in paths) {
    var fileExt;

    if (~key.lastIndexOf('.')) {
      fileExt = key.slice(key.lastIndexOf('.'));
    } else {
      continue;
    }

    switch (fileExt.toLowerCase()) {
      case '.ai':
      case '.pdf':
      case '.svg':
        _openInIllustrator(key);
        break;
      case '.eps':
        _processEps(key);
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
        _openInPhotoshop(key);
        break;
      default:
        break;
    }
  }

  /**
   * LIB
   * */
  function _openInPhotoshop(filePath) {
    if (!new File(filePath).exists) return false;

    startPhotoshopExeBat(4000, 3);

    var bt = new BridgeTalk();

    bt.target = 'photoshop';
    bt.body = 'var f = (new File("' + filePath + '")); app.open(f);';

    /*bt.onError = function (errorMsgObject) {
     $.writeln('error:\n' + showObjDeep(errorMsgObject));
     };
     bt.onTimeout = function (timeoutMsgObject) {
     $.writeln('timeout:\n' + showObjDeep(timeoutMsgObject));
     };
     bt.onReceived = function (origMsgObject) {
     $.writeln('received:\n' + showObjDeep(origMsgObject));
     };
     bt.onResult = function (responseMsgObject) {
     $.writeln('result:\n' + showObjDeep(responseMsgObject));
     };*/

    bt.send();

    function startPhotoshopExeBat(timeout, numAttempts) {
      for (var i = 0; i < numAttempts; i++) {
        switch (BridgeTalk.getStatus('photoshop')) {
          case 'BUSY':
          case 'IDLE':
          case 'PUMPING':
          case 'UNDEFINED':
            break;
          case 'ISNOTRUNNING':
            _execFile(Folder.temp.absoluteURI + '/' + 'startPs.bat', 'start photoshop.exe');
            $.sleep(timeout);
            break;
          case 'ISNOTINSTALLED':
            throw new Error('Photoshop is not installed');
            break;
          default:
            break;
        }
      }
    }

    /*function showObjDeep(obj) {
     var str = '{\n';
     var indent = 1;

     showObj(obj);

     function showObj(obj) {

     for (var key in obj) {
     if (typeof obj[key] == 'object' /!*&& !obj[key].splice*!/) {
     str += addIndent(indent) + key + ':\n';
     ++indent;
     showObj(obj[key]);
     } else {
     str += addIndent(indent) + key + ': ' + obj[key] + ' [' + typeof obj[key] + '],\n';
     }
     }
     indent--;
     }

     return str + '}';
     function addIndent(i) {
     return new Array(i).join('_');
     }
     }*/

    /**
     * make new file by full path, write to disk with some file contenr, execute file
     *
     * @param {String} filePath - FULL path (include file-extension)
     * @param {String} fileContent - content to new file
     */
    function _execFile(filePath, fileContent) {
      if (new File(filePath).exists) {
        new File(filePath).remove();
      }

      var f = new File(filePath);

      f.open('e');
      f.write(fileContent);
      f.close();
      f.execute();
    }
  }

  function _openInIllustrator(filePath) {
    open(new File(filePath));
  }

  function _processEps(filePath) {
    var epsFile = new File(filePath),
        epsFileStr;

    epsFile.open('r');
    epsFileStr = epsFile.read();

    if (epsFileStr.match('Creator: Adobe Photoshop')) {
      _openInPhotoshop(filePath);
    } else {
      _openInIllustrator(filePath);
    }

    epsFile.close();
  }
}() );
