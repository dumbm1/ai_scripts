/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 03.02.2015
 */

(function selCases() {
  if ( _isTextMode () && _isNoSel () ) {
    // alert ( 'режим редактирования текста, ничего не выделено' );
  } else if ( _isTextMode () && !_isNoSel () ) {
    // alert ( 'режим редактирования текста, что-то выделено' );
  } else if ( !_isTextMode () && _isNoSel () ) {
    // alert ( 'режим редактирования объектов, ничего не выделено' );
  } else if ( !_isTextMode () && !_isNoSel () ) {
    // alert ( 'режим редактирования объектов, что-то выделено' );
  }

// режим редактирования текста
  function _isTextMode () {
    return typeof selection.contents == 'string';
  }

// ничего не выделено
  function _isNoSel () {
    return selection.length == 0;
  }
}) ();