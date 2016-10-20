/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 20.10.2016
 *
 * killProcess
 */
//@target illustrator-19
(function killWinProcess (winProcessName) {
  /**
   * CEPHTMLEngine.exe
   * Illustrator.exe
   * ExtendScript Toolkit.exe
   * Photoshop.exe
   * Acrobat.exe
   * ...
   */
  _execFile (
    Folder.temp.absoluteURI + '/' + 'tasks_kill.bat',
    'taskkill /IM "' + winProcessName + '" /f'
  );
  /**
   * make new file by full path, write to disk with some file contenr, execute file
   *
   * @param {String} filePath - FULL path (include file-extension)
   * @param {String} fileContent - content to new file
   */
  function _execFile (filePath, fileContent) {
    if (new File(filePath).exists) {
      new File(filePath).remove();
    }

    var f = new File (filePath);

    f.open ('e');
    f.write (fileContent);
    f.close ();
    f.execute ();
  }
} ('Acrobat.exe'));
