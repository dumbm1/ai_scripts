/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 03.08.2016.
 *
 * prepWordTxt_v1.0.jsx
 *
 * todo: Illustrator bug: I can't sign fill color black 100%
 */

(function prepMSDoc () {
  var userInteract     = userInteractionLevel;
  userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
  var pth, thisFile, newFile, openOpts, saveOpts;

  if (documents.length) {
    pth      = activeDocument.fullName;
    thisFile = new File (pth);
    newFile  = thisFile.openDlg ();
  } else {
    newFile = File.openDialog ('Open MSDoc file', 'MS Word DOC file:*.doc', true);
    if (!newFile) return;
  }

  openOpts = new OpenOptions ();
  saveOpts = new IllustratorSaveOptions ();

  open (newFile, DocumentColorSpace.RGB, openOpts);

  act_switchToCMYK ();

  setFrameSize ();
  activeDocument.textFrames[0].selected = true;
  act_setBlack100();

 // setFrameCol ();

  executeMenuCommand ('selectall');
  splitTxtFrames ();
  executeMenuCommand ('Fit Artboard to artwork bounds');

  act_delAllUnused ();

  var aiFile = new File (activeDocument.fullName);
  activeDocument.saveAs (aiFile, saveOpts);

  userInteractionLevel = userInteract;

  function splitTxtFrames () {
    try {
      var sel = selection;
      if (!sel.length) throw new Error ('Select text frame and try again');
      executeMenuCommand ('deselectall');

      for (var i = 0; i < sel.length; i++) {
        var obj = sel[i];
        if (obj.typename != 'TextFrame') continue;
        _splitTxt (obj);
      }
    } catch (e) {
      alert (e.line + '\n' + e.message)
    }

    function _splitTxt (fr) {
      var result,
          resultFrames   = [],
          prevSectionLen = 0,
          re             = /(\s$)+/mg,
          protectStart   = 1,
          protectCount   = protectStart,
          protectLim     = 10;

      while (result = re.exec (fr.contents)) {

        var currFr                 = fr.duplicate ();
        var lastContentsToDel      = currFr.characters[result.index];
        lastContentsToDel.length   = currFr.contents.length - result.index;
        lastContentsToDel.contents = '';
        if (prevSectionLen) {
          var prevContentsToDel      = currFr.characters[0];
          prevContentsToDel.length   = prevSectionLen;
          prevContentsToDel.contents = '';
        }
        prevSectionLen += currFr.contents.length;
        /**
         *  Allow the user to forcibly abort, cause probably loop becomes infinite
         *  */
        if (protectCount % (protectLim + protectStart) == 0) {
          if (confirm
            ('It seems that the loop becomes infinite\n' +
              'Current input-number of iterations is ' + (protectCount - (protectCount % protectLim)) + '\n' +
              'Do you want to abort the script?')) break;
        }
        protectCount++;
        resultFrames.push (currFr);
      }

      /**
       * delete first and last empty strings around paragraph
       * */
      for (var i = 0; i < resultFrames.length; i++) {
        var obj = resultFrames[i];
        __delLastEmptyLine (obj);
      }
      for (i = 0; i < resultFrames.length; i++) {
        obj = resultFrames[i];
        __delFirstEmptyLine (obj);
      }

      fr.remove ();
      /**
       * positioning frames
       * */
      for (var j = 0, pos; j < resultFrames.length - 1; j++) {
        var dupl                = (resultFrames[j].duplicate ()).createOutline ();
        resultFrames[j + 1].top = dupl.geometricBounds[3] - 10;
        dupl.remove ();
      }

      function __delLastEmptyLine (fr) {
        try {
          var reLast     = /\s$/gmi;
          var resultLast = reLast.exec (fr.contents);
          var currMatch;
          if (resultLast) {
            currMatch        = fr.characters[resultLast.index];
            currMatch.length = resultLast[0].length;
            currMatch.remove ();
          }
        } catch (e) {
        }
      }

      function __delFirstEmptyLine (fr) {
        try {
          var reFirst     = /^$\s/gmi;
          var resultFirst = reFirst.exec (fr.contents);
          var currMatch;
          if (resultFirst) {
            currMatch        = fr.characters[resultFirst.index];
            currMatch.length = resultFirst[0].length;
            currMatch.remove ();
          }
        } catch (e) {
        }
      }
    }
  }

  function setFrameSize () {
    var frMain   = activeDocument.textFrames[0];
    var frResult = activeDocument.textFrames.areaText (
      activeDocument.pathItems.rectangle (0, 0, frMain.width, frMain.width * 2)
    );
    frMain.textRange.duplicate (frResult, ElementPlacement.INSIDE);
    frResult.position = frMain.position;
    frMain.remove ();
  }

  function setFrameCol () {
    var c  = new CMYKColor ();
    c.cyan = 100;

    var fr                                         = activeDocument.textFrames[0];
    fr.textRange.characterAttributes.fillColor     = c;
    fr.textRange.characterAttributes.overprintFill = true;
  }

  function act_delAllUnused () {
    try {
      activeDocument.swatchGroups[1].remove ();
    } catch (e) {
    }

    {
      var str = '/version 3' +
        '/name [ 12' +
        '	64656c416c6c556e75736564' +
        ']' +
        '/isOpen 0' +
        '/actionCount 1' +
        '/action-1 {' +
        '	/name [ 12' +
        '		64656c416c6c556e75736564' +
        '	]' +
        '	/keyIndex 0' +
        '	/colorIndex 2' +
        '	/isOpen 0' +
        '	/eventCount 8' +
        '	/event-1 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_swatches)' +
        '		/localizedName [ 8' +
        '			5377617463686573' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 17' +
        '				53656c65637420416c6c20556e75736564' +
        '			]' +
        '			/value 11' +
        '		}' +
        '	}' +
        '	/event-2 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_swatches)' +
        '		/localizedName [ 8' +
        '			5377617463686573' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 1' +
        '		/showDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 13' +
        '				44656c65746520537761746368' +
        '			]' +
        '			/value 3' +
        '		}' +
        '	}' +
        '	/event-3 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_brush)' +
        '		/localizedName [ 5' +
        '			4272757368' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 17' +
        '				53656c65637420416c6c20556e75736564' +
        '			]' +
        '			/value 8' +
        '		}' +
        '	}' +
        '	/event-4 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_brush)' +
        '		/localizedName [ 5' +
        '			4272757368' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 1' +
        '		/showDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 12' +
        '				44656c657465204272757368' +
        '			]' +
        '			/value 3' +
        '		}' +
        '	}' +
        '	/event-5 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_styles)' +
        '		/localizedName [ 14' +
        '			47726170686963205374796c6573' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 17' +
        '				53656c65637420416c6c20556e75736564' +
        '			]' +
        '			/value 14' +
        '		}' +
        '	}' +
        '	/event-6 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_styles)' +
        '		/localizedName [ 14' +
        '			47726170686963205374796c6573' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 1' +
        '		/showDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 20' +
        '				44656c6574652047726170686963205374796c65' +
        '			]' +
        '			/value 3' +
        '		}' +
        '	}' +
        '	/event-7 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_symbol_palette)' +
        '		/localizedName [ 7' +
        '			53796d626f6c73' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 17' +
        '				53656c65637420416c6c20556e75736564' +
        '			]' +
        '			/value 12' +
        '		}' +
        '	}' +
        '	/event-8 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (ai_plugin_symbol_palette)' +
        '		/localizedName [ 7' +
        '			53796d626f6c73' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 1' +
        '		/showDialog 0' +
        '		/parameterCount 1' +
        '		/parameter-1 {' +
        '			/key 1835363957' +
        '			/showInPalette -1' +
        '			/type (enumerated)' +
        '			/name [ 13' +
        '				44656c6574652053796d626f6c' +
        '			]' +
        '			/value 5' +
        '		}' +
        '	}' +
        '}'
    }
    runAction ('delAllUnused', 'delAllUnused', str);

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
  }

  function act_setBlack100 () {

    {
      var actStr = '' +
        '/version 3'+
        '/name [ 8'+
        '	626c61636b313030'+
        ']'+
        '/isOpen 1'+
        '/actionCount 1'+
        '/action-1 {'+
        '	/name [ 8'+
        '		626c61636b313030'+
        '	]'+
        '	/keyIndex 0'+
        '	/colorIndex 0'+
        '	/isOpen 1'+
        '	/eventCount 1'+
        '	/event-1 {'+
        '		/useRulersIn1stQuadrant 0'+
        '		/internalName (ai_plugin_setColor)'+
        '		/localizedName [ 9'+
        '			53657420636f6c6f72'+
        '		]'+
        '		/isOpen 1'+
        '		/isOn 1'+
        '		/hasDialog 0'+
        '		/parameterCount 7'+
        '		/parameter-1 {'+
        '			/key 1768186740'+
        '			/showInPalette -1'+
        '			/type (ustring)'+
        '			/value [ 10'+
        '				46696c6c20636f6c6f72'+
        '			]'+
        '		}'+
        '		/parameter-2 {'+
        '			/key 1718185068'+
        '			/showInPalette -1'+
        '			/type (boolean)'+
        '			/value 1'+
        '		}'+
        '		/parameter-3 {'+
        '			/key 1954115685'+
        '			/showInPalette -1'+
        '			/type (enumerated)'+
        '			/name [ 10'+
        '				434d594b20636f6c6f72'+
        '			]'+
        '			/value 4'+
        '		}'+
        '		/parameter-4 {'+
        '			/key 1668899182'+
        '			/showInPalette -1'+
        '			/type (unit real)'+
        '			/value 0.0'+
        '			/unit 592474723'+
        '		}'+
        '		/parameter-5 {'+
        '			/key 1835496545'+
        '			/showInPalette -1'+
        '			/type (unit real)'+
        '			/value 0.0'+
        '			/unit 592474723'+
        '		}'+
        '		/parameter-6 {'+
        '			/key 2036690039'+
        '			/showInPalette -1'+
        '			/type (unit real)'+
        '			/value 0.0'+
        '			/unit 592474723'+
        '		}'+
        '		/parameter-7 {'+
        '			/key 1651270507'+
        '			/showInPalette -1'+
        '			/type (unit real)'+
        '			/value 100.0'+
        '			/unit 592474723'+
        '		}'+
        '	}'+
        '}'
    }

    var f = new File ('~/ScriptAction.aia');
    f.open ('w');
    f.write (actStr);
    f.close ();
    app.loadAction (f);
    f.remove ();

    app.doScript ("black100", "black100", false); // action name, set name
    app.unloadAction ("black100", ""); // set name
  }function act_switchToCMYK () {

    {
      var actStr = '' +
        '/version 3' +
        '/name [ 12' +
        '	737769746368546f434d594b' +
        ']' +
        '/isOpen 1' +
        '/actionCount 1' +
        '/action-1 {' +
        '	/name [ 12' +
        '		737769746368546f434d594b' +
        '	]' +
        '	/keyIndex 0' +
        '	/colorIndex 0' +
        '	/isOpen 1' +
        '	/eventCount 1' +
        '	/event-1 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (adobe_commandManager)' +
        '		/localizedName [ 16' +
        '			416363657373204d656e75204974656d' +
        '		]' +
        '		/isOpen 0' +
        '		/isOn 1' +
        '		/hasDialog 0' +
        '		/parameterCount 3' +
        '		/parameter-1 {' +
        '			/key 1769238125' +
        '			/showInPalette -1' +
        '			/type (ustring)' +
        '			/value [ 14' +
        '				646f632d636f6c6f722d636d796b' +
        '			]' +
        '		}' +
        '		/parameter-2 {' +
        '			/key 1818455661' +
        '			/showInPalette -1' +
        '			/type (ustring)' +
        '			/value [ 31' +
        '				446f63756d656e7420436f6c6f72204d6f64653a20434d594b20436f6c6f72' +
        '			]' +
        '		}' +
        '		/parameter-3 {' +
        '			/key 1668114788' +
        '			/showInPalette -1' +
        '			/type (integer)' +
        '			/value 223' +
        '		}' +
        '	}' +
        '}'
    }

    var f = new File ('~/ScriptAction.aia');
    f.open ('w');
    f.write (actStr);
    f.close ();
    app.loadAction (f);
    f.remove ();

    app.doScript ("switchToCMYK", "switchToCMYK", false); // action name, set name
    app.unloadAction ("switchToCMYK", ""); // set name
  }

  /**
   * todo: add ungroup swatchGroups
   * Delete all swatches except Swatche.color.colorType == ColorModel.SPOT
   * Delete all SwatchGroups except base
   * */
  function delNoSpotSwatches () {
    var doc = activeDocument;
    for (var i = doc.swatches.length - 1; i >= 0; i--) {
      var sw = doc.swatches[i];
      if (sw.color.typename == 'SpotColor') {
        if (sw.color.spot.colorType == ColorModel.SPOT) continue;
      }
      sw.remove ();
    }
    for (var j = doc.swatchGroups.length - 1; j > 0; j--) {
      var swGr = doc.swatchGroups[j];
      swGr.remove ();
    }
  }
} ());
