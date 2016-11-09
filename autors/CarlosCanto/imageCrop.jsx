// script.name = imageCrop.jsx; 
// script.description = crops (for real) Raster images placed or embeded in Illustrator
// script.requirements = needs a Rectangle Path on top of the image to serve as New Image Size or cropping bounds
// script.parent = CarlosCanto // 01/12/2016;
// script.elegant = false;

// Usage:   Draw a Rectangle to serve as "cutter path", select both the Rectangle and the Raster Image, run the Script.

// Features:    Press Shift Key before running the script to Rasterize using TypeOptimized option otherwise the script will use default ArtOptimized
//                      Press Alt Key before running the script to Rasterize using custom Resolution, otherwise the script will use the base image resolution.

//@target Illustrator

function cropRasterImage () {
  if (app.documents.length > 0) {
    var idoc = app.activeDocument;
    var sel  = idoc.selection;
    if (sel.length == 2)
      imageCrop (sel[0], sel[1]);
    else alert ('Select an Image and a Rectangle (to be used as cropping area) and try again');
    return;
  }
  else alert ('No document to process');
  return;

  function imageCrop (rectangle, image) {
    if (rectangle.typename == 'PathItem' && (image.typename == 'RasterItem' || image.typename == 'PlacedItem')) {

      var rasterOpts = new RasterizeOptions;

      if (ScriptUI.environment.keyboardState.shiftKey) { // press Shift key to switched to TypeOptimized anti-alias, otherwise use the default ArtOptimized
        rasterOpts.antiAliasingMethod = AntiAliasingMethod.TYPEOPTIMIZED;
      }
      else {
        rasterOpts.antiAliasingMethod = AntiAliasingMethod.ARTOPTIMIZED;
      }

      if (ScriptUI.environment.keyboardState.altKey) { // press Alt key to Enter a custom Resolution, otherwise use the image resolution
        var title = 'Image Crop Script';
        var a     = prompt ('Enter target Resolution', 72, title);
        if (a == null) return;
        else rasterOpts.resolution = Number (a);
      }
      else {
        rasterOpts.resolution = objectResolution (image);
      }

      idoc.rasterize (image, rectangle.geometricBounds, rasterOpts);
      rectangle.remove ();
    }
    else alert ('Draw a Rectangle, place it on top of an Raster image and try again');
  }

  function objectResolution (obj) {
    var resw   = Math.abs (72 / obj.matrix.mValueA); // thanks to Moluapple for this
    var resh   = Math.abs (72 / obj.matrix.mValueD);
    var objRes = Math.round ((resw + resh) / 2);

    return objRes;
  }
}

cropRasterImage ()