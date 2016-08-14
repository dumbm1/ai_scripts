/**
 * ai.jsx ©MaratShagiev m_js@bk.ru 14.07.2015
 */

function setStroke ( elem, scaleFactor ) {
  try {
    switch ( elem.typename ) {

      case 'GroupItem' :
        for ( var j = 0; j < elem.pageItems.length; j++ ) {
          setStroke ( elem.pageItems[ i ], scaleFactor );
        }
        break;

      case 'PathItem':
        if ( elem.stroked ) {
          elem.strokeWidth *= scaleFactor;
        }
        break;

      case 'CompoundPathItem':
        if ( elem.pathItems[ 0 ].stroked ) {
          elem.pathItems[ 0 ].strokeWidth *= scaleFactor;
        }
        break;

      case 'TextFrame':
        var frameChars = elem.textRange;
        if ( frameChars.characterAttributes.strokeColor != '[NoColor]' ) {
          frameChars.characterAttributes.strokeWeight *= scaleFactor;
        }
        break;

      default:
        break;
    }
  } catch ( e ) {}
}
