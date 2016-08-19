/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 17.08.2016
 */
////@target illustrator-20

(function cropToArtb () {
  setZero ();
  clearOutOfArtb ();
  expandAll ();
  ungroupAll (activeDocument.activeLayer);
  cropAllToArtbRect (activeDocument.activeLayer);

  function clearOutOfArtb () {
    executeMenuCommand ('selectallinartboard');
    executeMenuCommand ('Inverse menu item');
    executeMenuCommand ('clear');
  }

  function expandAll () {
    executeMenuCommand ('selectall');
    executeMenuCommand ('expandStyle');
    executeMenuCommand ('deselectall');
  }

  function ungroupAll (lay) {
    while (lay.groupItems.length) {
      executeMenuCommand ('selectall');
      executeMenuCommand ('ungroup');
      executeMenuCommand ('deselectall');
    }
  }

  function cropAllToArtbRect (lay) {
    try {
      _actAdd_intersect ();
      for (var i = lay.pageItems.length - 1; i >= 0; i--) {
        var item = lay.pageItems[i];
        if (!_outArtbTest (item)) continue;
        var cropRect = _makeCropRect (lay);
        cropRect.move (item, ElementPlacement.PLACEAFTER);
        item.selected     = true;
        cropRect.selected = true;
        app.doScript ("intersect", "intersect", false); // action name, set name
        executeMenuCommand ('deselectall');
      }
    } catch (e) {
    } finally {
      try {
        app.unloadAction ("intersect", ""); // set name
      } catch (e) {
      }
    }

// if the item is out from artb then  @return {true}
    function _outArtbTest (item) {
      var d          = activeDocument;
      var artbIndex  = d.artboards.getActiveArtboardIndex ();
      var artbRect   = d.artboards[artbIndex].artboardRect;
      var itemBounds = item.geometricBounds; // left top right bottom
      return itemBounds[0] < artbRect[0] || itemBounds[1] > artbRect[1] ||
        itemBounds[2] > artbRect[2] || -itemBounds[3] > -artbRect[3];
    }

    function _makeCropRect (lay) {

      var d         = activeDocument;
      var artbIndex = d.artboards.getActiveArtboardIndex ();
      var artbRect  = d.artboards[artbIndex].artboardRect;
      // top left width height
      var cropRect  = lay.pathItems.rectangle (artbRect[1], artbRect[0], artbRect[2], -artbRect[3]);
      return cropRect;
    }

    function _actAdd_intersect () {
      {
        var actStr = '' +
          '/version 3' +
          '/name [ 9' +
          '	696e74657273656374' +
          ']' +
          '/isOpen 0' +
          '/actionCount 1' +
          '/action-1 {' +
          '	/name [ 9' +
          '		696e74657273656374' +
          '	]' +
          '	/keyIndex 0' +
          '	/colorIndex 0' +
          '	/isOpen 0' +
          '	/eventCount 2' +
          '	/event-1 {' +
          '		/useRulersIn1stQuadrant 0' +
          '		/internalName (ai_compound_shape)' +
          '		/localizedName [ 14' +
          '			436f6d706f756e64205368617065' +
          '		]' +
          '		/isOpen 0' +
          '		/isOn 1' +
          '		/hasDialog 0' +
          '		/parameterCount 2' +
          '		/parameter-1 {' +
          '			/key 1851878757' +
          '			/showInPalette -1' +
          '			/type (enumerated)' +
          '			/name [ 9' +
          '				496e74657273656374' +
          '			]' +
          '			/value 1' +
          '		}' +
          '		/parameter-2 {' +
          '			/key 1836016741' +
          '			/showInPalette -1' +
          '			/type (integer)' +
          '			/value 0' +
          '		}' +
          '	}' +
          '	/event-2 {' +
          '		/useRulersIn1stQuadrant 0' +
          '		/internalName (ai_expand_compound_shape)' +
          '		/localizedName [ 21' +
          '			457870616e6420436f6d706f756e64205368617065' +
          '		]' +
          '		/isOpen 0' +
          '		/isOn 1' +
          '		/hasDialog 0' +
          '		/parameterCount 1' +
          '		/parameter-1 {' +
          '			/key 2020634212' +
          '			/showInPalette -1' +
          '			/type (integer)' +
          '			/value 0' +
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

    }
  }

  // Set Zero point ruler on Document an artboard (global and local)
  function setZero () {
    var d                      = activeDocument;
    var i                      = d.artboards.getActiveArtboardIndex ();
    d.rulerOrigin              = [0, d.height];
    d.artboards[i].rulerOrigin = [0, 0];
  }

} ());
