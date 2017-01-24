/**
 * Adobe ExtendScript for Illustrator
 * (c) Marat Shagiev
 * e-mail: m_js@bk.ru
 * 24.01.2017
 * */
main();
function main() {
  var groupcopy,
      dialog,
      copyright,
      i,
      checkitems,
      flag,
      textobject,
      sels, groupall,
      groupedit,
      textarea,
      groupbtn,
      cancelbtn,
      submitbtn,
      doc;

  if (!documents.length) return;

  doc  = app.activeDocument;
  sels = doc.selection;

  if (!(sels.length > 0) || !(sels.typename != "TextRange")) return;

  checkitems = [];
  for (i = sels.length - 1; i >= 0; i--) {
    check(sels[i]);
    sels[i].selected = false;
  }

  flag = true;
  for (i = 0; i < checkitems.length; i = i + 1) {
    if (!flag) continue;
    checkitems[i].selected = true;
    textobject             = checkitems[i].textRange.contents;
    redraw();
    lang();
    dialog                             = new Window("dialog", dialogtitle + textobject, undefined, {resizeable: true});
    dialog.minimumSize                 = [290, 110];
    dialog.margins                     = [0, 0, 0, 0];
    dialog.orientation                 = "row";
    groupall                           = dialog.add("group");
    groupall.alignment                 = ["fill", "fill"];
    groupall.minimumSize               = [330, 100];
    groupall.margins                   = [10, 10, 10, 10];
    groupedit                          = groupall.add("group");
    groupedit.alignment                = ["fill", "fill"];
    groupedit.minimumSize              = [200, 90];
    textarea                           = groupedit.add("edittext", undefined, textobject, {
      multiline:  true,
      wantReturn: true
    });
    textarea.minimumSize               = [200, 90];
    textarea.alignment                 = ["fill", "fill"];
    textarea.active                    = true;
    groupbtn                           = groupall.add("group");
    groupbtn.orientation               = "column";
    groupbtn.alignment                 = ["right", "fill"];
    groupbtn.spacing                   = 5;
    cancelbtn                          = groupbtn.add("button", undefined, "Cancel");
    cancelbtn.size                     = [100, 30];
    cancelbtn.onClick                  = (function() {
      {
        flag                   = false;
        checkitems[i].selected = false;
        savedata();
        dialog.close();
      }
    });
    submitbtn                          = groupbtn.add("button", undefined, "OK");
    submitbtn.size                     = [100, 30];
    submitbtn.onClick                  = (function() {
      {
        checkitems[i].textRange.contents = textarea.text;
        checkitems[i].locked             = true;
        checkitems[i].selected           = false;
        checkitems[i].locked             = false;
        savedata();
        dialog.close();
      }
    });
    groupcopy                          = groupbtn.add("group");
    groupcopy.alignment                = ["fill", "fill"];
    copyright                          = groupcopy.add("statictext", undefined, "\xa93flab inc.");
    copyright.alignment                = ["center", "bottom"];
    copyright.graphics.foregroundColor = copyright.graphics.newPen(copyright.graphics.PenType.SOLID_COLOR, [0.350000, 0.350000, 0.350000], 1);
    dialog.onResizing                  = dialog.onResize = (function() {
      this.layout.resize();
    });
    statepref();
    adjust();
    dialog.show();

  }
  for (i = 0; i < sels.length; i = i + 1) {
    sels[i].selected = true;
  }

  function savedata() {
    var data, jsoncontents;
    {
      jsoncontents         = {};
      jsoncontents.windowx = dialog.bounds[0];
      jsoncontents.windowy = dialog.bounds[1];
      jsoncontents.windoww = dialog.bounds[2];
      jsoncontents.windowh = dialog.bounds[3];
      preffile.open("w");
      data = jsoncontents.toSource();
      preffile.write(data);
      preffile.close();
    }
  }

  function adjust() {
    var dialogx, dialogy, dialogw, dialogh;
    {
      if (preftext == undefined) {
        dialogx = 0;
        dialogy = 0;
        dialogw = 305;
        dialogh = 100;
        dialog.center();
      }
      else {
        dialogx = preftext.windowx;
        dialogy = preftext.windowy;
        dialogw = preftext.windoww;
        dialogh = preftext.windowh;
      }
      dialog.location      = {x: dialogx, y: dialogy};
      dialog.preferredSize = {width: dialogw - dialogx, height: dialogh - dialogy};
    }
  }

  function lang() {
    {
      if (app.locale == "ja_JP") {
        dialogtitle = "Edit Texts | ";
      }
      else {
        dialogtitle = "Edit Texts | ";
      }
    }
  }

  function statepref() {
    var jsxpath, originfolpath, jsxname, originfol, prefpath;
    {
      jsxpath = $.fileName;
      if (Folder.fs == "Macintosh") {
        originfolpath = Folder.userData + "/3flab/Illustrator/Scripts";
        jsxname       = jsxpath.split("/").pop();
      }
      else if (Folder.fs == "Windows") {
        originfolpath = Folder.userData + "\\3flab\\Illustrator\\Scripts";
        jsxname       = jsxpath.split("\\").pop();
      }
      originfol = new Folder(originfolpath);
      if (originfol.exists == false) {
        originfol.create();
      }
      prefpath          = (originfolpath + "/") + jsxname.replace(RegExp("(\\.jsx?)$", ""), ".json");
      preffile          = new File(prefpath);
      preffile.encoding = "UTF-8";
      preffile.open("r");
      preftext = preffile.readln();
      preftext = new Function("return" + preftext)();
      preffile.close();
    }
  }

  function check(item) {
    var childitem, j;
    {
      if (item.typename == "TextFrame") {
        checkitems.push(item);
      }
      else if (item.typename == "GroupItem") {
        for (j = item.pageItems.length - 1; j >= 0; j--) {
          childitem = item.pageItems[j];
          check(childitem);
        }
      }
    }
  }
}

