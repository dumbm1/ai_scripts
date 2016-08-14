/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 30.03.2016 12:00
 * v0.1
 */

(function backupAi () {
  var thisFile     = activeDocument.fullName,
      backFold     = new Folder ( activeDocument.path + '/delete/' ),
      backFilePath = activeDocument.path + '/delete/' + activeDocument.name + '_' + makeRandStr ();

  if ( !backFold.exists ) {
    backFold.create();
  }

  function makeRandStr () {
    return ("@" + (+new Date ()) * Math.random() * 10000).slice( -7, -1 );
  }
  function doSaveCopyAct (fileName, filePath) {
    {
      var actSaveCopy = '/version 3' +
        '/name [ 8' +
        '	73617665436f7079' +
        ']' +
        '/isOpen 1' +
        '/actionCount 1' +
        '/action-1 {' +
        '	/name [ 8' +
        '		73617665436f7079' +
        '	]' +
        '	/keyIndex 0' +
        '	/colorIndex 0' +
        '	/isOpen 1' +
        '	/eventCount 1' +
        '	/event-1 {' +
        '		/useRulersIn1stQuadrant 0' +
        '		/internalName (adobe_saveACopyAs)' +
        '		/localizedName [ 11' +
        '			53617665204120436f7079' +
        '		]' +
        '		/isOpen 1' +
        '		/isOn 1' +
        '		/hasDialog 1' +
        '		/showDialog 0' +
        '		/parameterCount 11' +
        '		/parameter-1 {' +
        '			/key 1668116594' +
        '			/showInPalette -1' +
        '			/type (boolean)' +
        '			/value 1' +
        '		}' +
        '		/parameter-2 {' +
        '			/key 1885627936' +
        '			/showInPalette -1' +
        '			/type (boolean)' +
        '			/value 0' +
        '		}' +
        '		/parameter-3 {' +
        '			/key 1668445298' +
        '			/showInPalette -1' +
        '			/type (integer)' +
        '			/value 17' +
        '		}' +
        '		/parameter-4 {' +
        '			/key 1702392878' +
        '			/showInPalette -1' +
        '			/type (integer)' +
        '			/value 1' +
        '		}' +
        '		/parameter-5 {' +
        '			/key 1768842092' +
        '			/showInPalette -1' +
        '			/type (integer)' +
        '			/value 0' +
        '		}' +
        '		/parameter-6 {' +
        '			/key 1918989423' +
        '			/showInPalette -1' +
        '			/type (real)' +
        '			/value 100.0' +
        '		}' +
        '		/parameter-7 {' +
        '			/key 1886545516' +
        '			/showInPalette -1' +
        '			/type (integer)' +
        '			/value 0' +
        '		}' +
        '		/parameter-8 {' +
        '			/key 1936548194' +
        '			/showInPalette -1' +
        '			/type (boolean)' +
        '			/value 0' +
        '		}' +
        '		/parameter-9 {' +
        '			/key 1851878757' +
        '			/showInPalette -1' +
        '			/type (ustring)' +
        '			/value [ 63' +
        '				433a5c55736572735c64657369676e31305c4465736b746f705c746573745f62' +
        '				61636b75705c64656c6574655c556e7469746c65642d3120636f70792e6169' +
          /*C:\Users\design10\Desktop\test_backup\delete\Untitled-1 copy.ai*/
        '			]' +
        '		}' +
        '		/parameter-10 {' +
        '			/key 1718775156' +
        '			/showInPalette -1' +
        '			/type (ustring)' +
        '			/value [ 35' +
        '				41646f626520496c6c7573747261746f7220416e7920466f726d617420577269' +
        '				746572' +
        '			]' +
        '		}' +
        '		/parameter-11 {' +
        '			/key 1702392942' +
        '			/showInPalette -1' +
        '			/type (ustring)' +
        '			/value [ 6' +
        '				61692c616974' +
        '			]' +
        '		}' +
        '	}' +
        '}'
    }

    _makeAct (actStr);
    app.doScript("saveCopy", "saveCopy", false); // action name, set name
    app.unloadAction("saveCopy", ""); // set name

    function _makeAct (str) {
      var f = new File ('~/ScriptAction.aia');
      f.open('w');
      f.write(str);
      f.close();
      app.loadAction(f);
      f.remove();
    }
  }



} ())