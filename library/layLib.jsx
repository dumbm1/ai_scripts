/**
 * Created by o-marat on 17.11.2014.
 */
/**
 * методы для работы со слоями
 * hasSubs(lay)
 * getSubs(lay)
 * getTopLay(lay)
 * */

var layLib = function () {
  var obj = {};
  /**
   * содержит ли слой объекты класса Layer
   * @param  {Layer} lay - объект класса Layer
   * @return {Boolean} true, если есть подслои
   */
  obj.hasSubs = function ( lay ) {
    try {
      return (lay.layers.length > 0);
    } catch ( e ) {
      return false;
    }
  }

  /**
   * получить коллекцию layers данного layer
   * @param  {Layer} lay - объект класса Layer
   * @return {Layer/Boolean} lay.layers / false - коллекция layers / false
   */
  obj.getSubs = function ( lay ) {
    try {
      return lay.layers;
    } catch ( e ) {
      return false;
    }
  }

  /**
   * Получить слой верхнего уровня у которого parent == document
   * @param {PageItem} item - объект класса PageItem
   * @return {Layer} item/getTopLay(item.parent) - слой верхнего уровня, объект класса Layer
   */
  obj.getTopLay = function ( item ) {
    if ( item.parent.typename == 'Document' ) return item;
    if ( item.parent.typename != 'Document' ) return obj.getTopLay ( item.parent );
  }

  var sel = selection[ 0 ];
  alert ( getTopLay ( sel ) );

  /**
   * содержит ли слой объекты классов PageItem или Layer
   * @param  {Layer} lay - объект класса Layer
   * @return {Boolean} true, если слой пуст
   */
  obj.isEmpty = function ( lay ) {
    try {
      return lay.pageItems.length == 0 && lay.layers.length == 0;
    } catch ( e ) {
      return false;
    }
  }

  return obj;
} ()

