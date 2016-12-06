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
  ungoupAllSwatchGroups();
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
  /**
   * algorithm:
   * - duplicate swatches from groups
   * - remove groups
   * - rename duplicates
   *
   * */
  function ungoupAllSwatchGroups() {
    var d           = app.activeDocument;
    var swGrps      = d.swatchGroups;
    var swDuplNames = [];

    for (var i = 1; i < swGrps.length; i++) {
      var obj      = swGrps[i];
      var swatches = obj.getAllSwatches();
      for (var j = 0; j < swatches.length; j++) {
        var sw = swatches[j];
        swDuplNames.push(duplicateSwatch(j, sw).name);
      }
    }

    for (var k = swGrps.length - 1; k >= 1; k--) {
      var swGr = swGrps[k];
      swGr.remove();
    }

    for (var l = 0; l < swDuplNames.length; l++) {
      var swDuplName = swDuplNames[l];
      var swDupl     = d.swatches.getByName(swDuplName);
      swDupl.name    = swDupl.name.slice(0, -7);
    }

    function duplicateSwatch(i, sw) {

      var opts = getSpotOpts(sw.color.spot);
      return addSw(opts, i);

      function addSw(opts, i) {

        var newSpot      = d.spots.add(),
            newSpotColor = new SpotColor(),
            newColor;

        switch (opts.spotKind) {
          case SpotColorKind.SPOTCMYK:
            newColor = addNewCMYK(opts);
            break;
          case SpotColorKind.SPOTLAB:
            newColor = addNewLab(opts);
            break;
          case SpotColorKind.SPOTRGB:
            newColor = addNewRGB(opts);
            break;
          default:
            throw new Error('opts.spotKind error');
            break;
        }

        newSpot.name      = opts.name + ' copy ' + i;
        newSpot.colorType = opts.colorType;
        newSpot.color     = newColor;

        newSpotColor.spot = newSpot;
        return newSpot;
      }

      function getSpotOpts(spotSwatch) {
        var opts = {
          color:     spotSwatch.color,
          colorType: spotSwatch.colorType,
          name:      spotSwatch.name,
          spotKind:  spotSwatch.spotKind,
          spotComps: spotSwatch.getInternalColor()
        }
        return opts;
      }

      function addNewLab(opts) {
        var newLab = new LabColor();
        newLab.l   = opts.spotComps[0];
        newLab.a   = opts.spotComps[1];
        newLab.b   = opts.spotComps[2];
        return newLab;
      }

      function addNewRGB(opts) {
        var newRGB   = new RGBColor();
        newRGB.red   = opts.spotComps[0];
        newRGB.green = opts.spotComps[1];
        newRGB.blue  = opts.spotComps[2];
        return newRGB;
      }

      function addNewCMYK(opts) {
        var newCMYK     = new CMYKColor();
        newCMYK.cyan    = opts.spotComps[0];
        newCMYK.magenta = opts.spotComps[1];
        newCMYK.yellow  = opts.spotComps[2];
        newCMYK.black   = opts.spotComps[3];
        return newCMYK;
      }
    }
  }

}());
