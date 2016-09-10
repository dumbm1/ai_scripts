/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.08.2016.
 */

(function act_saveForWeb () {
  var d     = activeDocument;
  var dW    = d.width;
  var dH    = d.height;
  var wTmpl = 850;
  var hTmpl = 655;

  var wScale = ( wTmpl / dW ) * 100 + '';
  var hScale = ( hTmpl / dH) * 100 + '';

  {
    var actStr = '' +
      '/version 3' +
      '/name [ 10' +
      '	73617665466f72576562' +
      ']' +
      '/isOpen 1' +
      '/actionCount 1' +
      '/action-1 {' +
      '	/name [ 10' +
      '		73617665466f72576562' +
      '	]' +
      '	/keyIndex 0' +
      '	/colorIndex 0' +
      '	/isOpen 1' +
      '	/eventCount 1' +
      '	/event-1 {' +
      '		/useRulersIn1stQuadrant 0' +
      '		/internalName (adobe_SaveForWeb)' +
      '		/localizedName [ 12' +
      '			5361766520666f7220576562' +
      '		]' +
      '		/isOpen 0' +
      '		/isOn 1' +
      '		/hasDialog 1' +
      '		/showDialog 1' +
      '		/parameterCount 16' +
      '		/parameter-1 {' +
      '			/key 1181578272' +
      '			/showInPalette -1' +
      '			/type (enumerated)' +
      '			/name [ 4' +
      '				4a504547' +
      '			]' +
      '			/value 1246774599' +
      '		}' +
      '		/parameter-2 {' +
      '			/key 1231975538' +
      '			/showInPalette -1' +
      '			/type (boolean)' +
      '			/value 0' +
      '		}' +
      '		/parameter-3 {' +
      '			/key 1366062201' +
      '			/showInPalette -1' +
      '			/type (integer)' +
      '			/value 60' +
      '		}' +
      '		/parameter-4 {' +
      '			/key 1332769901' +
      '			/showInPalette -1' +
      '			/type (boolean)' +
      '			/value 1' +
      '		}' +
      '		/parameter-5 {' +
      '			/key 1348563827' +
      '			/showInPalette -1' +
      '			/type (integer)' +
      '			/value 1' +
      '		}' +
      '		/parameter-6 {' +
      '			/key 1651275122' +
      '			/showInPalette -1' +
      '			/type (real)' +
      '			/value 0.0' +
      '		}' +
      '		/parameter-7 {' +
      '			/key 1299477536' +
      '			/showInPalette -1' +
      '			/type (boolean)' +
      '			/value 1' +
      '		}' +
      '		/parameter-8 {' +
      '			/key 1299477586' +
      '			/showInPalette -1' +
      '			/type (integer)' +
      '			/value 255' +
      '		}' +
      '		/parameter-9 {' +
      '			/key 1299477575' +
      '			/showInPalette -1' +
      '			/type (integer)' +
      '			/value 255' +
      '		}' +
      '		/parameter-10 {' +
      '			/key 1299477570' +
      '			/showInPalette -1' +
      '			/type (integer)' +
      '			/value 255' +
      '		}' +
      '		/parameter-11 {' +
      '			/key 1213424492' +
      '			/showInPalette -1' +
      '			/type (unit real)' +
      '			/value ' + wScale +
      '			/unit 592474723' +
      '		}' +
      '		/parameter-12 {' +
      '			/key 1448305516' +
      '			/showInPalette -1' +
      '			/type (unit real)' +
      '			/value ' + hScale +
      '			/unit 592474723' +
      '		}' +
      '		/parameter-13 {' +
      '			/key 1097757761' +
      '			/showInPalette -1' +
      '			/type (ustring)' +
      '			/value [ 13' +
      '				417274204f7074696d697a6564' +
      '			]' +
      '		}' +
      '		/parameter-14 {' +
      '			/key 1131180097' +
      '			/showInPalette -1' +
      '			/type (boolean)' +
      '			/value 1' +
      '		}' +
      '		/parameter-15 {' +
      '			/key 1399608180' +
      '			/showInPalette 0' +
      '			/type (raw)' +
      '			/value < 1574' +
      '				0000000300000001000000000000000700000001000000000001000000000000' +
      '				000001010000003c000000010000006400000000000000000000000000000002' +
      '				00000000ffffffff0000000004ffffffff00000000ffffffff00000000ffffff' +
      '				ff00000000ffffffff0000000000000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000ff000000ff000000ff000000ff0000' +
      '				00ff000000ff000000ff000000ff000000000000000000000000000001a80000' +
      '				00100000000100000000000e54617267657453657474696e67730000000a0000' +
      '				00004d7474434f626a630000000100000000000a4e6174697665517561640000' +
      '				000300000000426c20206c6f6e67000000ff0000000047726e206c6f6e670000' +
      '				00ff00000000526420206c6f6e67000000ff000000004f70746d626f6f6c0100' +
      '				000000516c74796c6f6e670000003c0000000b6164644d65746164617461626f' +
      '				6f6c010000000a626c7572416d6f756e74646f75620000000000000000000000' +
      '				0f656d62656449434350726f66696c65626f6f6c000000000a66696c65466f72' +
      '				6d6174656e756d0000000a46696c65466f726d6174000000004a504547000000' +
      '				0c6e6f4d61747465436f6c6f72626f6f6c000000000b70726f67726573736976' +
      '				65626f6f6c000000000c7a6f6e65645175616c6974794f626a63000000010000' +
      '				000000095a6f6e6564496e666f00000004000000096368616e6e656c49446c6f' +
      '				6e67ffffffff0000000d656d70686173697a6554657874626f6f6c0000000010' +
      '				656d70686173697a65566563746f7273626f6f6c0000000005666c6f6f726c6f' +
      '				6e6700000000' +
      '			>' +
      '			/size 1574' +
      '		}' +
      '		/parameter-16 {' +
      '			/key 1231953952' +
      '			/showInPalette -1' +
      '			/type (ustring)' +
      '			/value [ 28' +
      '				433a5c55736572735c6d2e736861676965765c4465736b746f705c40' +
      '			]' +
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
  app.doScript ("saveForWeb", "saveForWeb", false); // action name, set name
  app.unloadAction ("saveForWeb", ""); // set name
} ());
