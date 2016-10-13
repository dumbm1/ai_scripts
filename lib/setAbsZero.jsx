/**
 * ai.jsx (c)MaratShagiev m_js@bk.ru 13.10.2016
 */

( function setAbsZero () {
  var d               = activeDocument,
      rect            = d.pathItems.rectangle (0, 0, 16383, 16383),
      artbMax,
      screenModeStore = d.views[0].screenMode;

  rect.stroked  = false;
  rect.selected = true;

  cut ();
  d.views[0].screenMode = ScreenMode.FULLSCREEN;
  d.views[0].zoom       = 64;
  d.views[0].zoom       = 0.0313;
  paste ();
  rect    = selection[0];
  artbMax = d.artboards.add (rect.geometricBounds);

  d.rulerOrigin                                                  = [0, d.height];
  d.artboards[d.artboards.getActiveArtboardIndex ()].rulerOrigin = [0, 0];

  rect.remove ();
  artbMax.remove ();

  d.views[0].screenMode = screenModeStore;
} ());
