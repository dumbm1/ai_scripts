/**
 * ai.jsx MaratShagiev 16-08-15
 *
 * some ways to deselect
 */

// быстрый вариант
function deselectAll() {
  for (var i = 0; i < activeDocument.layers.length; i++) {
    activeDocument.layers[i].hasSelectedArtwork = false;
  }
}

// цикл по selection
function deselectAll_copy() {
  for (var i = 0; i < selection.length; i++) {
    selection[i].selected = false;
  }
}

// cs6+
// executeMenuCommand ( 'deselectall' );