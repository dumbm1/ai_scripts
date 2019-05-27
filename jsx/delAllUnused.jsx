/**
 * Adobe ExtendScript for Illustrator CS6+
 * (c)Marat Shagiev
 * m_js@bk.ru
 * 19.12.2016
 * */

//@target illustrator

(function act_delAllUnused() {

  var str = getStrForRmUnusedAct();
  delNoSpotSwatches();
  runAction('delAllUnused', 'delAllUnused', str);
  addCmykw();
  ungrSw();

  function addCmykw() {
    var cmyko = {
      'White'       : [0, 0, 0, 0],
      'Black'       : [0, 0, 0, 100],
      'CMYK Cyan'   : [100, 0, 0, 0],
      'CMYK Magenta': [0, 100, 0, 0],
      'CMYK Yellow' : [0, 0, 100, 0]
    };
    for (var key in cmyko) {
      try {
        activeDocument.swatches.getByName(key);
        continue;
      } catch (e) {
        if (e.message == 'No such element') {
          _addCmykSw(key, cmyko[key]);
        }
      }
    }

    function _addCmykSw(swName, values) {
      if (!documents.length) throw new Error('Expected document');
      if (arguments.length < 2) throw new Error('Expected two arguments');
      if (!values.splice) throw new Error('Second argument expected an array');
      if (typeof swName != 'string' && swName.constructor != 'String') throw new Error('First argument expected a string');

      var d = activeDocument;

      try {
        d.swatches.getByName(swName);
        return;
      } catch (e) {
        if (e.message == 'No such element') {
          var sw = d.swatches.add();
          sw.name = swName;
          var swCol = new CMYKColor();
          swCol.cyan = values[0];
          swCol.magenta = values[1];
          swCol.yellow = values[2];
          swCol.black = values[3];
          sw.color = swCol;
          return sw;
        } else {
          alert(e);
          return;
        }
      }
    }
  }

  /**
   * Delete all swatches except Swatche.color.colorType == ColorModel.SPOT
   * Delete all SwatchGroups except base
   * */
  function delNoSpotSwatches() {
    var doc = activeDocument;
    for (var i = doc.swatches.length - 1; i >= 0; i--) {
      var sw = doc.swatches[i];

      /*   if (sw.color.typename == 'CMYKColor') {
       if (sw.name == 'CMYK Cyan') continue;
       if (sw.name == 'CMYK Magenta') continue;
       if (sw.name == 'CMYK Yellow') continue;
       if (sw.name == 'White') continue;
       if (sw.name == 'Black') continue;
       }*/

      if (sw.name.match(/^_safe_/)) continue;
      if (sw.color.typename == 'GradientColor') continue;
      if (sw.color.typename == 'PatternColor') continue;

      if (sw.color.typename == 'SpotColor') {
        if (sw.color.spot.colorType == ColorModel.SPOT) continue;
      }

      sw.remove();
    }
  }

  function runAction(actName, setName, actStr) {
    var f = new File('~/ScriptAction.aia');
    f.open('w');
    f.write(actStr);
    f.close();
    app.loadAction(f);
    f.remove();
    app.doScript(actName, setName, false); // action name, set name
    app.unloadAction(setName, ''); // set name
  }

  /**
   * ungroup all swatchGroups
   * */
  function ungrSw() {
    if (activeDocument.swatchGroups.length < 1) return;

    var d = activeDocument;
    var swGrps = d.swatchGroups;
    var mainSwGr = d.swatchGroups[0];

    for (var i = 1; i < swGrps.length; i++) { // move swatches to base group
      var swGr = swGrps[i];
      var swGrSws = swGr.getAllSwatches();
      for (var j = 0; j < swGrSws.length; j++) {
        var sw = swGrSws[j];
        mainSwGr.addSwatch(sw);
      }
    }

    for (var k = swGrps.length - 1; k > 0; k--) { // remove empty groups
      var obj = swGrps[k];
      obj.remove();
    }
  }

  function getStrForRmUnusedAct() {
    return '/version 3' +
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
           '}';

  }
}());
