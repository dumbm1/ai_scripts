/**
 * runAction
 *
 * (1) создает на диске файл экшна в формате .aia
 * (2) открывает файл для записи
 * (3) записывает в файл тело экшна
 * (4) закрывает файл для четения/записи
 * (5) загружает сет и экшн в палитру Action Иллюстратора
 * (6) выполняет экшн
 * (7) удаляет сет из палитры Action
 * (8) удаляет файл с диска
 **/
function runAction(actionName, setName, actionString) {
  var file = new File('~/JavaScriptAction.aia'); // 1
  file.open('w'); // 2
  file.write(actionString); // 3
  file.close(); // 4
  loadAction(file); // 5
  doScript(actionName, setName); // 6
  unloadAction(setName, ''); // 7
  file.remove(); // 8
}

