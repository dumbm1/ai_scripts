/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 16.10.2020
 *
 * fastRelink_v1.1.0
 * Illustrator CC+
 *
 * перелинковывает много одиноковых линков на один указанный
 * relink all links in current document selection to one that you select in dialog
 *
 * использование:
 * выделить объекты
 * запустите скрипт
 * в открывшемся окне выберите нужный файл и нажмите ОК
 * все выделенные линки перелинкуются на выбранный
 *
 * особенности:
 * при замене внедрённых растровых объектов угол поворота не учитывается
 **/

fastRelink();

function fastRelink() {

  try {
    if (selection.length == 0) {
      throw new Error('Выделите линки и/или растровые изображения');
      return;
    } else if (_getPlaced().length == 0 && _getRasters().length == 0 && _getEmbedded().length == 0) {
      throw new Error('В выделенном фрагменте нет линков и растровых изображений');
      return;
    }

    var doc = activeDocument;
    var path; // начальная папка, открывающаяся в диалоге File(path).openDlg()

    if (!(File(doc.fullName).exists)) {
      path = Folder.desktop;
    } else {
      path = doc.fullName;
    }

    var newLinkFile = File(path).openDlg(); // откроется папка хранения текущего файла

    if (!newLinkFile) {
      throw new Error('Файл для релинка не выбран');
      return;
    }

    var embedded = _getEmbedded();
    var placed = _getPlaced();
    var rasters = _getRasters();

    _relinkAllPlaced(placed, newLinkFile);
    _relinkAllRasters(rasters, newLinkFile);
    _relinkAllEmbedded(embedded, newLinkFile);

  } catch (e) {
    alert(e.line + ' ' + e.message);
  }

  /**
   * перелинк всех  залинкованных файлов
   * @param {Array} placed - массив объектов класса PlacedItem
   * @param {Object} linkFile - файл для релинка
   */
  function _relinkAllPlaced(placed, linkFile) {
    for (var i = 0; i < placed.length; i++) {
      _relinkOnePlaced(placed[i], linkFile);
    }
  }

  /**
   * замена объекта класса RasterItem на объект класса PlacedItem
   * @param {Array} placed - линк
   * @param {Object} linkFile - файл для релинка
   */
  function _relinkAllRasters(rasters, linkFile) {
    for (var i = 0; i < rasters.length; i++) {
      _relinkOneRaster(rasters[i], linkFile);
    }
  }

  /**
   * замена объекта класса RasterItem на объект класса PlacedItem
   * @param {Array} embedded - массив объектов RasterItem, у которых сохранилась ссылка на файл
   * @param {Object} linkFile - файл для релинка
   */
  function _relinkAllEmbedded(embedded, linkFile) {
    for (var i = 0; i < embedded.length; i++) {
      _relinkOneEmbedded(embedded[i], linkFile);
    }
  }

  function _relinkOneEmbedded(embedded, linkFile) {
    var linkItem = embedded.layer.placedItems.add();
    linkItem.file = linkFile;
    linkItem.height = embedded.height;
    linkItem.width = embedded.width;
    linkItem.position = embedded.position;
    _moveAfter(linkItem, embedded);
    embedded.remove();
    return linkItem;
  }

  function _relinkOneRaster(raster, linkFile) {
    var linkItem = raster.layer.placedItems.add();
    linkItem.file = linkFile;
    linkItem.height = raster.height;
    linkItem.width = raster.width;
    linkItem.position = raster.position;
    _moveAfter(linkItem, raster);
    raster.remove();
    return linkItem;
  }

  function _relinkOnePlaced(placed, linkFile) {
    placed.file = linkFile;
    return placed;
  }

  /**
   * взять выделенные rasterItems имеющие file
   * @return {Array} embddedArr - массив rasterItem
   */
  function _getEmbedded() {
    var embeddedArr = [];
    var rasters = activeDocument.rasterItems;
    for (var i = 0; i < rasters.length; i++) {
      if (rasters[i].selected == true) {
        try {
          rasters[i].file ? embeddedArr.push(rasters[i]) : '';
        } catch (e) {
        }
      }
    }
    return embeddedArr;
  }

  /**
   * взять выделенные объекты класса rasterItem без file
   * @return {Array} rastersArr - массив из выделнных объектов класса rasterItem
   */
  function _getRasters() {
    var rastersArr = [];
    var rasters = activeDocument.rasterItems;
    for (var i = 0; i < rasters.length; i++) {
      if (rasters[i].selected == true) {
        try {
          rasters[i].file ? '' : '';
        } catch (e) {
          rastersArr.push(rasters[i]);
        }
      }
    }
    return rastersArr;
  }

  /**
   * взять выделенные объекты класса placedItem
   * @return {Array} placedArr - массив из выделнных объектов класса placedItem
   */
  function _getPlaced() {
    var placedArr = [];
    var placed = activeDocument.placedItems;

    for (var i = 0; i < placed.length; i++) {
      if (placed[i].selected == true) {
        placedArr.push(placed[i]);
      }
    }
    return placedArr;
  }

  /**
   * перемещает item непосредственно после target
   * @param {Object} item
   * @param {Object} target
   * */
  function _moveAfter(item, target) {
    try {
      if (target && item) {
        item.move(target, ElementPlacement.PLACEAFTER);
      }
    } catch (e) {
    }
  }
}

function getUnebedActionString(linkPath) {
  var actString = "/version 3" +
    "/name [ 5" +
    "	5365742032" +
    "]" +
    "/isOpen 1" +
    "/actionCount 1" +
    "/action-1 {" +
    "	/name [ 8" +
    "		416374696f6e2031" +
    "	]" +
    "	/keyIndex 0" +
    "	/colorIndex 0" +
    "	/isOpen 1" +
    "	/eventCount 1" +
    "	/event-1 {" +
    "		/useRulersIn1stQuadrant 0" +
    "		/internalName (adobe_placeDocument)" +
    "		/localizedName [ 5" +
    "			506c616365" +
    "		]" +
    "		/isOpen 1" +
    "		/isOn 1" +
    "		/hasDialog 1" +
    "		/showDialog 0" +
    "		/parameterCount 12" +
    "		/parameter-1 {" +
    "			/key 1885431653" +
    "			/showInPalette -1" +
    "			/type (integer)" +
    "			/value 1" +
    "		}" +
    "		/parameter-2 {" +
    "			/key 1668444016" +
    "			/showInPalette -1" +
    "			/type (enumerated)" +
    "			/name [ 7" +
    "				43726f7020546f" +
    "			]" +
    "			/value 1" +
    "		}" +
    "		/parameter-3 {" +
    "			/key 1885823860" +
    "			/showInPalette -1" +
    "			/type (integer)" +
    "			/value 1" +
    "		}" +
    "		/parameter-4 {" +
    "			/key 1851878757" +
    "			/showInPalette -1" +
    "			/type (ustring)" +
    "			/value [ 88" +
    "				433a5c55736572735c656c656e615c4f6e6544726976655cd0a0d0b0d0b1d0be" +
    "				d187d0b8d0b920d181d182d0bed0bb5c405c6661737452656c696e6b5c323032" +
    "				302e30362e30352041727461426f7820636f7079312e6169" +
    "			]" +
    "		}" +
    "		/parameter-5 {" +
    "			/key 1818848875" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 1" +
    "		}" +
    "		/parameter-6 {" +
    "			/key 1919970403" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 1" +
    "		}" +
    "		/parameter-7 {" +
    "			/key 1953329260" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 0" +
    "		}" +
    "		/parameter-8 {" +
    "			/key 1768779887" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 0" +
    "		}" +
    "		/parameter-9 {" +
    "			/key 1885828462" +
    "			/showInPalette -1" +
    "			/type (boolean)" +
    "			/value 0" +
    "		}" +
    "		/parameter-10 {" +
    "			/key 1935895653" +
    "			/showInPalette -1" +
    "			/type (real)" +
    "			/value 1.0" +
    "		}" +
    "		/parameter-11 {" +
    "			/key 1953656440" +
    "			/showInPalette -1" +
    "			/type (real)" +
    "			/value 0.0" +
    "		}" +
    "		/parameter-12 {" +
    "			/key 1953656441" +
    "			/showInPalette -1" +
    "			/type (real)" +
    "			/value 0.0" +
    "		}" +
    "	}" +
    "}";
}

function _runAction(actionName, setName, actionString) {
  var file = new File('~/JavaScriptAction.aia');
  file.open('w');
  file.write(actionString);
  file.close();
  loadAction(file);
  doScript(actionName, setName);
  unloadAction(setName, '');
  file.remove();
}
function _encodeStr2Ansii(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    var chr = File.encode(str[i]);
    chr = chr.replace(/%/gmi, '');
    if (chr.length == 1) {
      result += chr.charCodeAt(0).toString(16);
    } else {
      result += chr.toLowerCase();
    }
  }
  return result;
}