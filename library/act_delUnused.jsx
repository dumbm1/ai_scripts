/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 04.08.2016.
 */

(function act_delAllUnused () {
  activeDocument.swatchGroups[1].remove ();

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
} ());
