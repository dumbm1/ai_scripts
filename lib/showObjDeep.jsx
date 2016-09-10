/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 06.06.2016
 * 
 * return string that is preview of object structure
 * recursive
 */

// test:
var obj = {
  cyan:    {
    color: "black",
    bg:    "cyan"
  },
  test:    {
    a: {
      b: {
        c: 'deep4'
      }
    }
  },
  magenta: {
    color: "white",
    bg:    "magenta"
  },
}

showObjDeep (obj);

function showObjDeep (obj) {
  var str    = '{\n';
  var indent = 1;

  showObj (obj);

  function showObj (obj) {

    for (var key in obj) {
      if (typeof obj[key] == 'object' /*&& !obj[key].splice*/) {
        str += addIndent (indent) + key + ':\n';
        ++indent;
        showObj (obj[key]);
      } else {
        str += addIndent (indent) + key + ': ' + obj[key] + ' [' + typeof obj[key] + '],\n';
      }
    }
    indent--;
  }

  return str + '}';
  function addIndent (i) {
    return new Array (i).join ('_');
  }
}
//previous
/*function showObjDeep (obj) {
  var str    = '{\n';
  var indent = 1;

  showObj (obj);

  function showObj (obj) {

    for (var key in obj) {
      if (typeof obj[key] == 'object' && !obj[key].splice) {
        str += addIndent (indent) + key + ':\n';
        ++indent;
        showObj (obj[key]);
      } else {
        str += addIndent (indent) + key + ': ' + obj[key] + ' [' + typeof obj[key] + '],\n';
      }
    }
    indent--;
  }

  return str + '}';
  function addIndent (i) {
    return new Array (i).join ('_');
  }
}*/
