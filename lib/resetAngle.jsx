/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 04.07.2015
 */

/*
 //from _MBK_
 mainSel = activeDocument.selection;
 for ( j = 0; j < mainSel.length; j++ ) {
 if ( mainSel[ j ].tags.length ) {
 for ( i = 0; i < mainSel[ j ].tags.length; i++ ) {
 if ( mainSel[ j ].tags[ i ].name == "BBAccumRotation" ) {
 alert ( "Angle=" + mainSel[ j ].tags[ i ].value * 180 / 3.1415926535 );
 }
 }
 }
 }
 */
// from Seysi
if ( documents.length > 0 ) {

  if ( selection.length > 0 ) {

    var tagList = selection[ 0 ].tags,
        unrotateAngle,
        accumRot;

    //Retrieve the value of the BBAccumRotation tag
    //Value exists ONLY after the object has been rotated

    accumRot = tagList[ "BBAccumRotation" ].value;

    //Convert radians to degrees
    unrotateAngle = -((accumRot / (2 * Math.PI)) * 360);

    selection[ 0 ].rotate ( unrotateAngle );

  }

  else {

    alert ( "No object selected" );

  }
}