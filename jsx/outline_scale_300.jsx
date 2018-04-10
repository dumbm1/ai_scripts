//@target illustrator

(function outline_scale_300() {
  if(selection[0] == undefined) {
    illustrator.reveal(new File(activeDocument.fullName));
    return;
  }
  executeMenuCommand('outline');
  _doScaleAct('300.0');
  illustrator.reveal(new File(activeDocument.fullName));

  function _doScaleAct(scalePersent) {
    var actStr = '/version 3' +
                 '/name [ 7' +
                 '	5f5f7363616c65' +
                 ']' +
                 '/isOpen 1' +
                 '/actionCount 1' +
                 '/action-1 {' +
                 '	/name [ 7' +
                 '		5f5f7363616c65' +
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
                 '		/parameterCount 4' +
                 '		/parameter-1 {' +
                 '			/key 1970169453' +
                 '			/showInPalette -1' +
                 '			/type (boolean)' +
                 '			/value 1' +
                 '		}' +
                 '		/parameter-2 {' +
                 '			/key 1818848869' +
                 '			/showInPalette -1' +
                 '			/type (boolean)' +
                 '			/value 0' +
                 '		}' +
                 '		/parameter-3 {' +
                 '			/key 1935895653' +
                 '			/showInPalette -1' +
                 '			/type (unit real)' +
                 '			/value ' + scalePersent +
                 '			/unit 592474723' +
                 '		}' +
                 '		/parameter-4 {' +
                 '			/key 1668247673' +
                 '			/showInPalette -1' +
                 '			/type (boolean)' +
                 '			/value 0' +
                 '		}' +
                 '	}' +
                 '}';

    _makeAct(actStr);
    app.doScript('__scale', '__scale', false); // action name, set name
    app.unloadAction('__scale', ''); // set name

    function _makeAct(str) {
      var f = new File('~/ScriptAction.aia');
      f.open('w');
      f.write(str);
      f.close();
      app.loadAction(f);
      f.remove();
    }
  }
}());

