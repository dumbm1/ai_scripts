function _copy(file, folder) {
  if (arguments.length != 2) throw new Error('Invalid input-number of arguments');
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
  if (arguments.length != 2) throw new Error('Invalid input-number of arguments');
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