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
    }
    else if (_getPlaced().length == 0 && _getRasters().length == 0 && _getEmbedded().length == 0) {
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
          rasters[i].file ? '' : ''
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