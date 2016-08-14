/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 13.05.2016
 */

function doScaleAct (scalePersent) {
  var actStr = '/version 3' +
    '/name [ 8' +
    '	7365745363616c65' +
    ']' +
    '/isOpen 1' +
    '/actionCount 1' +
    '/action-1 {' +
    '	/name [ 8' +
    '		6163745363616c65' +
    '	]' +
    '	/keyIndex 0' +
    '	/colorIndex 0' +
    '	/isOpen 1' +
    '	/eventCount 1' +
    '	/event-1 {' +
    '		/useRulersIn1stQuadrant 0' +
    '		/internalName (adobe_scale)' +
    '		/localizedName [ 5' +
    '			5363616c65' +
    '		]' +
    '		/isOpen 1' +
    '		/isOn 1' +
    '		/hasDialog 1' +
    '		/showDialog 0' +
    '		/parameterCount 5' +
    '		/parameter-1 {' +
    '			/key 1970169453' +
    '			/showInPalette -1' +
    '			/type (boolean)' +
    '			/value 0' +
    '		}' +
    '		/parameter-2 {' +
    '			/key 1818848869' +
    '			/showInPalette -1' +
    '			/type (boolean)' +
    '			/value 1' +
    '		}' +
    '		/parameter-3 {' +
    '			/key 1752136302' +
    '			/showInPalette -1' +
    '			/type (unit real)' +
    '			/value ' + scalePersent +
    '			/unit 592474723' +
    '		}' +
    '		/parameter-4 {' +
    '			/key 1987339116' +
    '			/showInPalette -1' +
    '			/type (unit real)' +
    '			/value ' + scalePersent +
    '			/unit 592474723' +
    '		}' +
    '		/parameter-5 {' +
    '			/key 1668247673' +
    '			/showInPalette -1' +
    '			/type (boolean)' +
    '			/value 0' +
    '		}' +
    '	}' +
    '}'

  _makeAct (actStr);
  app.doScript ("actScale", "setScale", false); // action name, set name
  app.unloadAction ("setScale", ""); // set name

  function _makeAct (str) {
    var f = new File ('~/ScriptAction.aia');
    f.open ('w');
    f.write (str);
    f.close ();
    app.loadAction (f);
    f.remove ();
  }
}
