/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 23.06.2016
 */

////@target illustrator-18
//activeDocument.activeLayer.hasSelectedArtwork = true;
alert ( getSelBoundsExtend ( selection ) );

/**
 * взять selection.bounds:  [left, top, right, bottom]
 * вычислить width, height по bounds
 *
 * @param [Object/Collection]
 * @return {Array} [ bounds, width, height ]  Границы, ширина, высота
 */
function getSelBoundsExtend ( selectElems ) {

  var bounds = _getBounds ( selectElems, [] ),
      width  = _calcElemWidthByBounds ( bounds ),
      height = _calcElemHeightByBounds ( bounds );

// рекурсивный поиск максимально раздвинутых границ
  function _getBounds ( collection, bounds ) {
// если передана не коллекция а 1 контур
    if ( collection.typename == 'PathItem' || collection.typename == 'CompoundPathItem' ) {
      return collection.geometricBounds;
    }

    for ( var j = 0; j < collection.length; j++ ) {

      var el = collection [ j ];

      if ( el.typename != 'GroupItem' ) { // любой pageItem кроме группы
        if ( bounds == '' ) {
          bounds = el.geometricBounds;

          continue;
        }
        bounds = _compareBounds ( el, bounds );

      }

      if ( el.typename == 'GroupItem' && el.clipped ) { // группа с маской => ищем маску
        var groupPaths = el.pathItems;

        for ( var i = 0; i < groupPaths.length; i++ ) {
          if ( groupPaths[ i ].clipping ) {
            if ( bounds == '' ) {
              bounds = groupPaths[ i ].geometricBounds;

              continue;
            }
            bounds = _compareBounds ( groupPaths[ i ], bounds );

          }
        }
      }

      if ( el.typename == 'GroupItem' && !el.clipped && !el.groupItems ) { // группа без маски и без групп
        if ( bounds == '' ) {
          bounds = el.geometricBounds;

          continue;
        }
        bounds = _compareBounds ( el.geometricBounds, bounds );

      }

      if ( el.typename == 'GroupItem' && !el.clipped && el.groupItems ) { // группа без маски, но с группами => рекурсия
        bounds = _getBounds ( el.pageItems, bounds );

        continue;
      }
    }
    return bounds;
  }

// сравнить и вернуть самые широкие geometricBounds
  function _compareBounds ( elem, boundsToCompare ) {

    var elemBounds = elem.geometricBounds;

   return [
Math.min(elemBounds[0], boundsToCompare[0]), 
Math.max(elemBounds[1],boundsToCompare[1]), 
Math.max(elemBounds[2],boundsToCompare[2]), 
Math.min(elemBounds[3],boundsToCompare[3])
]
  }

// высчитать ширину элемента по его левой и правой границе
  function _calcElemWidthByBounds ( bounds ) {
    var elemWidth = 0,
        left      = bounds[ 0 ],
        right     = bounds[ 2 ];

    (left <= 0 && right <= 0) || (left >= 0 && right >= 0) ? elemWidth = Math.abs ( left - right ) : '';
    left <= 0 && right >= 0 ? elemWidth = Math.abs ( left ) + right : '';

    return elemWidth;
  }

// высчитать высоту элемента по его верхней и нижней границе
  function _calcElemHeightByBounds ( bounds ) {
    var elemHeight = 0,
        top        = bounds[ 1 ],
        bottom     = bounds[ 3 ];

    (top <= 0 && bottom <= 0) || (top >= 0 && bottom >= 0) ? elemHeight = Math.abs ( top - bottom ) : '';
    top >= 0 && bottom <= 0 ? elemHeight = top + Math.abs ( bottom ) : '';
    return elemHeight;
  }

  return [ bounds, width, height ];
}
