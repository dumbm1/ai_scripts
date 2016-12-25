/**
 * Adobe ExtendScript for Illustrator CC+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 24.12.2016
 * */
//@target illustrator
(function selectionCases() {

  if (_isTextMode() && _isNoSel()) {
    alert('mode editing text, nothing is selected');
  } else if (_isTextMode() && !_isNoSel()) {
    alert('mode editing text, something is selected');
  } else if (!_isTextMode() && _isNoSel()) {
    alert('mode editing objects, nothing is selected');
  } else if (!_isTextMode() && !_isNoSel()) {
    alert('mode editing objects, something selected');
  }

  function _isTextMode() { // mode editing text
    return typeof selection.contents == 'string';
  }

  function _isNoSel() { // nothing is selected
    return selection.length === 0;
  }
})();