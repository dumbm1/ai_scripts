/**
 * jsx for Ai. Marat Shagiev: marat_js@bk.ru. 15.08.2015
 */

//@target illustrator

//alert ( getSelBoundsExtend ( selection[0] ) );
alert ( getBoundsExtend ( selection[0] ) );

/**
 * get selection bounds, width and height
 *
 * @param [Object] any collection or single object
 * @return {Array} bounds [ [ left, top, right, bottom ], width, height ]
 */
/**
 * get selection.bounds, width and height
 *
 * @param [Object] any collection or single object
 * @return {Array} bounds [ [ left, top, right, bottom ], width, height ]
 */
function getBoundsExtend ( selectElems ) {

  var bounds = _getBounds ( selectElems, [] ),
      width  = _calcElemWidthByBounds ( bounds ),
      height = _calcElemHeightByBounds ( bounds );

// recursive search of maximal bounds
  function _getBounds ( collection, bounds ) {
// if have one path (no collection of items)
    if ( collection.typename == 'PathItem' || collection.typename == 'CompoundPathItem' ) {
      return collection.geometricBounds;
    }

    for ( var j = 0; j < collection.length; j++ ) {

      var el = collection [ j ];

      if ( el.typename != 'GroupItem' ) { // any pageItem other than groupItem
        if ( bounds == '' ) {
          bounds = el.geometricBounds;

          continue;
        }
        bounds = _compareBounds ( el, bounds );

      }

      if ( el.typename == 'GroupItem' && el.clipped ) { // group with mask => search mask
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

      if ( el.typename == 'GroupItem' && !el.clipped && !el.groupItems ) { // group have no mask and another groups
        if ( bounds == '' ) {
          bounds = el.geometricBounds;

          continue;
        }
        bounds = _compareBounds ( el.geometricBounds, bounds );

      }

      if ( el.typename == 'GroupItem' && !el.clipped && el.groupItems ) { // group have no mask, but have group => recursion
        bounds = _getBounds ( el.pageItems, bounds );

        continue;
      }
    }
    return bounds;
  }

// Compare and return maximumise geometricBounds
  function _compareBounds ( elem, boundsToCompare ) {

    var elemBounds = elem.geometricBounds;

    elemBounds[ 0 ] < boundsToCompare[ 0 ] ? boundsToCompare[ 0 ] = elemBounds[ 0 ] : '';
    elemBounds[ 1 ] > boundsToCompare[ 1 ] ? boundsToCompare[ 1 ] = elemBounds[ 1 ] : '';
    elemBounds[ 2 ] > boundsToCompare[ 2 ] ? boundsToCompare[ 2 ] = elemBounds[ 2 ] : '';
    elemBounds[ 3 ] < boundsToCompare[ 3 ] ? boundsToCompare[ 3 ] = elemBounds[ 3 ] : '';

    return boundsToCompare;
  }

// calculate item width by it left and right bounds
  function _calcElemWidthByBounds ( bounds ) {
    var elemWidth = 0,
        left      = bounds[ 0 ],
        right     = bounds[ 2 ];

    (left <= 0 && right <= 0) || (left >= 0 && right >= 0) ? elemWidth = Math.abs ( left - right ) : '';
    left <= 0 && right >= 0 ? elemWidth = Math.abs ( left ) + right : '';

    return elemWidth;
  }

// calculate item height bu it top and bottom bounds
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
