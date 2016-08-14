getBounds(selection[0],[])

// сравнить и вернуть самые широкие (с учётом масок) geometricBounds коллекции элементов
function getBounds ( collection, bounds ) {
  var clipGroupElems, i, j;

  if ( collection.typename != 'GroupItem' ) { // любой отдельный элемент неконтейнер
    return collection.geometricBounds;
  }
  if ( collection.clipped ) { // группа с маской => ищем маску
    clipGroupElems = collection.pathItems;

    for ( i = 0; i < clipGroupElems.length; i++ ) {
      if ( clipGroupElems[ i ].clipping ) {
        if ( bounds == '' ) {
          bounds = clipGroupElems[ i ].geometricBounds;
          continue;
        }
        bounds = _compareBounds ( clipGroupElems[ i ], bounds );
      }
    }
    return bounds;
  }

  // группа без обтравочной маски => цикл по элементам группы
  for ( j = 0; j < collection.pageItems.length; j++ ) {

    var el = collection.pageItems [ j ];

    if ( el.typename != 'GroupItem' ) { // любой pageItem кроме группы
      if ( bounds == '' ) {
        bounds = el.geometricBounds;
        continue;
      }
      bounds = _compareBounds ( el, bounds );
    }

    if ( el.typename == 'GroupItem' && el.clipped ) { // группа с маской => ищем маску
      clipGroupElems = el.pathItems;
      for ( i = 0; i < clipGroupElems.length; i++ ) {
        if ( clipGroupElems[ i ].clipping ) {
          if ( bounds == '' ) {
            bounds = clipGroupElems[ i ].geometricBounds;
            continue;
          }
          bounds = _compareBounds ( clipGroupElems[ i ], bounds );
        }
      }
      continue;
    }

    if ( el.typename == 'GroupItem' && !el.groupItems && !el.clipped ) { // группа без маски и без групп
      if ( bounds == '' ) {
        bounds = el.geometricBounds;
//          bounds = getBounds ( el.pageItems, bounds );
        continue;
      }
      bounds = _compareBounds ( el.geometricBounds, bounds );
      continue;
    }

    if ( el.typename == 'GroupItem' && el.groupItems ) { // группа без маски, но с группами => рекурсия
      for ( var l = 0; l < el.pageItems.length; l++ ) {
        /* if ( bounds == '' ) {
         bounds = getBounds ( el.pageItems[l], '' );
         }*/
        bounds = getBounds ( el.pageItems[ l ], bounds );
      }
      continue;
    }
  }
  return bounds;

  // сравнить и вернуть самые широкие geometricBounds элемента
  function _compareBounds ( elem, boundsToCompare ) {
    var elemBounds = elem.geometricBounds;
    elemBounds[ 0 ] < boundsToCompare[ 0 ] ? boundsToCompare[ 0 ] = elemBounds[ 0 ] : '';
    elemBounds[ 1 ] > boundsToCompare[ 1 ] ? boundsToCompare[ 1 ] = elemBounds[ 1 ] : '';
    elemBounds[ 2 ] > boundsToCompare[ 2 ] ? boundsToCompare[ 2 ] = elemBounds[ 2 ] : '';
    elemBounds[ 3 ] < boundsToCompare[ 3 ] ? boundsToCompare[ 3 ] = elemBounds[ 3 ] : '';
    return boundsToCompare;
  }

}