/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 26.01.2015
 */

Folder.prototype.extension = function () {
  return undefined;
}

File.prototype.extension = function () {
  var dotPos = this.displayName.lastIndexOf ( '.' );
  if ( dotPos == -1 ) return '';
  return this.displayName.slice ( dotPos + 1 ).toLowerCase ();
}

File.prototype.noExtension = function () {
  var dotPos = this.displayName.lastIndexOf ( '.' );
  dotPos == -1 ? dotPos = this.displayName.length : '';
  return this.displayName.slice ( 0, dotPos );
}

function _isAiFile ( obj ) {
  return obj.constructor.name === 'File' && !obj.hidden && obj.extension () == "ai";
}

function _isEpsFile ( obj ) {
  return obj.constructor.name === 'File' && !obj.hidden && obj.extension () == "eps";
}

// разные проверки
//var f = new File ( activeDocument.fullName );
//alert ( f.exists )
//alert ( f.fullName );
//alert ( _isAiFile ( f ) || _isEpsFile ( f ) );
//alert ( !_isAiFile ( f ) && !_isEpsFile ( f ) );
//alert ( f.extension () );
//alert ( f.noExtension () );
//alert ( f.displayName );

