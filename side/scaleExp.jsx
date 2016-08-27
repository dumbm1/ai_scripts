/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 28.08.2016
 *
 * compatible CS6+
 *
 * scaleAndExport with logging to estk console
 *
 * 1. save all artboards to PDF
 * 2. open each pdf page in photoshop and save in jpeg
 * 3. scale each artboard with content
 * 4. export each artboard to eps
 *
 */
//@target illustrator
//@targetengine "sss"

/*(function () {
 if ( documents.length == 1 ) {
 expAndScaleEachArtb ( documents[ 0 ] );
 return;
 } else {
 for ( var i = 0; i < documents.length; i++ ) {
 expAndScaleEachArtb ( documents[ i ] );
 i--;
 }
 }
 } ());*/
expAndScaleEachArtb (activeDocument);

function expAndScaleEachArtb (adoc) {

  try {
    app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

    var showConfirm        = false,
        storeInteractLavel = app.userInteractionLevel,
        fileName           = adoc.name.slice (0, adoc.name.lastIndexOf ('.')),
        folderPath         = '/d/Кнопки/1', // можно менять: произвольная папка сохранения jpeg  и eps
        //        folderPath         = adoc.path + '/eps_jpg_' + fileName, // папка рядом с ai-файлом
        tmplWidth          = 50, // можно менять: размер до которого нужно уменьшить артборды и содержимое
        fullPath           = folderPath + '/' + fileName,
        artbLen            = adoc.artboards.length,
        totalDate          = new Date ();

    (  new Folder (folderPath).exists == false ) ? new Folder (folderPath).create () : '';

    _logProcess ([_unlockAndUnhideAll], ['unlock and unhide'], 1, 0);
    _logProcess ([_saveAsPdf], ['save pdf'], 1, 0, fullPath);
    _logProcess ([_makeJpgFromPdf], ['pass to photoshop making jpeg from pdf'], 1, 0, fullPath);
    _scaleAndFit ();
    _logProcess ([_delEmptyLays], ['delete empty layers'], 1, 0);
    _logProcess ([_expToEps], ['export to eps'], 1, 0, fullPath);

    $.writeln ('all illustrator processes are completed\ntotal script runtime: ' + _format_ms (new Date () - totalDate));

    if (showConfirm) {
      if (confirm ('all illustrator processes are completed\ntotal script runtime: ' +
          _format_ms (new Date () - totalDate) + '\nclear console?')) {
        var bt    = new BridgeTalk ();
        bt.target = 'estoolkit';
        bt.body   = 'app.clc();';
        bt.send ();
      }
    }

  } catch (e) {
    alert (e.line + '\n' + e.message);
  } finally {
    //adoc.close ( SaveOptions.DONOTSAVECHANGES );
    app.userInteractionLevel = storeInteractLavel;
  }

  /********************
   *** THE LIBRARY ***
   ******************* */

  function _saveAsPdf (fullPath) {
    var pdfSaveOpts = new PDFSaveOptions (),
        f           = new File (fullPath);

    pdfSaveOpts.PDFPreset = '[Illustrator Default]';
    /**
     * COLORCONVERSIONREPURPOSE COLORCONVERSIONTODEST None
     * */
    pdfSaveOpts.colorConversionID = ColorConversion.COLORCONVERSIONREPURPOSE;
    pdfSaveOpts.viewAfterSaving = false;

    adoc.saveAs (f, pdfSaveOpts);
  }

  function _makeJpgFromPdf (fullPath) {
//    var btCount = 1;
    sendBt ();

    function sendBt () {
      /* $.writeln (
       '\n' + new Array ( btCount ).join ( '-' ) + '->\n' +
       new Array ( btCount ).join ( '-' ) + '-> ' + fileName + ' sending bt message #' + btCount++ + '\n' +
       new Array ( btCount - 1 ).join ( '-' ) + '->\n'
       );*/
      var bt       = new BridgeTalk ();
      bt.target    = 'photoshop';
      bt.body      = _make.toString () + ';_make("' + fullPath + '","' + artbLen + '");';
      bt.timeout   = 1200;
      bt.onTimeout = function () {
        sendBt ();
      }
      return bt.send ();
    }

    function _make (fullPath, artbLen) {

      app.displayDialogs = DialogModes.NO;

      var pdfFile     = new File (fullPath + '.pdf'),
          jpgPath,
          pdfOpenOpts = new PDFOpenOptions,
          jpgSaveOpts = new JPEGSaveOptions ();

      pdfOpenOpts.usePageNumber        = true;
      pdfOpenOpts.resolution           = 300.0;
      pdfOpenOpts.antiAlias            = true;
      pdfOpenOpts.bitsPerChannel       = BitsPerChannelType.EIGHT;
      pdfOpenOpts.cropPage             = CropToType.CROPBOX;
      pdfOpenOpts.mode                 = OpenDocumentMode.RGB;
      pdfOpenOpts.suppressWarnings     = true;
      pdfOpenOpts.height               = '1000 px';
      pdfOpenOpts.width                = '1000 px';
      pdfOpenOpts.constrainProportions = true;

      jpgSaveOpts.embedColorProfile = false;
      jpgSaveOpts.formatOptions     = FormatOptions.STANDARDBASELINE; // OPTIMIZEDBASELINE PROGRESSIVE STANDARDBASELINE
      jpgSaveOpts.matte             = MatteType.NONE // BACKGROUND BLACK FOREGROUND NETSCAPE NONE SEMIGRAY WHITE
      jpgSaveOpts.quality           = 11; // number [0..12]
//      jpgSaveOpts.scans = 3; // number [3..5] only for when formatOptions = FormatOptions.PROGRESSIVE

      try {
        for (var i = 1; i < artbLen + 1; i++) {
          ( i < 10 ) ? jpgPath = fullPath + '-0' + i : jpgPath = fullPath + '-' + i;
          pdfOpenOpts.page = i;
          app.open (pdfFile, pdfOpenOpts);
          app.activeDocument.saveAs (new File (jpgPath), jpgSaveOpts, true);
          app.activeDocument.close (SaveOptions.DONOTSAVECHANGES);
        }
      } catch (e) {
      } finally {
        pdfFile.remove ();
      }
    }
  }

  function _scaleAndFit () {

    var scaleFact,
        //        tmplWidth  = 100, // вынесено наверх
        elem,
        elemWidth,
        artbWidth  = Math.abs (adoc.artboards[0].artboardRect[0]) - Math.abs (adoc.artboards[0].artboardRect[2]),
        tmplBounds = [0, 0, artbWidth, -artbWidth],
        //        scaleFactStroke = scaleFact / 100,
        lay        = adoc.layers.add (),
        i;

    (function scaleAndFit () {

      var functions      = [
        _1_addRect, _2_group, _3_masking, _4_resize, _5_fitArtb, _6_delMask
      ];
      var eventDescripts = [
        'add rect (future mask) to each artboard',
        'group items on each artboards',
        'masking each group',
        'resize each group',
        'fit each artboard to group bounds',
        'delete mask'
      ];

      _logProcess (functions, eventDescripts, artbLen, 0);

      executeMenuCommand ("deselectall");

      function _1_addRect (i) {
        adoc.artboards.setActiveArtboardIndex (i);
        adoc.artboards[i].rulerOrigin = [0, 0];
        adoc.rulerOrigin              = [0, adoc.height];
        _addRectToArtb (lay);
      }

      function _2_group (i) {
        executeMenuCommand ("deselectall");
        adoc.artboards.setActiveArtboardIndex (i);
        adoc.selectObjectsOnActiveArtboard ();
        executeMenuCommand ('group');
      }

      function _3_masking (i) {
        adoc.layers[0].groupItems[i].clipped = true;
      }

      function _4_resize (i) {
        elem = adoc.layers[0].groupItems[i];
        if (
          elem.geometricBounds[0] == tmplBounds[0] ||
          elem.geometricBounds[1] == tmplBounds[1] ||
          elem.geometricBounds[2] == tmplBounds[2] ||
          elem.geometricBounds[3] == tmplBounds[3]) {
          scaleFact = tmplWidth * 100 / tmplBounds[2];
        } else {
          elemWidth = _getBoundsExtend (elem)[2];
          scaleFact = tmplWidth * 100 / elemWidth;
        }
        elem.resize (scaleFact, scaleFact,
          true, true, true, true,
          undefined,
          Transformation.CENTER);
      }

      function _5_fitArtb (i) {
        adoc.artboards.setActiveArtboardIndex (i);
        adoc.selectObjectsOnActiveArtboard ();
        adoc.fitArtboardToSelectedArt (i);
      }

      function _6_delMask (i) {
        adoc.layers[0].groupItems[i].clipped = false;
        adoc.layers[0].groupItems[i].pageItems[0].remove ();
      }

    } ());

    function _addRectToArtb (container) {
      var artbWidth  = adoc.width,
          artbHeight = adoc.height,
          rect       = container.pathItems.rectangle (0, 0, artbWidth, artbHeight);

      rect.filled  = false;
      rect.stroked = false;

      return rect;
    }

    /**
     * get selection.bounds:  [left, top, right, bottom]
     * additionaly calculate width, height
     *
     * @param [Object/Collection]
     * @return {Array} [ bounds: [left, top, right, bottom], width, height ]
     */
    function _getBoundsExtend (selectElems) {

      var bounds = _getBounds (selectElems, []),
          width  = _calcElemWidthByBounds (bounds),
          height = _calcElemHeightByBounds (bounds);

// recursive search of maximal bounds
      function _getBounds (collection, bounds) {
        var clipGroupElems, i, j;

        if (collection.typename != 'GroupItem') { // любой отдельный элемент неконтейнер
          return collection.geometricBounds;
        }
        if (collection.clipped) { // группа с маской => ищем маску
          clipGroupElems = collection.pathItems;

          for (i = 0; i < clipGroupElems.length; i++) {
            if (clipGroupElems[i].clipping) {
              if (bounds == '') {
                bounds = clipGroupElems[i].geometricBounds;
                continue;
              }
              bounds = _compareBounds (clipGroupElems[i], bounds);
            }
          }
          return bounds;
        }

        // группа без обтравочной маски => цикл по элементам группы
        for (j = 0; j < collection.pageItems.length; j++) {

          var el = collection.pageItems [j];

          if (el.typename != 'GroupItem') { // любой pageItem кроме группы
            if (bounds == '') {
              bounds = el.geometricBounds;
              continue;
            }
            bounds = _compareBounds (el, bounds);
          }

          if (el.typename == 'GroupItem' && el.clipped) { // группа с маской => ищем маску
            clipGroupElems = el.pathItems;
            for (i = 0; i < clipGroupElems.length; i++) {
              if (clipGroupElems[i].clipping) {
                if (bounds == '') {
                  bounds = clipGroupElems[i].geometricBounds;
                  continue;
                }
                bounds = _compareBounds (clipGroupElems[i], bounds);
              }
            }
            continue;
          }

          if (el.typename == 'GroupItem' && !el.groupItems && !el.clipped) { // группа без маски и без групп
            if (bounds == '') {
              bounds = el.geometricBounds;
//          bounds = getBoundsExtend ( el.pageItems, bounds );
              continue;
            }
            bounds = _compareBounds (el.geometricBounds, bounds);
            continue;
          }

          if (el.typename == 'GroupItem' && el.groupItems) { // группа без маски, но с группами => рекурсия
            for (var l = 0; l < el.pageItems.length; l++) {
              /* if ( bounds == '' ) {
               bounds = getBoundsExtend ( el.pageItems[l], '' );
               }*/
              bounds = getBoundsExtend (el.pageItems[l], bounds);
            }
            continue;
          }
        }
        return bounds;

        // сравнить и вернуть самые широкие geometricBounds элемента
        function _compareBounds (elem, boundsToCompare) {
          var elemBounds = elem.geometricBounds;
          elemBounds[0] < boundsToCompare[0] ? boundsToCompare[0] = elemBounds[0] : '';
          elemBounds[1] > boundsToCompare[1] ? boundsToCompare[1] = elemBounds[1] : '';
          elemBounds[2] > boundsToCompare[2] ? boundsToCompare[2] = elemBounds[2] : '';
          elemBounds[3] < boundsToCompare[3] ? boundsToCompare[3] = elemBounds[3] : '';
          return boundsToCompare;
        }
      }

// calculate item width by it left and right bounds
      function _calcElemWidthByBounds (bounds) {
        var elemWidth = 0,
            left      = bounds[0],
            right     = bounds[2];

        (left <= 0 && right <= 0) || (left >= 0 && right >= 0) ? elemWidth = Math.abs (left - right) : '';
        left <= 0 && right >= 0 ? elemWidth = Math.abs (left) + right : '';

        return elemWidth;
      }

// calculate item height bu it top and bottom bounds
      function _calcElemHeightByBounds (bounds) {
        var elemHeight = 0,
            top        = bounds[1],
            bottom     = bounds[3];

        (top <= 0 && bottom <= 0) || (top >= 0 && bottom >= 0) ? elemHeight = Math.abs (top - bottom) : '';
        top >= 0 && bottom <= 0 ? elemHeight = top + Math.abs (bottom) : '';
        return elemHeight;
      }

      return [bounds, width, height];
    }

  }

  function _expToEps (fullPath) {

    var opts         = new EPSSaveOptions (),
        epsFile      = new File (fullPath),
        copy_epsFile = new File ('' + epsFile + '.eps');

    // opts.artboardRange = '1-5';
    opts.cmykPostScript             = false;
    opts.compatibility              = Compatibility.ILLUSTRATOR10;
    opts.compatibleGradientPrinting = false;
    opts.embedAllFonts              = false;
    opts.embedAllFonts              = false;
    /**
     * How transparency should be flattened when saving EPS and Illustrator file formats with compatibility set to
     * versions of Illustrator earlier than Illustrator 10
     * */
    opts.flattenOuput = OutputFlattening.PRESERVEAPPEARANCE; //PRESERVEPATHS
    opts.includeDocumentThumbnails = false;
    opts.overprint                 = PDFOverprint.PRESERVEPDFOVERPRINT; // DISCARDPDFOVERPRINT
    opts.postScript                = EPSPostScriptLevelEnum.LEVEL2;
    opts.preview                   = EPSPreview.None; // BWTIFF COLORTIFF TRANSPARENTCOLORTIFF
    opts.saveMultipleArtboards     = true;

    adoc.saveAs (epsFile, opts);

    if ((opts.saveMultipleArtboards == true && opts.artboardRange == '') && copy_epsFile.exists) {
      copy_epsFile.remove ();
    }

  }

  function _delEmptyLays () {

    for (var i = 0; i < activeDocument.layers.length; i++) {
      var lay = activeDocument.layers[i];
      if (_hasSubs (lay)) {
        _delSubs (lay);
      }
      if (_isEmpty (lay) && activeDocument.layers.length > 1) {
        lay.locked == true ? lay.locked = false : '';
        lay.visible == false ? lay.visible = true : '';
        lay.remove ();
        i--;
      }
    }

    /**
     *
     * @param {Object} lay - Layer
     * @return {Object} lay - Layer
     */
    function _delSubs (lay) {
      for (var i = 0; i < lay.layers.length; i++) {
        var thisSubLay = _getSubs (lay)[i];

        if (_isEmpty (thisSubLay)) {
          thisSubLay.locked == true ? thisSubLay.locked = false : '';
          thisSubLay.visible == false ? thisSubLay.visible = true : '';
          thisSubLay.remove ();
          i--;
        }

        if (_hasSubs (thisSubLay)) {
          var parent = _delSubs (thisSubLay);
          if (_isEmpty (parent)) {
            thisSubLay.locked == true ? thisSubLay.locked = false : '';
            thisSubLay.visible == false ? thisSubLay.visible = true : '';
            thisSubLay.remove ();
            i--;
          }
        }
      }
      return lay;
    }

    /**
     *
     * @param  {Object} lay - Layer
     * @return {Boolean}
     */
    function _hasSubs (lay) {
      try {
        return (lay.layers.length > 0);
      } catch (e) {
        return false;
      }
    }

    /**
     *
     * @param  {Object} lay - Layer
     * @return {Boolean}
     */
    function _isEmpty (lay) {
      try {
        return lay.pageItems.length == 0 && lay.layers.length == 0;
      } catch (e) {
        return false;
      }
    }

    /**
     *
     * @param  {Object} lay - Layer
     * @return {Object/Boolean}  layers / false
     */
    function _getSubs (lay) {
      try {
        return lay.layers;
      } catch (e) {
        return false;
      }
    }
  }

  function _unlockAndUnhideAll () {
    for (var i = 0; i < activeDocument.layers.length; i++) {
      if (activeDocument.layers[i].visible == false) {
        activeDocument.layers[i].visible = true;
      }
      if (activeDocument.layers[i].locked == true) {
        activeDocument.layers[i].locked = false;
      }
    }
    executeMenuCommand ("unlockAll");
    executeMenuCommand ("showAll");
    executeMenuCommand ("deselectall");
  }

  function _logProcess (funcs, descripts, callCounter, startCoount, arg) {
    var i, j,
        percentWeight = 100 / callCounter,
        date          = new Date (), tmpDate;

    for (i = 0; i < funcs.length; i++) {
      $.writeln (descripts[i] + ':');
      if (callCounter > 1) {
        tmpDate = new Date ();
      }

      for (j = startCoount; j < callCounter; j++) {

        if (callCounter == 1) {
          funcs[i] (arg);
        } else {
          funcs[i] (j);
        }
        $.sleep (20);
        $.write (Math.round (percentWeight * j) + '%  ');
      }
      $.writeln ('100%');
      if (tmpDate) {
        $.writeln ('intermediate runtime: ' + _format_ms (new Date () - tmpDate));
      }
    }
    $.writeln ('total function runtime: ' + _format_ms (new Date () - date) + '\n');
  }

  function _format_ms (millisec) {

    var date       = new Date (millisec),
        formatDate =
          ('00' + date.getUTCHours ()).slice (-2) + ':' +
          ('00' + date.getMinutes ()).slice (-2) + ':' +
          ('00' + date.getSeconds ()).slice (-2) + ':' +
          ('000' + date.getMilliseconds ()).slice (-3);

    return formatDate;
  }
}
