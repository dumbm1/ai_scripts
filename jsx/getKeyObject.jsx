var horizontalAlignLeft = '/version 3' + '/name [ 19' + '	686f72697a6f6e74616c416c69676e4c656674' + ']' + '/isOpen 0' + '/actionCount 1' + '/action-1 {' + '	/name [ 19' + ' 686f72697a6f6e74616c416c69676e4c656674' + '	]' + '	/keyIndex 0' + '	/colorIndex 0' + '	/isOpen 1' + '	/eventCount 1' + '	/event-1 {' + ' /useRulersIn1stQuadrant 0' + ' /internalName (ai_plugin_alignPalette)' + ' /localizedName [ 9' + ' 416c69676e6d656e74' + ' ]' + ' /isOpen 1' + ' /isOn 1' + ' /hasDialog 0' + ' /parameterCount 1' + ' /parameter-1 {' + ' /key 1954115685' + ' /showInPalette -1' + ' /type (enumerated)' + ' /name [ 21' + ' 486f72697a6f6e74616c20416c69676e204c656674' + ' ]' + ' /value 1' + ' }' + '	}' +
  '}';

runAction('horizontalAlignLeft', 'horizontalAlignLeft', horizontalAlignLeft);

/**
 * runAction
 *
 * (1) создает на диске файл экшна в формате .aia
 * (2) открывает файл для записи
 * (3) записывает в файл тело экшна
 * (4) закрывает файл для четения/записи
 * (5) загружает сет и экшн в палитру Action Иллюстратора
 * (6) выполняет экшн
 * (7) удаляет сет и экшн из палитры Action
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
