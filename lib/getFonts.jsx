//@target illustrator

function getFontsDemo (){
  var doc = activeDocument;
  var lay = doc.activeLayer;
  var sel = selection;
  var firstChar = 'M';

  var fonts = {};

  for(var i = 0; i < textFonts.length; i++) {
    fonts[textFonts[i].name] = (textFonts[i].name).slice(0,1).toUpperCase();
  }

  var input = '';
  for(var key in fonts){
    if (fonts[key] == firstChar){
      input += key + '; ';
    }
  }

  scrollWin (input)

  // COMMON LIB
  function runAction (actName, setName, actStr) {
    _makeAct (actStr);
    app.doScript (actName, setName, false); // action name, set name
    app.unloadAction (setName, ""); // set name

    function _makeAct (actStr) {
      var f = new File ('~/ScriptAction.aia');
      f.open ('w');
      f.write (actStr);
      f.close ();
      app.loadAction (f);
      f.remove ();
    }
  }

  function showObjDeep (obj) {
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
  }

  function scrollWin (input) {
    if (input instanceof Array)     input = input.join ("\r");

    var w    = new Window ("dialog", 'Scrollable alert'),
        list = w.add ("edittext", undefined, input, {multiline: true, scrolling: true});

    list.maximumSize.height = w.maximumSize.height - 100;
    list.minimumSize.width  = 600;

    w.add ("button", undefined, "Close", {name: "ok"});
    w.show ();
  }

}