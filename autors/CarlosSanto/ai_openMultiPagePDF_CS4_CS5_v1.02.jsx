//@target illustrator
//@targetengine session

// script.name = AI_openMultiPagePDF_CS4_CS5_v1.02.jsx; 
// script.description = opens a multipage PDF;
// script.required = requires CS4 or later
// script.parent = CarlosCanto // 01/07/12;  v1.2-01/15/12
// script.elegant = false;

// Notes: I didn't try opening a ridiculous amount of pages, I "only" open 35 pages....in about a minute and a half.
// 		Use with caution, save everything before running, script is memory intensive...

// Lion fix by John Hawkinson 01/15/12

//----------------------- START UI CODE, create user interface
var win = new Window ("dialog", "MTools - Open Multipage PDF");

var fileGroup = win.add ("group"); // this is the group on the left, it holds the File button and the Font label note

var btnFile  = fileGroup.add ("button", undefined, "File..."); // button to select the PDF to open
var lblFonts = fileGroup.add ("statictext", undefined, "Unavailable\nFonts\nwill be\nsubstituted.", {multiline: true}); //

var grpRight = win.add ("group"); // group on the right, to hold everything else
var txtFile  = grpRight.add ("edittext", undefined); // to hold selected PDF file path

var grpPanel   = grpRight.add ("group");
var pagesPanel = grpPanel.add ("panel", undefined, "Page Range");
var lblFrom    = pagesPanel.add ("statictext", undefined, "From:");
var txtFrom    = pagesPanel.add ("edittext", undefined, 1);
var lblTo      = pagesPanel.add ("statictext", undefined, "To:");
var txtTo      = pagesPanel.add ("edittext", undefined, 1);

var btnGroup  = grpPanel.add ("group");
var btnOk     = btnGroup.add ("button", undefined, "Open");
var btnCancel = btnGroup.add ("button", undefined, "Cancel");

var lblStatus = grpRight.add ("statictext", undefined, "Open Multipage PDF requires CS4 or later...");

win.orientation = pagesPanel.orientation = "row"; // two items fileGroup and grpRight
win.alignChildren     = "right";
fileGroup.orientation = "column";
fileGroup.alignment   = "top";
txtFile.alignment     = ["fill", "top"];
lblStatus.alignment   = "left";

grpRight.orientation = "column";
btnGroup.orientation = "column";
btnOk.enabled        = false; // disable this button until a valid file is supplied

txtFrom.characters = txtTo.characters = 3;
btnFile.active = true; // receive the first "Enter"

win.helpTip      = "\u00A9 2012 Carlos Canto";
grpRight.helpTip = "Not tested with a ridiculous amount of pages";

//------------------------ get the PDF file
btnFile.onClick = function () {
  txtFile.text  = ""; // clear previous File path if any
  btnOk.enabled = false; // disable the Ok button
  var fileRef   = File.openDialog ("Select PDF...", "*.pdf"); // get the file
  fileRef       = new File (fileRef.fsName.replace ("file://", "")); // Lion fix by John Hawkinson
  if (fileRef != null && fileRef.exists) // check if it is valid file, it should be, unless after clicking a file, the name gets edited
  {
    txtFile.text  = fileRef.fsName; // show the file Path here
    btnOk.enabled = true; // enable the Ok button
    txtTo.active  = true; // move focus to change the last page to open
  }
}

//------------------------ 
btnOk.onClick = function () {
  doSomething (); // call main function.
  win.close (); // close when done
}

//------------------------ on leaving this text, check again if file exist, in case file path is typed instead of clicking the File...button
txtFile.onDeactivate = function () {
  //alert("on deactivate")
  var file = File (txtFile.text); // create a file based on the text edit control
  if (file.exists) { // and chekc for existance, if it does
    btnOk.enabled = true; // enable the Ok button
  }
  else { // if it does not exist
    btnOk.enabled = false; // disable the Ok button
  }
}

//------------------------

win.center ();
win.show ();
//-------------------------END UI CODE 

function doSomething () // Open each page in the range, group all art, move to a new document, then
{							// with all pages on top of each other, create artboards and move each page
  // to its final own layer, own artboard.
// get first page and last page to open
  $.hiresTimer; // start timer
  var from = txtFrom.text;
  var to   = txtTo.text;

// create destination document, pdf open options, etc
  app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
  var fileRef              = File (txtFile.text); // get file from text edit
  //alert(fileRef.name)

  var idoc                = app.documents.add (); // add a document;
  var pdfOptions          = app.preferences.PDFFileOptions;
  pdfOptions.pDFCropToBox = PDFBoxType.PDFBOUNDINGBOX;

  var spacing      = 10; // space between artboards
  var arrPagesInfo = []; // to hold each PDF page name, doc size and art position

  for (j = from; j <= to; j++) // open all pages in range, group art, and move the dest document
  {
    pdfOptions.pageToOpen = j;
// Open a file using these preferences

    var pdfDoc     = open (fileRef, DocumentColorSpace.RGB);
    lblStatus.text = "\u00A9 2012 Carlos Canto - Opening page " + j;
    win.update ();
    var pdfLayer = pdfDoc.activeLayer;

// add a group and group all items
    var items    = pdfLayer.pageItems; // get all items in layer, there's only one layer, right?
    var tempGrp  = pdfDoc.groupItems.add (); // to group everything in page
    tempGrp.name = "Page " + j; // name the group, "Page 1", "Page 2", etc

    for (i = items.length - 1; i > 0; i--) // group all items
    {
      items[i].move (tempGrp, ElementPlacement.PLACEATBEGINNING);
    }

// get document bounds

    var pdfw     = pdfDoc.width;
    var pdfh     = pdfDoc.height;
    var activeAB = pdfDoc.artboards[0];

    pdfLeft = activeAB.artboardRect[0];
    pdfTop  = activeAB.artboardRect[1];

    if (j == from) {
      firstabRect = activeAB.artboardRect;
      abRect      = firstabRect;
      //$.writeln(abRect);
    }
    else {
// TODO			// x = 8498 seems to be the canvas max X position, check and make another row if a page gets to here
      if ((abRect[2] + spacing + pdfw) >= 8494) // if rightmost artboard position surpases the canvas size,
      {
        var ableft   = firstabRect[0]; // position next artboard below the first one
        var abtop    = firstabRect[3] - spacing;
        var abright  = ableft + pdfw;
        var abbottom = abtop - pdfh;
        firstabRect  = [ableft, abtop, abright, abbottom];
      }
      else // if we don't get to the canvas edge, position next artboard, to the right of the last one
      {
        var ableft   = pageSpecs[3][2] + spacing; // pageSpecs[3] = abRect // abRect[2] = right position
        var abtop    = pageSpecs[3][1]; // abRect[1] = top position
        var abright  = ableft + pdfw;
        var abbottom = abtop - pdfh;
      }
      abRect = [ableft, abtop, abright, abbottom];
    }

// get this group position relative to top/left
    var deltaX = tempGrp.left - pdfLeft;
    var deltaY = pdfTop - tempGrp.top;

// make an array to hold each page Name, width, height, deltaX, deltaY
    pageSpecs = [tempGrp.name, deltaX, deltaY, abRect]; // pageSpecs holds last page info, it gets overwritten as we add pages
    arrPagesInfo.unshift (pageSpecs); // unshift to make first page, the last in the array

// duplicate grouped page 1 onto dest document
    newItem = tempGrp.duplicate (idoc, ElementPlacement.PLACEATBEGINNING);

// close current PDF page						
    pdfDoc.close (SaveOptions.DONOTSAVECHANGES);

  } // end for all pages to open

// Stage 2, create layers and artboards for each PDF page (group) and reposition 
// loop thru the groups, add artboards for each and reposition
  var ilayer = idoc.layers[idoc.layers.length - 1]; // the one layer so far
  for (k = arrPagesInfo.length - 1; k >= 0; k--) // last item in the array holds the first PDF page info
  {
// add new layer and new AB
    var newAB     = idoc.artboards.add (arrPagesInfo[k][3]);
    var newLayer  = idoc.layers.add ();
    newLayer.name = arrPagesInfo[k][0]

// reposition group relative to top/left
    var igroup = ilayer.groupItems[k];

    igroup.left = newAB.artboardRect[0] + arrPagesInfo[k][1];
    igroup.top  = newAB.artboardRect[1] - arrPagesInfo[k][2];
    igroup.move (newLayer, ElementPlacement.PLACEATEND);
// add new artboard to the left of existing one
    lblStatus.text = "Repositioning page " + k;
    win.update ();
  }
  idoc.artboards[0].remove ();
  ilayer.remove ();

  app.userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;
  var time                 = $.hiresTimer / 1000000; // end timer
  lblStatus.text           = "Copyright 2012 \u00A9 Carlos Canto";
  alert (arrPagesInfo.length + " pages opened in " + time.toFixed (2) + " seconds"); // 35 pages opened in 98-99 seconds
  //$.writeln(time);
}// end doSomething Function