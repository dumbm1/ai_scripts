/*
 var userObj = { toString: function () { return "Ето моё объекто! Чо нада?!"} }
 alert ( wtf ( userObj ) ); // [object Object] не смотря на переопределение метода toString()
 alert ( wtf ( true ) ); // [object Boolean]
 alert ( wtf ( alert ) ); // [object Function]
 alert ( wtf ( NaN ) ); // [object Number]
 alert ( wtf ( '' ) ); // [object String]
 alert ( wtf ( new File ) ); // [object File]
 alert ( wtf ( app ) ); // [Application Adobe Illustrator]
 alert ( wtf ( activeDocument.pathItems[ 0 ] ) ); // [PathItem]
 */
/**
 * Тип ВСТРОЕННОГО js-объекта (Array, Date, String, Number, Function, Boolean, File, Folder, )
 * undefned выдаст глобальный объект, Null вызовет ошибку,
 * Для пользовательских объектов не подходит, т.к. выдаст Object
 *  @return {String} Тип
 *  */
function wtf ( obj ) {
  return ({}.toString.call ( obj ));
}
