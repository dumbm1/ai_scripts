/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 15.02.2015
 */

/**
 * Save user path to ini-file inside of it or to the end of this file
 *
 * @param {String} pathToIni exclude the file name which generated by this function
 * @return {String} customIniFullPath
 */
function iniPathSaver (pathToIni) {
  /**
   ********************** OPTIONS*****************************
   * */
  var thisJsxFullPath = this.global_thisJsxFullPath = '/' + ($.fileName).replace (/:\\/, "\/").replace (/\\/g, '/'),
    thisJsxName = this.global_thisJsxName = ($.fileName).slice (($.fileName).lastIndexOf ('\\') + 1),
    customIniFullPath = this.global_customIniFullPath = pathToIni + thisJsxName.slice (0, -4) + '.ini',

    customPathFuncToAdd = '\n' + 'function setIniCustomFullPath ()' + ' { return "' + customIniFullPath + '" }\n',
    fileStr = getStrFromFile (thisJsxFullPath),
    reTmpl = /\n\s*function\s+setIniCustomFullPath\s*\(\s*\)\s*\{\s*return\s+"?[^\\:\*\?"<>\|\n]*"?\s*}\n/m,
    reCurrent = new RegExp (
      '\n\\s*function\\s+setIniCustomFullPath\\s*\\(\\s*\\)\\s*\\{\\s*return\\s+' +
      '"' + customIniFullPath + '"' + '*\\s*}\n'
    ),
    newFileStr = '',
    commentStr =
      "\n/**\n" +
      " * The script writes to the end of himself this function\n" +
      " *\n" +
      " * @return {String} A path to save of the settings file, default or custom-user\n" +
      " */";

  /**
   ************************ MAIN ACTION *********************
   * */

  // declare and assigned a path saving ini-file
  try {
    var iniPath = setIniCustomFullPath (); // custom-user
  } catch (e) {
    var iniPath = setIniDefaultPath (); // default near this script file
  }

  if (execStr (fileStr, reTmpl) != null) { //  match the common pattern
    if (execStr (fileStr, reCurrent) == null) { // but not matching the current pattern
      newFileStr = replaceStr (fileStr, reTmpl, customPathFuncToAdd) // => replace the old func on the current func
    } else if (execStr (fileStr, reCurrent) != null) { // и есть совпадение с текущим шаблоном
      return iniPath // => вернуть прежний (но всё ещё актуальный) путь
    }
  } else if (execStr (thisJsxFullPath, reTmpl) == null) { // нет совпадения с общим шаблоном
    newFileStr = addToEndOfFile (thisJsxFullPath, commentStr + customPathFuncToAdd) // => добавить ф-цию в конец файла
    return ( customIniFullPath );
  }

  replaceFile (thisJsxFullPath, newFileStr);

  /**
   *********************** SUPERLIB **************************
   * */

  /**
   * Дефолтный полный путь сохранения файла настроек - рядом со скриптом
   *
   * @return {String} Полное имя ini-файла
   */
  function setIniDefaultPath () {
    return thisJsxFullPath.slice (0, -3) + 'ini'
  }

  /**
   * Добавление строки в конец файла
   *
   * @param {String} fullPath Полный путь к файлу
   * @param {String} addStr Строка для записи в конец файла
   */
  function addToEndOfFile (fullPath, addStr) {

    var f = new File (fullPath);

    f.open ('r');
    var fileStr = f.read ();
    f.close ();

    f.open ('e');
    f.write (fileStr + addStr);
    f.close ();

    return fileStr + addStr;
  }

  /**
   * Удаление файла и замена его новым файлом с новым содержимым
   *
   * @param {String} fullPath Полный путь к воссоздаваемому файлу
   * @param {String} newFileStr Новое содержимое файла
   */
  function replaceFile (fullPath, newFileStr) {

    newFileStr = newFileStr || '';

    var f = new File (fullPath);
    f.remove ();

    f = new File (fullPath);
    f.encoding = 'X-UNICODE-2-0-UTF-8'
    f.open ('e');
    f.write (newFileStr);
    f.close ();
  }

  /**
   * Найти совпадение с паттерном в исходном тексте
   *
   * @param {RegExp} re Паттерн, совпадение с которым ищется в исходном тексте
   * @param {String} str Исходный текст
   * @return {String/null} Совпадение или null
   */
  function execStr (str, re) {
    return re.exec (str)
  }

  /**
   * Заменить найденное в исходном тексте совпадение на новую подстроку
   *
   * @param {RegExp} re Паттерн, совпадение с которым ищется в исходном тексте
   * @param {String} str Исходный текст
   * @param {String} newStr Новая подстрока
   * @return {String} Итоговый текст
   */
  function replaceStr (str, re, newStr) {
    return str.replace (re, newStr)
  }

  /**
   * Считывает весь файл в строку и возвращает её
   *
   * @param {String} fullPath Полный путь к файлу, включает имя файла с расширением
   * @return {String} fileStr Весь текстовый файл в виде строки
   */
  function getStrFromFile (fullPath) {

    var f = new File (fullPath);
    f.open ('r');
    f.seek (0);
    var fileStr = f.read ();
    f.close ();

    return fileStr;
  }

  /**
   * ф-ция, записанная скриптом в конец себя
   *
   * @return {String} Путь хранения файла настроек скрипта, дефолтный или пользовательский
   */
  function setIniCustomFullPath () {
    return "/d/makeup_dots_v0.1.7.ini"
  }

  return customIniFullPath;
}