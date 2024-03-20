/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.08.2016.
 */

////@target illustrator

function insertArtbNumb () {
  var d     = activeDocument;
  var nLay  = d.layers.add ();
  nLay.name = '#artb';
  for (var i = 0; i < d.artboards.length; i++) {
    d.artboards.setActiveArtboardIndex (i);
    d.rulerOrigin              = [0, 0];
    d.artboards[i].rulerOrigin = [0, 0];
    var artbRect               = d.artboards[i].artboardRect;
    var txtFrame               = nLay.textFrames.add ();
    txtFrame.contents          = i;
    txtFrame.position          = [+artbRect[2] / 2, artbRect[3] + txtFrame.width * 2];
    redraw ();
  }
}

function UI_insertPageNumbers () {
  // script.name = UI_insertPageNumbers.jsx; // works with CS4 & CS5
// script description = Inserts page numbers (or any other text) to all artboards in the active document;
// script.required = at least one open document
// script.parent = CarlosCanto // 11/14/11;
// script.elegant = false;

// Notes: The script creates a new layer (Page Numbers) then adds a text frame per Artboard that act as footer or header text.
//                     Its primary function is to insert Page Numbers, but it could be used to insert any other kind of information.

  if (app.documents.length > 0) // continue if there's at leat one document open
  {
    // start building User Interface
    var win          = new Window ("dialog", "MTools - Insert Page Numbers");
    var panelMargins = win.add ("panel", undefined, "Margins");
    var lblMargins   = panelMargins.add ("statictext", undefined, "How far from the edge:");
    var txtMargins   = panelMargins.add ("edittext", undefined, 0.25);
    var lblUnits     = panelMargins.add ("statictext", undefined, "inches");

    var panelLocation = win.add ("panel", undefined, "Location");
    var radTop        = panelLocation.add ("radiobutton", undefined, "Top");
    var radBottom     = panelLocation.add ("radiobutton", undefined, "Bottom");

    var panelAlignment = win.add ("panel", undefined, "Alignment");
    var radLeft        = panelAlignment.add ("radiobutton", undefined, "Left");
    var radCenter      = panelAlignment.add ("radiobutton", undefined, "Center");
    var radRight       = panelAlignment.add ("radiobutton", undefined, "Right");

    var panelFooter = win.add ("panel", undefined, "Text to insert");
    var grpPages    = panelFooter.add ("group");
    var btnPage     = grpPages.add ("button", undefined, "Insert Page");
    var btnPages    = grpPages.add ("button", undefined, "Insert Pages");
    var txtFooter   = panelFooter.add ("edittext", undefined, "[Type text to insert here]");

    var btnOk = win.add ("button", undefined, "Ok");

    radRight.value = radBottom.value = true;

    win.alignChildren = panelFooter.alignChildren = "fill";
    panelMargins.spacing     = 3;
    panelMargins.orientation = panelLocation.orientation = panelAlignment.orientation = "row";

    win.helpTip       = "Coded by CarlosCanto";
    btnPage.helpTip   = "Adds *page* keyword, it represents a single page";
    btnPages.helpTip  = "Adds *pages* keyword, it represents total input-number of pages";
    txtFooter.helpTip = "Type \r\t'Page *page* of *pages*' \rto get \r\t'Page 1 of 3' \rfor example";

    //-----------------------------------------------------------------------------------------
    btnOk.onClick = function () {
      doSomething (); // call main function
      win.close (); // close when done
    }
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    btnPage.onClick = function () {
      footer ("*page*");
    }
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    btnPages.onClick = function () {
      footer ("*pages*");
    }
    //-----------------------------------------------------------------------------------------

    win.center ();
    win.show ();

    //-----------------------------------------------------------------------------------------

    function footer (page) //
    {
      txtFooter.text = txtFooter.text + page;
    }

    function doSomething () {
      //alert("I'm doing something");
      var idoc    = app.activeDocument;
      var ilayer  = idoc.layers.add ();
      ilayer.name = "Page Numbers";

      var pages       = idoc.artboards.length; // input-number of artboards
      var footerPages = (txtFooter.text).replace ("*pages*", pages); // replace the "*pages*" keyword with the actual input-number fo pages (artboards)

      var margins = Number (txtMargins.text) * 72; // get margins in points
      //$.writeln(margins);

      for (i = 0; i < idoc.artboards.length; i++) // loop thru all artboards, and add input text from UI
      {
        footerPage     = footerPages.replace ("*page*", i + 1); // replace "*page*" keyword with the actual page Number
        var itext      = ilayer.textFrames.add ();
        itext.contents = footerPage; //"page 1 of 1";
        var fontSize   = itext.textRange.characterAttributes.size;

        var activeAB = idoc.artboards[i];

        var iartBounds = activeAB.artboardRect;

        var ableft   = iartBounds[0] + margins;
        var abtop    = iartBounds[1] - margins;
        var abright  = iartBounds[2] - margins;
        var abbottom = iartBounds[3] + margins + fontSize;

        var abcenter = ableft + (abright - ableft) / 2;

        if (radRight.value == true) {
          //var msg = "right";
          itext.left                                        = abright;
          itext.textRange.paragraphAttributes.justification = Justification.RIGHT;
        }
        else if (radCenter.value == true) {
          //var msg = "center";
          itext.left                                        = abcenter;
          itext.textRange.paragraphAttributes.justification = Justification.CENTER;
        }
        else {
          //var msg = "Left";
          itext.left                                        = ableft;
          itext.textRange.paragraphAttributes.justification = Justification.LEFT;
        }

        if (radTop.value == true) {
          var msg   = "top";
          itext.top = abtop;
        }
        else {
          var msg   = "bottom";
          itext.top = abbottom;
        }
      } // end for loop thru all artboards
    } // end function doSomething();
  }
  else {
    alert ("there's no open documents");
  }
}
