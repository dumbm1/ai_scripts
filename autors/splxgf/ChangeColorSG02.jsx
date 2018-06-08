#target illustrator
var doc = app.activeDocument;  
//var docRef = app.documents.add(DocumentColorSpace.CMYK);
var mSel = doc.selection;
var swatchGroupExists = false; //Проверка на существование групп, если их нет, то выходим
var dlg; //
var canPreview = false; // переменная показывает нужно ли делать перерисовку, показывает выбор корректной свотч-группы
var currentSwatchgroup; //текущая свотчгруппа, нужна для восстановления значений цветов, при ее смене или нажатия кнопки отмены 
var SourceSGC; //массив куда копируются исходные цвета свотчгруппы
var WorkSGC = []; // массив с преобразованным цветом, пока не используется
var MinDotSize; //Минимальный размер точки

var  c,  m,  y, k; // Два набора значений CMYK, первый это лучший найденный на текущий момент
var tc, tm, ty, tk; // второй будет проверяться на лучшее приближение delta E
var CE, ME, YE, KE; // булевые переменные, показывают какие краски используются

ShowDialog();

function CalcNewCMYK(z){
	tc = c;
	tm = m;
	ty = y;
    tk = k;
	if (z==0 && CE){tc=AddV(c,1); return true}
	if (z==1 && CE){tc=AddV(c,-1); return true}
	if (z==2 && ME){tm=AddV(m,1); return true}
	if (z==3 && ME){tm=AddV(m,-1); return true}
	if (z==4 && YE){ty=AddV(y,1); return true}
	if (z==5 && YE){ty=AddV(y,-1); return true}
	if (z==6 && KE){tk=AddV(k,1); return true}
	if (z==7 && KE){tk=AddV(k,-1); return true}
    return false;
}

function AddV(n,a){
    r=Math.round(n+a);
    if (a==1){
        if (r>100) r = 100;
        if (r<MinDotSize) r = MinDotSize;
     }
    if (a==-1){
        if (r<MinDotSize) r = 0;
     }
    if (a==0){
        if (r<MinDotSize) r = 0;
        if (r>100) r = 100;
     }
    return r;
}


function render(){
    if (canPreview == false) return;
    CE = dlg.inkspanel.chkboxC.value;
    ME = dlg.inkspanel.chkboxM.value;
    YE = dlg.inkspanel.chkboxY.value;
    KE = dlg.inkspanel.chkboxK.value;
    var NumInks = 0;
    if (CE) NumInks++;
    if (ME) NumInks++;
    if (YE) NumInks++;
    if (KE) NumInks++;
    if (NumInks ==0) return;
    allGroupSw=doc.swatchGroups[currentSwatchgroup].getAllSwatches(); 
    for(i=0;i<allGroupSw.length;i++){
        c = SourceSGC[i].cyan;
        m = SourceSGC[i].magenta;
        y = SourceSGC[i].yellow;
        k = SourceSGC[i].black;
        CalculateNewCMYK();
        allGroupSw[i].color.spot.color.cyan = c;
        allGroupSw[i].color.spot.color.magenta = m;
        allGroupSw[i].color.spot.color.yellow = y;
        allGroupSw[i].color.spot.color.black = k; 
    }
    redraw();
}//f

function changeSelected(){
    if (mSel.length==0) {alert("No objects selected"); return;};
    CE = dlg.inkspanel.chkboxC.value;
    ME = dlg.inkspanel.chkboxM.value;
    YE = dlg.inkspanel.chkboxY.value;
    KE = dlg.inkspanel.chkboxK.value;
    var NumInks = 0;
    if (CE) NumInks++;
    if (ME) NumInks++;
    if (YE) NumInks++;
    if (KE) NumInks++;
    if (NumInks ==0) return;
    var pLen = doc.pathItems.length;
    for(i=0;i<pLen;i++){
        if (!doc.pathItems[i].selected) continue;
        if (doc.pathItems[i].filled) {
            if (doc.pathItems[i].fillColor.typename='CMYKColor'){
                c = doc.pathItems[i].fillColor.cyan;
                m = doc.pathItems[i].fillColor.magenta;
                y = doc.pathItems[i].fillColor.yellow;
                k = doc.pathItems[i].fillColor.black;
                CalculateNewCMYK();
                doc.pathItems[i].fillColor.cyan = c;
                doc.pathItems[i].fillColor.magenta = m;
                doc.pathItems[i].fillColor.yellow = y;
                doc.pathItems[i].fillColor.black = k;
            }
        }// if filled
        if (doc.pathItems[i].stroked) {
            if (doc.pathItems[i].strokeColor.typename='CMYKColor'){
                c = doc.pathItems[i].strokeColor.cyan;
                m = doc.pathItems[i].strokeColor.magenta;
                y = doc.pathItems[i].strokeColor.yellow;
                k = doc.pathItems[i].strokeColor.black;
                CalculateNewCMYK();
                doc.pathItems[i].strokeColor.cyan = c;
                doc.pathItems[i].strokeColor.magenta = m;
                doc.pathItems[i].strokeColor.yellow = y;
                doc.pathItems[i].strokeColor.black = k;
            }
        }// if stroked
    }
    redraw();    
    dlg.close(1); 
}

function CalculateNewCMYK(){
        var labs = convertColor("CMYK", "LAB", [c,m,y,k]);
        if (!CE) c=0;
        if (!ME) m=0;
        if (!YE) y=0;
        if (!KE) k=0;
        c=AddV(c,0); m=AddV(m,0); y=AddV(y,0); k=AddV(k,0);
        var lab = convertColor("CMYK", "LAB", [c,m,y,k]);
        maxDD = CalcDeltaE(lab,labs) 
        var goo = true;
		while (goo){
			goo = false;
			for (z=0; z<8; z++){
                  if (!CalcNewCMYK(z)) continue;
				lab = convertColor("CMYK", "LAB", [tc, tm, ty, tk]);  
				DD = CalcDeltaE(lab, labs);
				if (maxDD>DD){maxDD = DD; goo = true; c = tc; m = tm; y = ty; k = tk; } 
			}
		}//while
}

function onChangeSG(firstrun){
    if (canPreview) {//при смене группы восстанавливаем исходные цвета
        allGroupSw=doc.swatchGroups[currentSwatchgroup].getAllSwatches(); 
        for(i=0;i<allGroupSw.length;i++)
            allGroupSw[i].color.spot.color=SourceSGC[i];
    }//if

    currentSwatchgroup=dlg.listpanel.selectList.selection.index+1;
    canPreview = false;
    allGroupSw=doc.swatchGroups[currentSwatchgroup].getAllSwatches(); 
    SourceSGC=[];
    var colCount = 0;
     for(i=0;i<allGroupSw.length;i++){
            if (allGroupSw[i].color.typename == 'SpotColor'){
                if (allGroupSw[i].color.spot.color.typename == 'CMYKColor'){
                    var cmyk = new CMYKColor();
                    cmyk.cyan = allGroupSw[i].color.spot.color.cyan;
                    cmyk.magenta = allGroupSw[i].color.spot.color.magenta;
                    cmyk.yellow = allGroupSw[i].color.spot.color.yellow;
                    cmyk.black = allGroupSw[i].color.spot.color.black;
                    SourceSGC.push(cmyk);
                    colCount++;
                }
            }
     }

    if (colCount==allGroupSw.length && colCount>0) {
        canPreview = true;
    }    
    dlg.actionpanel.pViewBtn.enabled =  canPreview;
    if (firstrun==undefined) render();
}

// Создает копию свотч-группы и делает свотчи глобальными
function Swatches2SpotCopy(){
     allGroupSw=doc.swatchGroups[currentSwatchgroup].getAllSwatches(); 
    //Предварительная проверка на наличие CMYK патчей
    var colCount = 0;
    for(i=0;i<allGroupSw.length;i++)
        if (allGroupSw[i].color.typename == 'CMYKColor') colCount++;
    if (colCount==0) { alert("No CMYK swatches found!"); return}; //если цмиковых патчей в группе нет, то и делать нечего
    
    var nsg = doc.swatchGroups.add();//добавляем группу

    for(i=0;i<allGroupSw.length;i++){
        var sc = false;
        var cmyk = new CMYKColor();
        
        if (allGroupSw[i].color.typename == 'CMYKColor'){
            sc = true;
            cmyk.cyan = allGroupSw[i].color.cyan;
            cmyk.magenta = allGroupSw[i].color.magenta;
            cmyk.yellow = allGroupSw[i].color.yellow;
            cmyk.black = allGroupSw[i].color.black;
        }
    
        if (allGroupSw[i].color.typename == 'SpotColor'){
            if (allGroupSw[i].color.spot.color.typename == 'CMYKColor'){
                sc = true;
                cmyk.cyan = allGroupSw[i].color.spot.color.cyan;
                cmyk.magenta = allGroupSw[i].color.spot.color.magenta;
                cmyk.yellow = allGroupSw[i].color.spot.color.yellow;
                cmyk.black = allGroupSw[i].color.spot.color.black;
            }
        }//if
        if (sc){
            var cs = doc.spots.add();
            var color = new SpotColor();
            color.spot = cs; 
            color.colorType = ColorModel.SPOT;
            color.spotKind = SpotColorKind.SPOTCMYK;
            color.spot.color = cmyk;
            var as=doc.swatchGroups[0].getAllSwatches();
            nsg.addSwatch(as[as.length-1]);
        }
    }//for
    dlg.close(1);
}

function ShowDialog(){
    if (documents.length == 0) return;

    dlg = new Window('dialog', 'Inks optimizer');
    dlg.listpanel = dlg.add('panel', undefined, 'Select swatch group')
    dlg.listpanel.selectList = dlg.listpanel.add("dropdownlist"); 
	for (var i = 1; i < doc.swatchGroups.length; i++) {		
        dlg.listpanel.selectList.add("item", doc.swatchGroups[i].name); 
        dlg.listpanel.selectList.selection = i-1;
        swatchGroupExists = true;
        currentSwatchgroup = i;
	}		
    dlg.listpanel.selectList.onChange = onChangeSG;
    
    dlg.listpanel.globalBtn = dlg.listpanel.add('button', undefined, 'Make all swatches global', {name:'Global'})
    dlg.listpanel.orientation = "row";
    dlg.listpanel.globalBtn.onClick = Swatches2SpotCopy;
    
    dlg.inkspanel = dlg.add('panel', undefined, 'Select target Inks: (choose one, two or three inks)');
    dlg.inkspanel.chkboxC = dlg.inkspanel.add("checkbox", undefined, "Cyan");
	dlg.inkspanel.chkboxM = dlg.inkspanel.add("checkbox", undefined, "Magenta");
	dlg.inkspanel.chkboxY = dlg.inkspanel.add("checkbox", undefined, "Yellow");
    dlg.inkspanel.chkboxK = dlg.inkspanel.add("checkbox", undefined, "Black");
    dlg.inkspanel.chkboxC.value=true;
    dlg.inkspanel.chkboxM.value=true;
    dlg.inkspanel.chkboxY.value=true;
    dlg.inkspanel.orientation = "row";
    
    dlg.deltapanel = dlg.add('group', undefined, 'delta E formula');
    dlg.deltapanel.deltaE = dlg.deltapanel.add ("radiobutton", undefined, "deltaE 76");   
    dlg.deltapanel.deltaE2000 = dlg.deltapanel.add ("radiobutton", undefined, "deltaE 2000");   
    dlg.deltapanel.deltaE94T = dlg.deltapanel.add ("radiobutton", undefined, "deltaE 94T");
    dlg.deltapanel.deltaE94G = dlg.deltapanel.add ("radiobutton", undefined, "deltaE 94G");
    dlg.deltapanel.deltaE.value = true;
    
    dlg.dotpanel = dlg.add('panel', undefined, 'Minimal dot size');
    dlg.dotpanel.mindot = dlg.dotpanel.add ('edittext {text: 0, characters: 3, justify: "center", active: false, enabled: false}');
    dlg.dotpanel.mindot.text=3;
    MinDotSize = 3;
    dlg.dotpanel.slider = dlg.dotpanel.add("slider", undefined, 3, 1, 7);
    dlg.dotpanel.slider.onChanging =  function(){
        dlg.dotpanel.mindot.text = dlg.dotpanel.slider.value.toFixed();
        MinDotSize = dlg.dotpanel.slider.value.toFixed();
     }
    dlg.dotpanel.slider.onChange =  function(){
        dlg.dotpanel.mindot.text = dlg.dotpanel.slider.value.toFixed();
        MinDotSize = dlg.dotpanel.slider.value.toFixed();
     }
    dlg.dotpanel.orientation = "row";
    
    dlg.actionpanel = dlg.add('group', undefined, '');    
    dlg.actionpanel.pViewBtn = dlg.actionpanel.add('button', undefined, 'Preview', {name:'Preview'});
    dlg.actionpanel.pViewBtn.onClick = function () { render();};		
    
    dlg.actionpanel.SaveBtn = dlg.actionpanel.add('button', undefined, 'Save', {name:'Save'}); 
    dlg.actionpanel.SaveBtn.onClick = function () {dlg.close(1); };		

    dlg.actionpanel.exitBtn = dlg.actionpanel.add('button', undefined, 'Cancel', {name:'Cancel'}); 
    dlg.actionpanel.exitBtn.onClick = function () { 
        restoreSwatches();
        dlg.close(1); 
     };	

    dlg.actionpanel.flyBtn = dlg.actionpanel.add('button', undefined, 'On fly'); 
    dlg.actionpanel.flyBtn.onClick = function () { 
        changeSelected();
     };	

    dlg.actionpanel.orientation = "row";

    //check 
    if (swatchGroupExists) {
        onChangeSG(true); 
     }  
    else {
        dlg.actionpanel.exitBtn.onClick = function () { dlg.close(1); };
        dlg.actionpanel.pViewBtn.enabled = false;
        dlg.actionpanel.SaveBtn.enabled = false;
        dlg.listpanel.globalBtn.enabled = false;
    }//if
    dlg.show();

}

// восстанавливаем цвета при выходе
function restoreSwatches(){
    if (canPreview) {
        allGroupSw=doc.swatchGroups[currentSwatchgroup].getAllSwatches(); 
        for(i=0;i<allGroupSw.length;i++)
            allGroupSw[i].color.spot.color=SourceSGC[i];
    }//if
};

function convertColor(src, dest, clrArr)  
{  
    return app.convertSampleColor(ImageColorSpace[src], clrArr, ImageColorSpace[dest], ColorConvertPurpose.defaultpurpose);  
}  


function CalcDeltaE(lab,labs){
  if (dlg.deltapanel.deltaE.value)  return deltaE(lab,labs);
  if (dlg.deltapanel.deltaE2000.value)  return deltaE2000(lab,labs);
  if (dlg.deltapanel.deltaE94T.value)  return deltaE94(lab,labs,true);
  if (dlg.deltapanel.deltaE94G.value)  return deltaE94(lab,labs,false);
}

function deltaE(lab,labs){
	DE76=Math.sqrt(
	Math.pow(labs[0]-lab[0],2)+
	Math.pow(labs[1]-lab[1],2)+
	Math.pow(labs[2]-lab[2],2));
	return DE76;
}

//стырено с brucelindbloom.com
function deltaE2000(lab,labs){
	var kL = 1.0;
	var kC = 1.0;
	var kH = 1.0;
	var lBarPrime = 0.5 * (lab[0] + labs[0]);
	var c1 = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
	var c2 = Math.sqrt(labs[1] * labs[1] + labs[2] * labs[2]);
	var cBar = 0.5 * (c1 + c2);
	var cBar7 = cBar * cBar * cBar * cBar * cBar * cBar * cBar;
	var g = 0.5 * (1.0 - Math.sqrt(cBar7 / (cBar7 + 6103515625.0)));	/* 6103515625 = 25^7 */
	var a1Prime = lab[1] * (1.0 + g);
	var a2Prime = labs[1] * (1.0 + g);
	var c1Prime = Math.sqrt(a1Prime * a1Prime + lab[2] * lab[2]);
	var c2Prime = Math.sqrt(a2Prime * a2Prime + labs[2] * labs[2]);
	var cBarPrime = 0.5 * (c1Prime + c2Prime);
	var h1Prime = (Math.atan2(lab[2], a1Prime) * 180.0) / Math.PI;
	if (h1Prime < 0.0)
		h1Prime += 360.0;
	var h2Prime = (Math.atan2(labs[2], a2Prime) * 180.0) / Math.PI;
	if (h2Prime < 0.0)
		h2Prime += 360.0;
	var hBarPrime = (Math.abs(h1Prime - h2Prime) > 180.0) ? (0.5 * (h1Prime + h2Prime + 360.0)) : (0.5 * (h1Prime + h2Prime));
	var t = 1.0 -
			0.17 * Math.cos(Math.PI * (      hBarPrime - 30.0) / 180.0) +
			0.24 * Math.cos(Math.PI * (2.0 * hBarPrime       ) / 180.0) +
			0.32 * Math.cos(Math.PI * (3.0 * hBarPrime +  6.0) / 180.0) -
			0.20 * Math.cos(Math.PI * (4.0 * hBarPrime - 63.0) / 180.0);
	if (Math.abs(h2Prime - h1Prime) <= 180.0) 
		dhPrime = h2Prime - h1Prime;
	else 
		dhPrime = (h2Prime <= h1Prime) ? (h2Prime - h1Prime + 360.0) : (h2Prime - h1Prime - 360.0);
	var dLPrime = labs[0] - lab[0];
	var dCPrime = c2Prime - c1Prime;
	var dHPrime = 2.0 * Math.sqrt(c1Prime * c2Prime) * Math.sin(Math.PI * (0.5 * dhPrime) / 180.0);
	var sL = 1.0 + ((0.015 * (lBarPrime - 50.0) * (lBarPrime - 50.0)) / Math.sqrt(20.0 + (lBarPrime - 50.0) * (lBarPrime - 50.0)));
	var sC = 1.0 + 0.045 * cBarPrime;
	var sH = 1.0 + 0.015 * cBarPrime * t;
	var dTheta = 30.0 * Math.exp(-((hBarPrime - 275.0) / 25.0) * ((hBarPrime - 275.0) / 25.0));
	var cBarPrime7 = cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime;
	var rC = Math.sqrt(cBarPrime7 / (cBarPrime7 + 6103515625.0));
	var rT = -2.0 * rC * Math.sin(Math.PI * (2.0 * dTheta) / 180.0);
	DE2000 = Math.sqrt(
				(dLPrime / (kL * sL)) * (dLPrime / (kL * sL)) +
				(dCPrime / (kC * sC)) * (dCPrime / (kC * sC)) +
				(dHPrime / (kH * sH)) * (dHPrime / (kH * sH)) +
				(dCPrime / (kC * sC)) * (dHPrime / (kH * sH)) * rT);
}

function deltaE94(lab,labs,textiles)
{
	var k1 = (textiles == true) ? 0.048 : 0.045;
	var k2 = (textiles == true) ? 0.014 : 0.015;
	var kL = (textiles == true) ? 2.0 : 1.0;
	var kC = 1.0;
	var kH = 1.0;

	var C1 = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
	var C2 = Math.sqrt(labs[1] * labs[1] + labs[2] * labs[2]);
	
	var delA = lab[1] - labs[1];
	var delB = lab[2] - labs[2];
	var delC = C1 - C2;
	var delH2 = delA * delA + delB * delB - delC * delC;
	var delH = (delH2 > 0.0) ? Math.sqrt(delH2) : 0.0;
	var delL = lab[0] - labs[0];
	
	var sL = 1.0;
	var sC = 1.0 + k1 * C1;
	var sH = 1.0 + k2 * C1;
	
	var vL = delL / (kL * sL);
	var vC = delC / (kC * sC);
	var vH = delH / (kH * sH);
	
	if (textiles == true)
	{
		return Math.sqrt(vL * vL + vC * vC + vH * vH);
	}
	else
	{
		return Math.sqrt(vL * vL + vC * vC + vH * vH);
	}
}