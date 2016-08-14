/**
 ** .jsx for Adobe apps. Marat Shagiev. JetBrains WebStorm. 23.02.13
 ** using: select the outside rectangle, then run the script
 **/
 
//=== THE CONSTANTS ===>>
var PT_TO_MM = 2.834645668;
var MM_TO_PT = 0.352777778;

//=== THE SCRIPT ===>>
var makeup = new RedWave();
var angleMarks = makeup.makeAngles();
makeup.removeRect();
makeup.resizeArtb(angleMarks);
angleMarks.selected = true;


//=== THE LIBRARY ===>
function RedWave() {
  var doc = activeDocument;
  var rect = selection[0];
  var artb = doc.artboards;
  var bounds = rect.geometricBounds;
  var top_left, top_right, bott_right, bott_left;
  var angle_top_left, angle_top_right, angle_bott_right, angle_bott_left;

  top_left = [bounds[0] - PT_TO_MM, bounds[1] + PT_TO_MM];
  top_right = [bounds[2] + PT_TO_MM, bounds[1] + PT_TO_MM];
  bott_right = [bounds[2] + PT_TO_MM, bounds[3] - PT_TO_MM];
  bott_left = [bounds[0] - PT_TO_MM, bounds[3] - PT_TO_MM];

  this.makeAngles = function() {
    var group = doc.groupItems.add();

    angle_top_left = group.pathItems.add();
    angle_top_left.setEntirePath([
      [top_left[0], top_left[1] - 5 * PT_TO_MM],
      top_left,
      [top_left[0] + 5 * PT_TO_MM, top_left[1]]
    ])

    angle_top_left.strokeDashes = [];
    angle_top_left.strokeWidth = .15 * PT_TO_MM;
    angle_top_left.strokeColor = doc.swatches.getByName('[Registration]').color;
    angle_top_left.fillColor = doc.swatches.getByName('[None]').color;

    angle_top_right = angle_top_left.duplicate();
    angle_top_right.rotate(-90);
    angle_top_right.position = [top_right[0] - 5 * PT_TO_MM, top_right[1]];

    angle_bott_right = angle_top_left.duplicate();
    angle_bott_right.rotate(180);
    angle_bott_right.position = [bott_right[0] - 5 * PT_TO_MM, bott_right[1] + 5 * PT_TO_MM];

    angle_bott_left = angle_top_left.duplicate();
    angle_bott_left.rotate(90);
    angle_bott_left.position = [bott_left[0], bott_left[1] + 5 * PT_TO_MM];

    return group;
  }
  this.removeRect = function() {
    rect.remove();
  }
  this.resizeArtb = function(rect) {
    var artb_left, artb_top, artb_right, artb_bottom;
    var marksBounds = rect.geometricBounds;

    for (var i = 1; i < artb.length; i++) {
      artb[i].remove();
      i--;
    }
    artb_left = marksBounds[0] - 10 * PT_TO_MM;
    artb_top = marksBounds[1] + 10 * PT_TO_MM;
    artb_right = marksBounds[2] + 10 * PT_TO_MM;
    artb_bottom = marksBounds[3] - 10 * PT_TO_MM;

    artb[artb.getActiveArtboardIndex()].artboardRect = [artb_left, artb_top, artb_right, artb_bottom];
  }
}
