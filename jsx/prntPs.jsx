/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 14.08.2016
 *
 * printPostScript_v0.0.1
 * */

////@target illustrator-20

( function printPostScript () {
  var doc                     = activeDocument;
  var sepOpts                 = new PrintColorSeparationOptions ();
  var opts                    = new PrintOptions ();
  opts.colorSeparationOptions = sepOpts;
  sepOpts.colorSeparationMode = PrintColorSeparationMode.INRIPSEPARATION;
  sepOpts.convertSpotColor    = true;
  opts.printerName            = 'Adobe PostScript File';
  opts.PPDName                = 'Adobe PDF';
  // opts.printPreset = 'psPrinter_ppdPdf';

  activeDocument.inkList[0].inkInfo.printingStatus = false /*= InkPrintStatus.DISABLEINK*/;

  doc.print (opts);

  function prntInIndd () {
    with (app.activeDocument.printPreferences) {
      printer          = Printer.postscriptFile;
      reverseOrder     = false;
      pageRange        = PageRange.allPages;
      printSpreads     = false;
      printMasterPages = false;
      sequence         = Sequences.all;
      try {
        colorOutput = ColorOutputModes.separations;
        trapping    = Trapping.applicationBuiltin;
        flip        = Flip.none;
      }
      catch (myError) {
      }
      try {
        if (trapping == Trapping.off) {
          printBlack   = true;
          printCyan    = true;
          printMagenta = true;
          printYellow  = true;
        }
      }
      catch (myError) {
      }
      try {
        if (trapping == Trapping.off) {
          printBlankPages  = false;
          printGuidesGrids = false;
          printNonprinting = false;
        }
      }
      catch (myError) {
      }

      try {
        paperSize            = PaperSizes.custom;
        printPageOrientation = PrintPageOrientation.portrait;
        pagePosition         = PagePositions.centered;
        paperGap             = 0;
        paperOffset          = 0;
        paperTransverse      = false;
        scaleHeight          = 100;
        scaleWidth           = 100;
        scaleMode            = ScaleModes.scaleWidthHeight;
        scaleProportional    = true;
      }
      catch (myError) {
      }
      try {
        if (trapping == Trapping.off) {
          textAsBlack = false;
          thumbnails  = false;
          tile        = false;
        }
      }
      catch (myError) {
      }
      useDocumentBleedToPrint = false;
      bleedBottom             = app.activeDocument.documentPreferences.documentBleedBottomOffset + 3;
      bleedTop                = app.activeDocument.documentPreferences.documentBleedTopOffset + 3;
      bleedInside             = app.activeDocument.documentPreferences.documentBleedInsideOrLeftOffset + 3;
      bleedOutside            = app.activeDocument.documentPreferences.documentBleedOutsideOrRightOffset + 3;
      if (bleedBottom == 0 && bleedTop == 0 && bleedInside == 0 &&
        bleedOutside == 0) {
        bleedMarks = true;
      }
      else {
        bleedMarks = false;
      }
      colorBars            = true;
      cropMarks            = true;
      includeSlugToPrint   = false;
      markLineWeight       = MarkLineWeight.p125pt
      markOffset           = 6;
      pageInformationMarks = true;
      registrationMarks    = true;
      try {
        sendImageData = ImageDataTypes.allImageData;
      }
      catch (myError) {
      }
      fontDownloading  = FontDownloading.complete;
      downloadPPDFOnts = true;
      try {
        dataFormat = DataFormat.binary;
      }
      catch (e) {
      }
      try {
        postScriptLevel = PostScriptLevels.level3;
      }
      catch (e) {
      }
      try {
        sourceSpace = SourceSpaces.useDocument;
        intent      = RenderingIntent.useColorSettings;
        crd         = ColorRenderingDictionary.useDocument;
        profile     = Profile.postscriptCMS;
      }
      catch (e) {
      }
      opiImageReplacement = false;
      omitBitmaps         = false;
      omitEPS             = false;
      omitPDF             = false;
      try {
        flattenerPresetName = "high quality flattener";
      }
      catch (e) {
      }
      ignoreSpreadOverrides = false;
    }
  }

} ());
