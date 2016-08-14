/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 05.08.2016
 *
 * getEditCase_v0.0.1
 *
 */
/**
 * current case of edit mode in document (mode + selection)
 * mask of edit mode is 1, mask of selected is 2
 * @return (Number) editCase 0-3 current case of edit
 */
function getDocEditCase () {

  var sel             = selection,
      MASK_STR_MODE   = 1,
      MASK_SEL_LENGTH = 2,
      editCase;

  editCase = ( typeof sel.contents == 'string' ) * MASK_STR_MODE | ( sel.length == 0 ) * MASK_SEL_LENGTH;

  /**
   * static func: human output of current edit-case
   * @param {Number} editCase тcurrent edit-case
   * @return {String} modesDescription [ editCase ] human output
   */
  _getDocEditCase.modeDescription = function (editCase) {
    var modesDescription = [
      'the case of object edit, something selected',  // 0 | 0 = 0
      'the case of test edit, something selected',    // 1 | 0 = 1
      'the case of object edit, nothing selected',    // 0 | 2 = 2
      'the case of test edit, nothing selected'       // 1 | 2 = 3
    ];
    return modesDescription [editCase];
  }

  return editCase;
}
