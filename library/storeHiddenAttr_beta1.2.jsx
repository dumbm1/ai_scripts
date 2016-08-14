// работа со всем документом
// т.к. может возникнуть ситуёвина, когда верхний слой невидим
// в этом случае невозможно ничего сделать с нижними вложенными слоями

restoreHidden();


function restoreHidden() {
  var doc = activeDocument;

  var hideAttrObj = _getHideAttr(doc);

  // какое-то действие с объектами, например, выборочное удаление
  for (var i = 0; i < activeDocument.pageItems.length; i++) {
    var item = activeDocument.pageItems[i];
    i + 2 % 2 ? item.remove() : '';
  }
  // какое-то действие с объектами, например, назначение всем объектам аттрибута hidden = true
  for (var i = 0; i < activeDocument.pageItems.length; i++) {
    var item = activeDocument.pageItems[i];
    item.hidden = true;
  }

  _redoHideAttr(doc, hideAttrObj);

// взять все объекты и атрибут hidden
  function _getHideAttr(doc) {
    var obj = {};
    for (var i = 0; i < doc.pageItems.length; i++) {

      var item = doc.pageItems[i];
      var randStr = __makeRandStr();
      var typeName = item.typename;

      obj[typeName + '@' + randStr] = {
        hide: item.hidden,
        item: item
      };
    }

    /**
     * «Настоящее» копирование объекта
     * Т.к. при передаче объекта куда-либо, копируется лишь ссылка на него, то
     * чтобы скопировать сами данные, нужно достать их из объекта
     * и скопировать на уровне примитивов.
     */
    function __cloneObj(obj) {
      var cloneObj = {};
      for (var key in obj) {
        cloneObj[key] = obj[key];
        for (var entry in obj[key]) {
          cloneObj[key][entry] = obj[key][entry];
        }
      }
      return cloneObj;
    }

    function __makeRandStr() {
      return ("@" + (+new Date()) * Math.random() * 10000).slice(-7, -1);
    }

    return __cloneObj(obj);
  }

// восттановить для оставшихся объектов атрибут hidden
  function _redoHideAttr(lay, hideAttrObj) {
    for (var i = 0; i < lay.pageItems.length; i++) {
      var item = lay.pageItems[i];
      for (var key in hideAttrObj) {
        try {
          if (hideAttrObj[key].item == item) {
            item.hidden = hideAttrObj[key].hide;
          }
        } catch (e) {
          continue;
        }
      }
    }
  }

  //установить атрибут hidden для всех объектов слоя
  function _setHideAttr(lay, val){
    for (var i = 0; i < lay.pageItems.length; i++) {
      var item = lay.pageItems[i];
      item.hidden = val;
    }
  }

}