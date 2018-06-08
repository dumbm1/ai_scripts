(function clearGuides() {
  _clearGuidesByEnumPaths();

  function _clearGuidesByAction() {
    var actStr = '/version 3' +
                 '/name [ 11' +
                 '	436c656172477569646573' +
                 ']' +
                 '/isOpen 1' +
                 '/actionCount 1' +
                 '/action-1 {' +
                 '	/name [ 11' +
                 '		436c656172477569646573' +
                 '	]' +
                 '	/keyIndex 0' +
                 '	/colorIndex 0' +
                 '	/isOpen 0' +
                 '	/eventCount 1' +
                 '	/event-1 {' +
                 '		/useRulersIn1stQuadrant 0' +
                 '		/internalName (adobe_clearGuide)' +
                 '		/localizedName [ 12' +
                 '			436c65617220477569646573' +
                 '		]' +
                 '		/isOpen 0' +
                 '		/isOn 1' +
                 '		/hasDialog 0' +
                 '		/parameterCount 0' +
                 '	}' +
                 '}';

    try {
      _makeAct(actStr);
    } catch (e) {
      alert('Error in _makeAct');
    }
    try {
      app.doScript('ClearGuides', 'ClearGuides', false); // action name, set name
    } catch (e) {
      alert('Error in doScript');
    }
    try {
      app.unloadAction('ClearGuides', ''); // set name
    } catch (e) {
      alert('Error in unloadAction');
    }

    function _makeAct(str) {
      var f = new File('~/ScriptAction.aia');
      f.open('w');
      f.write(str);
      f.close();
      app.loadAction(f);
      f.remove();
    }
  }

  function _clearGuidesByEnumPaths() {
    var guidesCount = 0;
    var lockGuidesCount = 0;
    var paths = activeDocument.pathItems;
    var len = paths.length;

    for (var i = len - 1; i >= 0; i--) {
      if (paths[i].guides) {
        guidesCount++;
        try {
          paths[i].remove();
        } catch (e) {
          if (e.message == 'Target layer cannot be modified') {
            lockGuidesCount++;
            continue;
          } else {
            throw new Error('Uncknown Error');
          }
        }
      }
    }
    return '' + len + ', ' + guidesCount + ', ' + lockGuidesCount;
  }
}());
