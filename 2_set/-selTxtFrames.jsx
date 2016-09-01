/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 01.09.2016
 */

(function selTxt () {
  for (var i = 0; i < activeDocument.pageItems.length; i++) {
    if (activeDocument.pageItems[i].toString ().slice (1, 10) == "TextFrame") {
      activeDocument.pageItems[i].selected = true;
    }
  }
} ());
