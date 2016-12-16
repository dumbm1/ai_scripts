/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 07-12-2016
 */

(function act_delAllUnused() {
  var sel = deselAllSw(activeDocument);
  delNoSpotSwatches();

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
  runAction('delAllUnused', 'delAllUnused', str);

  for (var i = 0; i < sel.length; i++) {
    var item     = sel[i];
    item.slected = true;
  }

  /**
   * todo: add ungroup swatchGroups
   * Delete all swatches except Swatche.color.colorType == ColorModel.SPOT
   * Delete all SwatchGroups except base
   * */
  function delNoSpotSwatches() {
    var doc = activeDocument;
    for (var i = doc.swatches.length - 1; i >= 0; i--) {
      var sw = doc.swatches[i];
      if (sw.color.typename == 'SpotColor') {
        if (sw.color.spot.colorType == ColorModel.SPOT) continue;
      }
      sw.remove();
    }
    for (var j = doc.swatchGroups.length - 1; j > 0; j--) {
      var swGr = doc.swatchGroups[j];
      if (swGr.getAllSwatches().length) continue;
      swGr.remove();
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
    app.unloadAction(setName, ""); // set name
  }

  /**
   * deselect all selected PageItems, Swatches and SwatchGroups
   * across creating new temp path and new temp swatch
   *
   * @param {Document} doc - Object of Illustrator DOM Document class
   * @return {Array} sel - the objects that were selected before the script starts
   * */
  function deselAllSw(doc) {
    var sel = selection;

    var tmpSw  = doc.swatches.add(),
        swCol  = new CMYKColor(),
        tmpPth = doc.activeLayer.pathItems.rectangle(0, 0, 100, 100);

    executeMenuCommand('deselectall');

    tmpSw.name       = '__temp_swatch_to_delete_xyz__';
    swCol.cyan       = 30;
    swCol.yellow     = 100;
    swCol.black      = 0;
    swCol.magenta    = 0;
    tmpSw.color      = swCol;
    tmpPth.stroked   = false;
    tmpPth.fillColor = tmpSw.color;
    tmpPth.selected  = true;
    tmpPth.remove();
    tmpSw.remove();

    return sel;
  }

  function addCmykSw(swName, values) {
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
        var sw        = d.swatches.add();
        sw.name       = swName;
        var swCol     = new CMYKColor();
        swCol.cyan    = values[0];
        swCol.magenta = values[1];
        swCol.yellow  = values[2];
        swCol.black   = values[3];
        sw.color      = swCol;
        return sw;
      } else {
        alert(e);
        return;
      }
    }
  }
}());
