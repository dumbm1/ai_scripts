//@target illustrator

try {
 tesseract_test();
} catch (e) {
 alert(e.line + '. ' + e.message);
}

function tesseract_test() {
 var ad = activeDocument;
 var tessWinPath = '/c/program files/tesseract-ocr/';
 var basePath = Folder.temp;

 if (!documents.length) return new Error('Document expected');
 if (!ad.selection.length) return new Error('Selection expected');
 if (!new Folder(tessWinPath).exists) return new Error('Tesseract app installed expected');

 var imgFile = _imgCapture();

 _execFile(
  basePath + '/ocr.bat',
  /**
   * Проблема - Иллюстратору не хватает прав для полноценного запуска и работы батника.
   * Батник запущеный от имени Иллюстратора выдает ошибку: 'Error, could not create TXT output file: Permission denied'.
   * Причем, если батник, созданный скриптом тут же запустить руками, то он нормально отработает -
   * создаст TXT файл с результатами работы Tesseract. Понятно, что от имени юзера.
   *
   *
   * Решение, нашел здесь:
   * https://stackoverflow.com/questions/6811372/how-to-code-a-bat-file-to-always-run-as-admin-mode
   *
   *
   * Не знаю, как это работает, но работает (права меняются, батник выполняется от имени юзера).
   * Начало волшебного кода:
   * */
  'set "params=%*"' + '\n' +
   ' cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && ""%~s0"" %params%", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )' +
   /**
    * конец волшебного кода.
    * Тестилось на Win 10 и 11.
    * */
   '\n' + '"' + new File(tessWinPath + '/tesseract.exe').fsName + '"  ' + imgFile.fsName + ' ' + new File (basePath + '/ocr-result').fsName + ' -l rus+eng  & exit'
 );

 function _imgCapture() {
  var imgBounds = ad.selection[0].geometricBounds,
      imgFile   = new File(basePath + '/img.png'),
      opts      = new ImageCaptureOptions();

  opts.antiAliasing = true;
  opts.resolution = 200;

  ad.imageCapture(
   imgFile,
   ad.selection[0].geometricBounds,
   opts
  );

  return imgFile;
 }

 /**
  * LIB
  * */
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

