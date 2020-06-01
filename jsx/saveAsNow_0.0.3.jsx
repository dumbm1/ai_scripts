;(function saveAsNow() {

  try {
    var d             = activeDocument,
        dFullName     = d.fullName,
        dPath         = d.path,
        dName         = d.name,
        copyFolder    = new Folder(dPath + '/rm'),
        now           = _formatDate(new Date()),
        fileNameNow   = _replaceDate(dName, now),
        copyBatString = 'copy ' + dFullName.fsName + ' ' + dPath.fsName + '\\rm\\' + d.name;

    // d.close(SaveOptions.DONOTSAVECHANGES);
    if (!copyFolder.exists)  copyFolder.create();


    _execFile('~/copy.bat', copyBatString);

    // open(new File(dPath + '/' + fileNameNow));

  } catch (e) {
    alert(e);
  }


  function _replaceDate(str, dateStr) {
    var reDate = /^.*_\d{1,2}[-._]\d{1,2}[-._]\d{2,4}.*\.ai$/;
    var reArtb = /^.*-\d{2}\.ai$/;
    var reAi = /^.*\.ai/;
    var resultStr;

    if (str.match(reDate)) {
      resultStr = str.replace(/_\d{1,2}[-._]\d{1,2}[-._]\d{2,4}/, '_' + dateStr);
    } else if (str.match(reArtb)) {
      resultStr = str.replace(/(^.*)(-\d{2}\.ai$)/, '$1' + '_' + dateStr + '$2');
    } else if (str.match(reAi)) {
      resultStr = str.replace(/(^.*)(\.ai$)/, '$1' + '_' + dateStr + '$2');
    } else {throw new Error('Rename error');}
    return resultStr;

  }

  function _formatDate(date) {
    var d = date || new Date();
    // форматировать дату, с учетом того, что месяцы начинаются с 0
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear()
    ];
    for (var i = 0; i < d.length; i++) {
      d[i] = d[i].slice(-2);
    }
    return d.slice(0, 3).join('-') + d.slice(3).join(':');
  }

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
}());