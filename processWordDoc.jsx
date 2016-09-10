/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 03.08.2016.
 * 
 * prepWordTxt_v0.0.1.jsx
 */
//todo: 5. add split text to separate frames by end of line separator (enter)
////@target illustrator
(function processTxtChanges () {
  var userInteract     = userInteractionLevel;
  userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

  var pth      = activeDocument.fullName;
  var thisFile = new File (pth);
  var newFile  = thisFile.openDlg ();

  var openOpts = new OpenOptions ();
  var saveOpts = new IllustratorSaveOptions ();

  open (newFile, DocumentColorSpace.CMYK, openOpts);
  act_switchToCMYK ();
  processText ();

  act_delAllUnused ();

  var aiFile = new File (activeDocument.fullName);
  activeDocument.saveAs (aiFile, saveOpts);

  userInteractionLevel = userInteract;
	
	function testSplitToParagraphs(){
var reg = /(.+)?(^$\s)?(^.+?$)(^$)(.+)/gm;
var replacer = '$3';
var txtFrame = selection[0];
var result = reg.exec (txtFrame.contents);
      try {
        var currMatch      = txtFrame.characters[result.index];
        currMatch.length   = result[0].length;
        currMatch.contents = currMatch.contents.replace (reg, replacer);
        // !!! when the match.length is different with the replacer.length the loop becomes infinite
        reg.lastIndex += replacer.length - result[0].length;
      } catch (e) {
      }
   reg.lastIndex = txtFrame.contents.length ;
    $.writeln(reg.lastIndex);
    
var txtFrame2 = selection[1];
result = reg.exec (txtFrame2.contents);
      try {
        currMatch      = txtFrame2.characters[result.index];
        currMatch.length   = result[0].length;
        currMatch.contents = currMatch.contents.replace (reg, replacer);
        // !!! when the match.length is different with the replacer.length the loop becomes infinite
       
        reg.lastIndex = txtFrame.contents.length + txtFrame2.contents.length;
       
      } catch (e) {
      }
    $.writeln(reg.lastIndex);
    
  var a = txtFrame2.characters[0];
a.length = txtFrame.contents.length;
a.contents = '';
    
    
	}

  function processText () {
    var kCol   = new CMYKColor ();
    kCol.black = 100;

    var frMain   = activeDocument.textFrames[0];
    var frResult = activeDocument.textFrames.areaText (
      activeDocument.pathItems.rectangle (0, 0, frMain.width, frMain.width * 2)
    );

    frMain.textRange.duplicate (frResult, ElementPlacement.INSIDE);
    frResult.position = frMain.position;

    frResult.textRange.characterAttributes.fillColor     = kCol;
    frResult.textRange.characterAttributes.overprintFill = true;

    frMain.remove ();

    executeMenuCommand ('Fit Artboard to artwork bounds');
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

  function act_switchToCMYK () {

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
} ());
