
if ( app.documents.length > 0 ) {
 
 if ((!app.selection.length) || (app.selection[0].typename!="PathItem"))
 {
   alert("No path selected!");
 } else
  {
     var pi=app.selection[0];
     for (var i=0;i<pi.pathPoints.length;i++)
     {
       pi.pathPoints[i].selected=PathPointSelection.NOSELECTION;;
      }
   
     for (var i=0;i<pi.pathPoints.length;i++)
     {
       var pp=pi.pathPoints[i];
     
       var xa=pp.anchor[0];
       var ya=pp.anchor[1];
       var xb=pp.leftDirection[0];
       var yb=pp.leftDirection[1];
       if ((xa==xb) && (ya==yb))
       {
         if (i>0)
         {
           xb=pi.pathPoints[i-1].anchor[0];
           yb=pi.pathPoints[i-1].anchor[1];
         } else
         {
           xb=pi.pathPoints[pi.pathPoints.length-1].anchor[0];
           yb=pi.pathPoints[pi.pathPoints.length-1].anchor[1];
         }

       }
       var xc=pp.rightDirection[0];
       var yc=pp.rightDirection[1];
       if ((xa==xc) && (ya==yc))
       {
         if (i<pi.pathPoints.length-1)
         {
           xc=pi.pathPoints[i+1].anchor[0];
           yc=pi.pathPoints[i+1].anchor[1];
         } else
         {
           xc=pi.pathPoints[0].anchor[0];
           yc=pi.pathPoints[0].anchor[1];
         }

       }
       var cosalpha=Math.abs(((xb-xa)*(xc-xa)+(yb-ya)*(yc-ya))/
 (Math.sqrt(((xb-xa)*(xb-xa)+(yb-ya)*(yb-ya))*((xc-xa)*(xc-xa)+(yc-ya)*(yc-ya)))));
      // alert(cosalpha);
       if (cosalpha>0.93969262)  // cos (20 grad)
       {
         pp.selected=PathPointSelection.ANCHORPOINT;
       } else
       {
 //        pp.selected=PathPointSelection.NOSELECTION;
       }

     }
  }
} else alert("No document!");