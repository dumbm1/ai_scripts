/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 30.03.2016 14:17
 */

(function addTechFrame () {
  var techFile = new File ( '/D/__MY_WORK/zz_PPD_AdobePS_ACV/HEADERS.ai' ),
      targDoc  = activeDocument,
      techDoc,
      commonLay;

  if ( !techFile.exists ) return;
  if ( !targDoc.fullName.exists ) return;

  try {
    commonLay = targDoc.layers.getByName( 'common' );
    targetDoc.activeLayer = commonLay;
  } catch ( e ) {
    commonLay = targDoc.layers.add();
    commonLay.name = 'common';
    targDoc.activeLayer = commonLay;
  }

  open ( techFile );
  techDoc = activeDocument;

  for ( i = 0; i < techDoc.layers.length; i++ ) {
    var lay = techDoc.layers[ i ];
    if ( !lay.visible ) continue;
    lay.hasSelectedArtwork = true;
  }
  copy ();
  activeDocument.close( SaveOptions.DONOTSAVECHANGES );

  targDoc.activate();
  paste ();

} ());
