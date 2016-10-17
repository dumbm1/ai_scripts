/**
 * ai.jsx MaratShagiev: m_js@bk.ru 17.03.2015
 */
delEmptyLays ();

/**
 * ф-ция удаления всех пустых слоёв/подслоёв
 */
function delEmptyLays () {

  for ( var i = 0; i < activeDocument.layers.length; i++ ) {
    var lay = activeDocument.layers[ i ];
    if ( _hasSubs ( lay ) ) {
      _delSubs ( lay );
    }
    if ( _isEmpty ( lay ) && activeDocument.layers.length > 1 ) { // попытка удалить единственный слой приведёт к его переименованию в <layer>
      lay.locked == true ? lay.locked = false : '';
      lay.visible == false ? lay.visible = true : '';
      lay.remove ();
      i--;
    }
  }

  /**
   * рекурсивная ф-ция удаления подслоя
   * @param {Object} lay - объект класса Layer
   * @return {Object} lay - объект класса Layer
   */
  function _delSubs ( lay ) {
    for ( var i = 0; i < lay.layers.length; i++ ) {
      var thisSubLay = _getSubs ( lay )[ i ];

      if ( _isEmpty ( thisSubLay ) ) {
        thisSubLay.locked == true ? thisSubLay.locked = false : '';
        thisSubLay.visible == false ? thisSubLay.visible = true : '';
        thisSubLay.remove ();
        i--;
      }

      if ( _hasSubs ( thisSubLay ) ) {
        var parent = _delSubs ( thisSubLay );
        if ( _isEmpty ( parent ) ) {
          thisSubLay.locked == true ? thisSubLay.locked = false : '';
          thisSubLay.visible == false ? thisSubLay.visible = true : '';
          thisSubLay.remove ();
          i--;
        }
      }
    }
    return lay;
  }

  /**
   * содержит ли слой объекты класса Layer
   * @param  {Object} lay - объект класса Layer
   * @return {Boolean} true, если есть подслои
   */
  function _hasSubs ( lay ) {
    try {
      return (lay.layers.length > 0);
    } catch ( e ) {
      return false;
    }
  }

  /**
   * содержит ли слой объекты классов PageItem или Layer
   * @param  {Object} lay - объект класса Layer
   * @return {Boolean} true, если слой пуст
   */
  function _isEmpty ( lay ) {
    try {
      return lay.pageItems.length == 0 && lay.layers.length == 0;
    } catch ( e ) {
      return false;
    }
  }

  /**
   * получить коллекцию layers данного layer
   * @param  {Object} lay - объект класса Layer
   * @return {Object/Boolean} - коллекция layers / false
   */
  function _getSubs ( lay ) {
    try {
      return lay.layers;
    } catch ( e ) {
      return false;
    }
  }
}
