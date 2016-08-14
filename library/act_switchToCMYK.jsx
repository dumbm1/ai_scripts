/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 03.08.2016.
 */

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
