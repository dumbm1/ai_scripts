/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 04.08.2016.
 */

(function act_showRulers () {
  {
    var actStr = '/version 3' +
      '/name [ 11' +
      '	53686f772052756c657273' +
      ']' +
      '/isOpen 1' +
      '/actionCount 1' +
      '/action-1 {' +
      '	/name [ 11' +
      '		53686f772052756c657273' +
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
      '			/value [ 5' +
      '				72756c6572' +
      '			]' +
      '		}' +
      '		/parameter-2 {' +
      '			/key 1818455661' +
      '			/showInPalette -1' +
      '			/type (ustring)' +
      '			/value [ 11' +
      '				53686f772052756c657273' +
      '			]' +
      '		}' +
      '		/parameter-3 {' +
      '			/key 1668114788' +
      '			/showInPalette -1' +
      '			/type (integer)' +
      '			/value 37' +
      '		}' +
      '	}' +
      '}'
  }

  runAction ('Show Rulers', 'Show Rulers', actStr);

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
} ())
