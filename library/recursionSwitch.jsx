/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 13.05.2016
 */

function _setColor (item, footerColor) {

  switch (item.typename) {
    case 'CompoundPathItem':
      item.pageItems[0].fillColor = footerColor;
      break;
    case 'GroupItem':
      for (var i = 0; i < item.pageItems.length; i++) {
        _setColor (item.pageItems[i]);
      }
      break;
    case 'PathItem':
      item.fillColor = footerColor;
      break;
    default:
      break;
  }
}
