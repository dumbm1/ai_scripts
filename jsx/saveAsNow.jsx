//@target illustrator-22
;(function saveAsNow() {
  /**
   * close active document
   * move file to the new folder via read/write
   **/

  try {
    var status = '??? Unknown status ???';

    if (documents.length == 0) throw new Error('No open documents!');

    var aD          = activeDocument,
        adFullName  = aD.fullName,
        folderName  = 'rm',
        file        = new File(adFullName),
        folder      = new Folder(file.path + '/rm'),
        now         = _formatDate(new Date()),
        fileNewName = _replaceDate(file, now),
        copyStatus, renameStatus;

    aD.close(SaveOptions.DONOTSAVECHANGES);

    copyStatus = _copy(file, folder);
    renameStatus = file.rename(_replaceDate(file, now));

    status = 'copy status: ' + copyStatus + '\n' + 'rename status: ' + renameStatus;

    open(new File(_replaceDate(file, now)));

  } catch (e) {
    status = e;
  } finally {
    alert(status);
    return status;
  }

  function _copy(file, folder) {
    if (arguments.length != 2) throw new Error('Invalid number of arguments');
    if (!file.exists) throw new Error("Moving file doesn't exists");
    if (!folder.getFiles) throw new Error("Folder doesn't passed");

    if (!folder.exists) folder.create();
    if (!folder.exists) throw new Error("Folder doesn't exists");

    var fileCopy, fileBinStr, files;

    fileCopy = new File(folder.fullName + '/' + file.name);

    file.encoding = 'BINARY';
    fileCopy.encoding = 'BINARY';

    file.open('r');
    fileBinStr = file.read();
    file.close();

    fileCopy.open('e');
    fileCopy.write(fileBinStr);
    fileCopy.close();

    files = folder.getFiles('*.ai');

    for (var i = 0; i < files.length; i++) {
      if (fileCopy.fullName != files[i].fullName) continue;
      return 'All good!';
    }
    throw new Error("Unknown Error");
  }

  function _move(file, folder) {
    if (arguments.length != 2) throw new Error('Invalid number of arguments');
    if (!file.exists) throw new Error("Moving file doesn't exists");
    if (!folder.getFiles) throw new Error("Folder doesn't passed");

    if (!folder.exists) folder.create();
    if (!folder.exists) throw new Error("Folder doesn't exists");

    var fileCopy, fileBinStr, files;

    fileCopy = new File(folder.fullName + '/' + file.name);

    file.encoding = 'BINARY';
    fileCopy.encoding = 'BINARY';

    file.open('r');
    fileBinStr = file.read();
    file.close();

    fileCopy.open('e');
    fileCopy.write(fileBinStr);
    fileCopy.close();

    files = folder.getFiles('*.ai');

    for (var i = 0; i < files.length; i++) {
      if (fileCopy.fullName != files[i].fullName) continue;
      file.remove();
      return 'All good!';
    }
    throw new Error("Unknown Error");
  }

  function _replaceDate(file, dateStr) {
    var reDate = /^.*_\d{1,2}[-._]\d{1,2}[-._]\d{2,4}.*\.ai$/;
    var reArtb = /^.*-\d{2}\.ai$/;
    var reAi = /^.*\.ai/;
    var str = file.name;
    var newFileName;

    if (str.match(reDate)) {
      newFileName = str.replace(/_\d{1,2}[-._]\d{1,2}[-._]\d{2,4}/, '_' + dateStr);
    } else if (str.match(reArtb)) {
      newFileName = str.replace(/(^.*)(-\d{2}\.ai$)/, '$1' + '_' + dateStr + '$2');
    } else if (str.match(reAi)) {
      newFileName = str.replace(/(^.*)(\.ai$)/, '$1' + '_' + dateStr + '$2');
    } else {throw new Error('Rename error');}
    return newFileName;

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
}());
