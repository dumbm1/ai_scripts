(function _unlockAllVisible(){
  for ( var i = 0; i < activeDocument.layers.length; i++ ) {
    _unlockAllVisible ( activeDocument.layers[ i ] );
  }

  /**
   * рекурсивная ф-ция снятия блокировки со всех видимых элементов слоя
   * @param {Object} lay - объект класса Layer
   * @return {Object} lay - объект класса Layer
   */
  function _unlock ( lay ) {
    if ( lay.visible == false ) return;
    if ( lay.parent.typename == 'Layer' && lay.parent.visible == false ) return;

    lay.locked == true ? lay.locked = false : '';
    _unlockVisibleItems ( lay );

    for ( var i = 0; i < lay.layers.length; i++ ) {
      var thisSubLay = _getSubs ( lay )[ i ];
      if ( thisSubLay.visible == false ) continue;
      thisSubLay.locked == true ? thisSubLay.locked = false : '';
      _unlockVisibleItems ( thisSubLay );

      if ( _hasSubs ( thisSubLay ) ) {
        var parent = _unlockAllVisible ( thisSubLay );
        if ( parent.visible == false ) continue;
      }
    }

    /**
     * снятие блокировки с видимых элементов одноуровнего слоя
     */
    function _unlockVisibleItems ( lay ) {
      for ( var i = 0; i < lay.pageItems.length; i++ ) {
        lay.pageItems[ i ].locked == true ? lay.pageItems[ i ].locked = false : '';
      }
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

    return lay;
  }
}());

