/**
 * .jsx for Adobe apps. Marat Shagiev
 * генератор векторного qr-кода
 * Illustrator CS4-CC
 * todo: добавить методы кодирования numeric и alphanumeric
 * todo: добавить ф-цию выбора лучшей из 8-ми масок
 * todo: добавить табы с формами визитки, адреса сайта, аккаунта фейсбука и т.д.
 * todo: добавить возможность позиционирования и масштабирования
 * todo: белые блоки не нужны, их надо удалить или генерить код только из черных блоков
 * todo: можно склеить все блоки в один объект
 */

try {
	if (+app.version.slice(0, 2) > 14) {
		//app.coordinateSystem = CoordinateSystem.DOCUMENTCOORDINATESYSTEM;
		app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
	}
} catch (e) {
	// alert(e.name + '\n' + e.massage);
}

/**
 * КОДИРОВАНИЕ ДАННЫХ
 */
// сгенерить объект с табличными данными
var tbl = tables();
// окно
var qrInterface = qr_interface({editText: ''});
var str = qrInterface.editText.text;
var dataStr = binwiseEcoding(str);
// 0,1,2,3 - для поиска максимально-допустимого количества бит по таблице CAPACITY_DATA
var eccLavel = +qrInterface.eccLavelList.selection.text;
var dataByteLength = (dataStr.length / 8).toString(2);
var vers = getVers(dataStr.length, eccLavel); // вычисляем версию кода
var capacityData = getMaxDataBits(dataStr.length, eccLavel); // вычисляем вместимость кода
var dataServStr = addServData(dataStr, vers); // формируем полную строку данных + служебную информацию
/**
 * проверяем, не привысила ли полная строка вместимости кода,
 * если превысила, то повышаем версию кода и заново присоединяем служебные данные,
 * перезаписываем  capacityData
 * */
if (dataServStr.length > capacityData) {
	++vers;
	capacityData = getMaxDataBits(dataServStr.length, eccLavel);
	dataServStr = addServData(dataStr, vers);
}
var dataServFillStr = fillStr(dataServStr);
var dataServFillNumArr = makeBinToNum(dataServFillStr);
var numBlocks = getNumbOfBlocks(eccLavel, vers);
var bytePerBlockArr = getBytesPerBlock(capacityData, numBlocks);
var filledBlocksArr = fillBlocks(dataServFillNumArr, bytePerBlockArr, numBlocks);
var cwPerBlock = tbl.ECC_PER_BLOCK[eccLavel][vers - 1];// кол-во байт коррекции на блок
var gp = tbl.GP[cwPerBlock]; // ищем подходящий порождающий многочлен
// генерим массив байт коррекции в 10-м формате
var eccArr = function () {
	var eccArr = [];
	for (var i = 0; i < numBlocks; i++) {
		eccArr.push(getECC(filledBlocksArr[i], gp));
	}
	return eccArr;
}();
// объединение всего в один поток
var finalArr = uniteToSingleStream(filledBlocksArr, eccArr, bytePerBlockArr);
var finalBynStr = transDecToBin(finalArr);

//------------------------------------------------------------------------>>
/**
 * 2. РИСОВАНИЕ КОДА
 */

if (documents.length == 0) {
	documents.add(DocumentColorSpace.CMYK, 150, 150);
}
var aDoc = activeDocument;
var X_0 = 0; // верхний левый угол РАБОЧЕЙ области кода
var Y_0 = 0;
var WHITE_FRAME = 4; // ширина белой рамки вокруг рабочей области кода
var COLOR_W = new CMYKColor();
var COLOR_K = new CMYKColor();
COLOR_K.black = 100;
var FINDER_SIZE = 8; // рабочая ширина поискового блока
var maskNumb = 2; // маска (жестко прописана 2-я)
var TOP_TIMING = -6;
var LEFT_TIMING = FINDER_SIZE;
var alignPatternBufer = [];
/**
 *рабочая область кода
 * */
var qrWorkWidth = tbl.ALIGN_MODUL_ARR[vers - 1][tbl.ALIGN_MODUL_ARR[vers - 1].length - 1] + 7
/**
 * +внешняя рамка в 4 блока шириной вокруг кода
 * */
var qrFullWidth = qrWorkWidth + 8;

try {
	if (!activeDocument.groupItems.getByName('qrCodeGroup') && str != 'null') {
		var qrCodeGroup = makeQr();
	}
} catch
	(e) {
	//alert('Error line: ' + e.line + '\n' + 'Error message: ' + e.message);
	if (activeDocument.groupItems.length || e.message == 'No such element' && str != 'null') {
		var qrCodeGroup = makeQr();
	}
}

//------------------------------------------------------------------------>>
/**
 *  БИБЛИОТЕКА Ф-ЦИЙ КОДИРОВАНИЯ
 */
/**
 * Sample bitwise encoding most of Unicide symbols
 * */
function binwiseEcoding(s) {
	var c, d = "";
	for (var i = 0; i < s.length; i++) {
		c = s.charCodeAt(i);
		if (c <= 0x7f) {
			d += ('0000000' + c.toString(2)).slice(-8);
		} else if (c >= 0x80 && c <= 0x7ff) {
			d += (((c >> 6) & 0x1f) | 0xc0).toString(2);
			d += ((c & 0x3f) | 0x80).toString(2);
		} else {
			d += ((c >> 12) | 0xe0).toString(2);
			d += (((c >> 6) & 0x3f) | 0x80).toString(2);
			d += ((c & 0x3f) | 0x80).toString(2);
		}
	}
	return d;
}
/**
 * Вычислить версию кода, в зависимости от числа бит и выбранного уровня коррекции
 * */
function getVers(dataLength, eccLavel) {
	for (var i = 0; i < 40; i++) {
		if (dataLength <= tbl.CAPACITY_DATA[eccLavel][i]) {
			return ++i; //это и есть номер версии
		}
	}
}
/**
 * Получить вместимость кода
 * (только даные + служебная информация, без кода коррекции)
 * */
function getMaxDataBits(dataLength, eccLavel) {
	for (var i = 0; i < 40; i++) {
		if (dataLength <= tbl.CAPACITY_DATA[eccLavel][i]) {
			// максимальное кол-во инфрмации в битах (данные + служебная, но без битов коррекции)
			return tbl.CAPACITY_DATA[eccLavel][i];
		}
	}
}
/**
 * добавление служебной информации к строке данных
 * */
function addServData(str, vers) {
	var binDataLength = '';

	if (vers < 10) {
		binDataLength = ('00000000' + dataByteLength).slice(-8);
	} else if (vers > 9) {
		binDataLength = ('000000000000000' + dataByteLength).slice(-16);
	}
	return '0100' + binDataLength + str + '0000';
}
/**
 * добавление специальных бит заполнения 11101100 00010001 в конец последовательности
 * */
function fillStr(str) {
	var newStr = '';
	var filler = '1110110000010001';
	var filled = 0;
	filled = capacityData - str.length;
	for (var i = 0; i < filled / 16; i++) {
		str += filler;
	}
	str = str.slice(0, capacityData);
	return str;
}
/**
 * бинарную строку вида '00000011...00110101' в массив целых чисел 0-255
 * param {String}
 * return {Array}
 */
function makeBinToNum(str) {
	step = 8;
	var newStr = '';
	for (var i = 0; i < str.length; i++) {
		if (i < step || i % step) {// что бы это значило?
			newStr += str[i];
		} else {
			newStr += '::' + str[i];
		}
	}
	var arr = newStr.split('::');
	for (var i = 0; i < arr.length; i++) {
		arr[i] = parseInt(arr[i], 2);
	}
	return arr;
}
/**
 * определить количество блоков, на которые разбиваем строку с данными
 * */
function getNumbOfBlocks(lavel, vers) {
	return tbl.NUMBER_OF_BLOCKS[lavel][vers - 1];
}
/**
 *  определение количества байт в каждом блоке
 *return Array
 */
function getBytesPerBlock(capacity /*вместимость данной версии кода*/, blocks/*кол-во блоков*/) {
	var capacityInBytes = capacity / 8;
	var extraBlocksNum = capacityInBytes % blocks; // кол-во дополненных блоков  (на 1 байт больше, они идут последними)
	var bytesPerBlock = (capacityInBytes - (capacityInBytes % blocks)) / blocks; // количество байт на обычный блок
	var arr = [];
	for (var i = 0; i < blocks; i++) {
		if (extraBlocksNum) {
			if (i < blocks - extraBlocksNum) {
				arr.push(bytesPerBlock);
			} else arr.push(bytesPerBlock + 1);

		} else if (!extraBlocksNum) {
			arr.push(bytesPerBlock);
		}
	}
	return arr;
}
/**
 * ф-ция заполняет блоки данными, т.е. разобивает данные на части заданной длинный и пихает в 2-мерный массив
 * param {Array} dataServFillNum - дополненный массив данных и служебной инфы в десятичном формате
 * param {Array} bytePerBlockArr - массив с длинн в байтах на каждый из блоков
 * param {Number} numBlocks - количество блоков (из таблицы tbl.NUMBER_OF_BLOCKS)
 * return {Array} arr - двумерный массив данных, разбитых на блоки
 */
function fillBlocks(dataServFillNum, bytePerBlockArr, numBlocks) {
	var arr = [];
	var arrCopy = [];
	//скопируем массив dataServFillNum в arrCopy
	for (var j = 0; j < dataServFillNum.length; j++) {
		arrCopy[j] = dataServFillNum[j];
	}

	for (var i = 0; i < bytePerBlockArr.length; i++) {
		arr[i] = arrCopy.splice(0, bytePerBlockArr[i]);
	}
	return arr;
}
/**
 * генератор кода коррекции ошибок
 * */
function getECC(dataArr, gp) {

	var startArr = [];
	var A, B, C;
	var N = gp.length;
	var tempGpArr = [];

	for (var i = 0; i < dataArr.length; i++) {
		startArr[i] = dataArr[i];
	}

	for (var i = 0; i < dataArr.length; i++) {
		A = startArr.shift(); //(1.)
		startArr.push(0); //(2.)
		if (A == 0) { //(2a.)
			continue;
		}
		B = tbl.INVERS_G_F[A]; //(3.)

		for (var j = 0; j < N; j++) { //(4.)
			C = gp[j] + B; //(5.)
			if (C > 254) { //(5a.)
				C = C % 255;
			}
			tempGpArr[j] = tbl.G_F[C];  //(6.)
			startArr[j] = startArr[j] ^ tempGpArr[j];  //(7.)(8.)
		}
	}
	return startArr.slice(0, N);
}
/**
 * Объединение всех данных и ECCW в один поток бит
 * param {}
 * return {Array}  fullArr -  массив чисел в десятичном формате
 */
function uniteToSingleStream(filledBlocksArr, eccArr, bytePerBlockArr) {
	var fullArr = [];
	var dataKeywordsArr = [];
	var eccWordsArr = [];

	// объединение блоков (массивов) filledBlocksArr  в одну последовательность
	for (var i = 0; i < bytePerBlockArr[bytePerBlockArr.length - 1]; i++) {

		for (var j = 0; j < filledBlocksArr.length; j++) {
			if ((filledBlocksArr[j][i]) === undefined) {
				continue;
			}
			dataKeywordsArr.push(filledBlocksArr[j][i]);
		}
	}
	// объединение блоков (массивов) eccArr  в одну последовательность
	for (var i = 0; i < eccArr[0].length; i++) {
		for (var j = 0; j < eccArr.length; j++) {
			eccWordsArr.push(eccArr[j][i]);
		}
	}
	return fullArr.concat(dataKeywordsArr, eccWordsArr);
}
/**
 * перевод массива десятичных чисел в двоичную строку
 * param {Array} arr - массив чисел в десятичном формате
 * return {String} str - двоичные данные в виде строки
 */
function transDecToBin(arr) {
	var str = '';
	for (var i = 0; i < arr.length; i++) {
		str = str + ('00000000' + arr[i].toString(2)).slice(-8);
	}
	return str;
}

//------------------------------------------------------------------------>>
/**
 *  БИБЛИОТЕКА Ф-ЦИЙ РИСОВАНИЯ
 */
// X — столбец, Y — строка, % — остаток от деления, / — целочисленное деление
function MASK(left_X, top_Y, maskNumb) {
	top_Y = -top_Y;
	var maskArr = [
		(left_X + top_Y) % 2,
		top_Y % 2, left_X % 3,
		(left_X + top_Y) % 3,
		(left_X / 3 + top_Y / 2) % 2,
		(left_X * top_Y) % 2 + (left_X * top_Y) % 3,
		((left_X * top_Y) % 2 + (left_X * top_Y) % 3) % 2,
		((left_X * top_Y) % 3 + (left_X + top_Y) % 2) % 2
	]
	return maskArr[maskNumb];
};
function makeFinders() {
	var groups = activeDocument.groupItems;

	var finderGr = groups.add();
	var leftFinderGr = groups.add();
	moveInside(leftFinderGr, finderGr);

	var sq0 = leftFinderGr.pathItems.rectangle(X_0 + 1, Y_0 - 1, 9, 9);
	var sq1 = leftFinderGr.pathItems.rectangle(X_0, Y_0, 7, 7);
	var sq2 = leftFinderGr.pathItems.rectangle(X_0 - 1, Y_0 + 1, 5, 5);
	var sq3 = leftFinderGr.pathItems.rectangle(X_0 - 2, Y_0 + 2, 3, 3);

	sq0.stroked = sq1.stroked = sq2.stroked = sq3.stroked = false;
	sq0.fillColor = sq2.fillColor = COLOR_W;
	sq1.fillColor = sq3.fillColor = COLOR_K;

	var rightFinderGr = leftFinderGr.duplicate();
	rightFinderGr.position = [rightFinderGr.position[0] + (qrFullWidth - 15) , rightFinderGr.position[1]];
	var bottomFinderGr = leftFinderGr.duplicate();
	bottomFinderGr.position = [bottomFinderGr.position[0], bottomFinderGr.position[1] - (qrFullWidth - 15) ];

	return finderGr;
}
function makeBaseSq() {
	var baseSqGr = aDoc.groupItems.add();
	var sq0 = baseSqGr.pathItems.rectangle(
		X_0 + WHITE_FRAME, Y_0 - WHITE_FRAME, qrFullWidth, qrFullWidth
	);
	var sq1 = baseSqGr.pathItems.rectangle(0, 0, qrWorkWidth, qrWorkWidth);
	sq0.fillColor = sq1.fillColor = COLOR_W;
	sq0.stroked = sq1.stroked = false;

	return baseSqGr;
}
function makeTimingAndDarkBloock() {

	var timingGr = aDoc.groupItems.add();
	var timingLength = (qrFullWidth - FINDER_SIZE * 2 - WHITE_FRAME * 2);
	var darkBlock = aDoc.pathItems.rectangle(
		-FINDER_SIZE - timingLength, FINDER_SIZE,
		1, 1
	);
	darkBlock.stroked = false;
	darkBlock.fillColor = COLOR_K;

	for (var i = 0; i < timingLength; i++) {
		var rect = timingGr.pathItems.rectangle(TOP_TIMING, LEFT_TIMING + i, 1, 1);
		rect.stroked = false;
		if ((i + 3) % 2) {
			rect.fillColor = COLOR_K;
		} else rect.fillColor = COLOR_W;
		rect = null;
	}
	var timingGr2 = timingGr.duplicate();
	timingGr2.rotate(-90);
	timingGr2.position = [-TOP_TIMING , -LEFT_TIMING];
	moveInside(timingGr2, timingGr);
	moveInside(darkBlock, timingGr);

	return timingGr;
}
function makeAlignPattern() {

	if (vers < 2) {
		return;
	}
	var alignPatternGr = aDoc.groupItems.add();
	var alignElem;
	if (vers > 1 && vers < 7) {
		var node_y = tbl.ALIGN_MODUL_ARR[vers - 1][0];
		alignElem = makeAlignElem(node_y);
		moveInside(alignElem, alignPatternGr);
		return alignPatternGr;
	} else if (vers > 6) {

		var mathrixDim = tbl.ALIGN_MODUL_ARR[vers - 1].length;  // размер квадратной матрицы координат узлов узора

		var node_y, node_x;
		for (var i = 0; i < mathrixDim; i++) {
			for (var j = 0; j < mathrixDim; j++) {
				node_y = tbl.ALIGN_MODUL_ARR[vers - 1][i];
				node_x = tbl.ALIGN_MODUL_ARR[vers - 1][j];
				// пропускаем элементы, накладывающиеся на поисковый узор
				if (
					(i == 0 && j == 0 ) ||
						(i == 0 && j == mathrixDim - 1) ||
						(j == 0 && i == mathrixDim - 1)
					) continue;
				// вставить элемент
				alignElem = makeAlignElem(node_y, node_x);
				moveInside(alignElem, alignPatternGr);
			}
		}
	}

	function makeAlignElem(node_y, node_x) {
		node_x = node_x || node_y;
		var alignGr = aDoc.groupItems.add();

		var sq0 = alignGr.pathItems.rectangle(
			-node_y + 2, node_x - 2,
			5, 5
		);
		var sq1 = alignGr.pathItems.rectangle(
			-node_y + 1, node_x - 1,
			3, 3
		);
		var sq2 = alignGr.pathItems.rectangle(
			-node_y, node_x, 1, 1
		);
		sq0.stroked = sq1.stroked = sq2.stroked = false;
		sq0.fillColor = sq2.fillColor = COLOR_K;
		sq1.fillColor = COLOR_W;
		alignPatternBufer.push(alignGr.geometricBounds);
		return alignGr;
	}

	return alignPatternGr;
}
function addServiceInf() {
	var servInfGr = aDoc.groupItems.add();
	var versCodeGr, maskLevelCodeGr;
	maskLevelCodeGr = addMaskLevelCode();
	if (vers > 6) {
		versCodeGr = addVersCode();
	}
	function addVersCode() {
		var vcGr = aDoc.groupItems.add();
		var vcGrTop = aDoc.groupItems.add();
		var vcGrLeft = aDoc.groupItems.add();
		var vc_top, vc_left;
		vc_top = 0;
		vc_left = qrFullWidth - 19;
		var colorCount = 0;
		var thisBlock;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 6; j++) {
				thisBlock = vcGrTop.pathItems.rectangle(vc_top, vc_left, 1, 1);
				thisBlock.stroked = false;
				thisBlock.fillColor = setColor(tbl.CODE_VERS[vers - 1].slice(colorCount, colorCount + 1));
				vc_top--;
				colorCount++
			}
			vc_top = 0;
			vc_left++;
		}
		vc_top = 0;
		vc_left = qrFullWidth - 19;
		colorCount = 0;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 6; j++) {
				thisBlock = vcGrLeft.pathItems.rectangle(-vc_left, vc_top, 1, 1);
				thisBlock.stroked = false;
				thisBlock.fillColor = setColor(tbl.CODE_VERS[vers - 1].slice(colorCount, colorCount + 1));
				vc_top++;
				colorCount++
			}
			vc_top = 0;
			vc_left++;
		}
		alignPatternBufer.push(vcGrTop.geometricBounds);
		alignPatternBufer.push(vcGrLeft.geometricBounds);
		moveInside(vcGrTop, vcGr);
		moveInside(vcGrLeft, vcGr);
		return vcGr;
	}

	function addMaskLevelCode() {
		var mlcGr = aDoc.groupItems.add();
		var mlc_top, mlc_left;
		var thisBlock;
		var colorCounter;

		mlc_top = -FINDER_SIZE;
		mlc_left = 0;
		colorCounter = 0;
		for (var i = 0; i < 9; i++) {
			if (mlc_left == 6) {
				mlc_left++;
				continue;
			}
			thisBlock = mlcGr.pathItems.rectangle(mlc_top, mlc_left, 1, 1);
			thisBlock.stroked = false;
			thisBlock.fillColor = setColor(tbl.CODE_MASK_AND_LEVEL[eccLavel][maskNumb].slice(colorCounter, colorCounter + 1));
			mlc_left++;
			colorCounter++;
		}
		mlc_top = -FINDER_SIZE + 1;
		mlc_left = FINDER_SIZE
		for (var j = 0; j < 8; j++) {
			if (mlc_top == -6) {
				mlc_top++;
				continue;
			}
			thisBlock = mlcGr.pathItems.rectangle(mlc_top, mlc_left, 1, 1);
			thisBlock.stroked = false;
			thisBlock.fillColor = setColor(tbl.CODE_MASK_AND_LEVEL[eccLavel][maskNumb].slice(colorCounter, colorCounter + 1));
			mlc_top++;
			colorCounter++;
		}

		mlc_top = -qrWorkWidth + 1;
		mlc_left = FINDER_SIZE;
		colorCounter = 0; // начинается дублирующий блок => обниляем счетчик цвета
		for (var k = 0; k < 7; k++) {
			var thisBlock = mlcGr.pathItems.rectangle(mlc_top, mlc_left, 1, 1);
			thisBlock.stroked = false;
			thisBlock.fillColor = setColor(tbl.CODE_MASK_AND_LEVEL[eccLavel][maskNumb].slice(colorCounter, colorCounter + 1));
			mlc_top++;
			colorCounter++
		}
		mlc_top = -FINDER_SIZE;
		mlc_left = qrWorkWidth - FINDER_SIZE;
		for (var l = 0; l < 8; l++) {
			var thisBlock = mlcGr.pathItems.rectangle(mlc_top, mlc_left, 1, 1);
			thisBlock.stroked = false;
			thisBlock.fillColor = setColor(tbl.CODE_MASK_AND_LEVEL[eccLavel][maskNumb].slice(colorCounter, colorCounter + 1));
			mlc_left++;
			colorCounter++;
		}
		return mlcGr;
	}

	moveInside(maskLevelCodeGr, servInfGr);
	moveInside(versCodeGr, servInfGr);
	return servInfGr;
}
function setColor(str) {
	if (+str) {
		return COLOR_K;
	}
	return COLOR_W;
}
function addGuides() {
	var gGrVert = aDoc.groupItems.add();
	var gGr = aDoc.groupItems.add();
	var thisGuide;
	for (var i = 2; i < (qrFullWidth + 1) / 2 - 1; i++) {
		thisGuide = gGrVert.pathItems.add();
		if (i >= 6) {
			// alert('i==6');
			thisGuide.setEntirePath([
				[2 * i - WHITE_FRAME - 1, WHITE_FRAME],
				[2 * i - WHITE_FRAME - 1, -qrFullWidth + WHITE_FRAME]
			]);
		} else {
			thisGuide.setEntirePath([
				[2 * i - WHITE_FRAME, WHITE_FRAME],
				[2 * i - WHITE_FRAME, -qrFullWidth + WHITE_FRAME]
			]);
		}

		thisGuide.guides = true;
	}
	var gGrHoriz = gGrVert.duplicate();
	gGrVert.rotate(-90);

	moveInside(gGrVert, gGr);
	moveInside(gGrHoriz, gGr);

	return gGr;
}
function addDataModules() {
	var colGr = aDoc.groupItems.add();
	var top = -qrWorkWidth + 1;
	var left = qrWorkWidth - 1;
	var thisBlock;
	var colorCount = 0;
	var directSwitch = 1; // направление заполнения: 1 - вверх
	/**
	 определим три области для заполнения информацией:
	 правая область находится под правым поисковым узором
	 средняя область находится между левым и правым поисковым узором
	 левая область находится под левым поисковым узором
	 */
	var rightArea, midArea, leftArea;
	rightArea = {
		w: FINDER_SIZE,
		h: qrWorkWidth - FINDER_SIZE - 1,
		side: [qrWorkWidth - FINDER_SIZE, -FINDER_SIZE - 1, qrWorkWidth, -qrWorkWidth], // left,top,right,bootom
	}
	midArea = {
		w: qrWorkWidth - FINDER_SIZE * 2 - 1,
		h: qrWorkWidth,
		side: [FINDER_SIZE + 1, 0, qrWorkWidth - FINDER_SIZE, -qrWorkWidth], // left,top,right,bootom
	}
	leftArea = {
		w: FINDER_SIZE + 1,
		h: qrWorkWidth - FINDER_SIZE * 2 - 1,
		side: [0, -FINDER_SIZE - 1, FINDER_SIZE + 1, -qrWorkWidth + FINDER_SIZE], // left,top,right,bootom
	}
	addDataToFirstQR();

	function addDataToFirstQR() {
		// заполнение первой области
		for (var i = 0; i < rightArea.w / 2; i++) {
			fillColumn(rightArea.h);
		}
		// заполнение средней области
		for (var i = 0; i < midArea.w / 2; i++) {
			fillColumn(midArea.h);
		}
		// заполнение последней области
		top = leftArea.side[3] + 1;
		for (var i = 0; i < leftArea.w / 2 - 1; i++) {
			fillColumn(leftArea.h);
			if (left == 6) {
				left--;
			}
		}

	}

	function fillColumn(columnLength) {

		if (directSwitch) {
			fillToTop(columnLength)
		} else  fillToBottom(columnLength);
		directSwitch = (directSwitch + 3) % 2; // после завершения столбика переключаем направление заполнения

		return colGr;

	}

	function fillToBottom(colLength) {
		m1: for (var i = 0; i < colLength; i++) {
			m2:for (var j = 0; j < 2; j++) {
				if (top == -6) {
					top--;
					continue m1;
				}

				for (var k = 0; k < alignPatternBufer.length; k++) {
					for (var l = 0; l < alignPatternBufer[k].length; l++) {
						if ( // левый край выравнивающего эл-та
							left == alignPatternBufer[k][0] &&
								top <= alignPatternBufer[k][1] &&
								top > alignPatternBufer[k][3]
							) {
							left--;
							thisBlock = paintBlock();
							colorCount++;
							left++;
							top--;
							continue m1;
						} else if ( // правый край выравнивающего эл-та
							left >= alignPatternBufer[k][0] &&
								left < alignPatternBufer[k][2] &&
								top <= alignPatternBufer[k][1] &&
								top > alignPatternBufer[k][3]
							) {
							top--;
							continue m1;
						}
					}
				}
				thisBlock = paintBlock();
				left--;
				colorCount++;
			}
			left += 2;
			top--;
		}
		left -= 2;
		top++;
		return colGr;
	}

	function fillToTop(colLength) {
		m1: for (var i = 0; i < colLength; i++) {   // высота столбика
			m2: for (var j = 0; j < 2; j++) { // две колонки в столбике
				if (top == -6) {
					top++;
					continue m1;
				}
				for (var k = 0; k < alignPatternBufer.length; k++) { // количество выраввнивающих элементов
					for (var l = 0; l < 4; l++) {  // 4 стороны квадрата выыравнивающего элемента left, top, right, bottom
						if ( // левый край выравнивающего эл-та
							left == alignPatternBufer[k][0] &&
								top <= alignPatternBufer[k][1] &&
								top > alignPatternBufer[k][3]
							) {
							left--;
							thisBlock = paintBlock();
							colorCount++;
							left++;
							top++;
							continue m1;
						} else if ( // правый край выравнивающего эл-та
							left >= alignPatternBufer[k][0] &&
								left < alignPatternBufer[k][2] &&
								top <= alignPatternBufer[k][1] &&
								top > alignPatternBufer[k][3]
							) {
							top++;
							continue m1;
						}
					}
				}

				thisBlock = paintBlock();
				left--;
				colorCount++;
			}
			left += 2;
			top++;
		}
		left -= 2;
		top--;
		return colGr;
	}

	// размещение, раскрашивание и маскирование квадратика
	function paintBlock() {
		thisBlock = colGr.pathItems.rectangle(top, left, 1, 1);
		thisBlock.stroked = false;
		if (MASK(left, top, maskNumb) === 0) {
			thisBlock.fillColor = invertColor(setColor(finalBynStr.slice(colorCount, colorCount + 1)));
		} else {
			thisBlock.fillColor = setColor(finalBynStr.slice(colorCount, colorCount + 1));
		}
		return thisBlock;
	}

	function invertColor(color) {
		if (color == COLOR_K) {
			return COLOR_W;
		} else return COLOR_K;
	}

	return colGr;
}
function makeQr() {
	var newLayer = aDoc.layers.add();
	var randStr = "@" + (" " + (+new Date()) * Math.random() * 10000).slice(-7, -1);
	var qrGroup = newLayer.groupItems.add();
	qrGroup.name = 'qrCodeGroup' + randStr;
	newLayer.name = 'qr-' + randStr;

	var baseSq = makeBaseSq();
	var finders = makeFinders();
	var timingPattern = makeTimingAndDarkBloock();
	var alignPattern = makeAlignPattern();
	var servInf = addServiceInf();
	//var gGr = addGuides();
	var dataModules = addDataModules();

	moveInside(baseSq, qrGroup);
	moveInside(finders, qrGroup);
	moveInside(timingPattern, qrGroup);
	moveInside(alignPattern, qrGroup);
	moveInside(servInf, qrGroup);
	//moveInside(gGr, qrGroup);
	moveInside(dataModules, qrGroup);

	return qrGroup;
}

//------------------------------------------------------------------------>>
/**
 *  ИНТЕРФЕЙС
 */
function qr_interface(opts) {
	opts = opts || {};
	var dialTitle = opts.dialTitle || 'qr-code generator';
	var statText = 'Ваш текст (ctrl+enter для перехода на новую строку):';
	var editText = opts.editText;
	var editTextChars = opts.editTextCharacters || 100;

	var w = new Window('dialog', dialTitle, undefined, {closeButton: false});
	w.statText = w.add('statictext', undefined, statText);
	w.editText = w.add("edittext", [0, 0, 250, 150], "", {multiline: true});

	w.editText.text = editText;
	w.editText.characters = editTextChars;
	w.editText.multiline = true;
	w.editText.active = true;

	var eccLavelGr = w.add('group');
	w.statTxt = eccLavelGr.add('statictext', undefined, 'уровень коррекции ошибок:')
	w.eccLavelList = eccLavelGr.add('dropdownlist', undefined, [0, 1, 2, 3]);
	w.eccLavelList.selection = 1;


	w.buttonsGroup = w.add('group');
	w.buttonsGroup.orientation = 'row';
	w.okButt = w.buttonsGroup.add('button', undefined, 'Ok');
	w.canselButt = w.buttonsGroup.add('button', undefined, 'Cancel');

	// the event hendlers
	w.canselButt.addEventListener('click', function () {
		w.editText.text = null;
	})
	w.addEventListener('keydown', function (k) {
		if (k.keyName == 'Enter' && !k.ctrlKey) {
			w.close();
		} else if (k.keyName == 'Escape') {
			w.editText.text = null;
		}
	})
	w.show();
	return w;
}

//------------------------------------------------------------------------>>
/**
 *  ВСПОМОГАТЕЛЬНЫЕ Ф-ЦИИ
 */
/**
 * перемещает item внутрь target (чисто для удобства использования)
 * */
function moveInside(item, target) {
	if (target && item && target.typename == 'GroupItem' || target.typename == 'Layer') {
		item.move(target, ElementPlacement.INSIDE);
	}
	return target;
}


/**
 * таблицы (массивы) с константами
 *
 * */
/**
 * создает объект с табличными данными: значения порождающего многочлена, поле галуа, таблица вместимости кода и т.д.
 * @return {Object} _this - объект, в котором хранятся табличные даные для генератора
 */
function tables() {
	var _this = {};
	_this.CAPACITY_DATA = [     // вместимость кода, включая служебную информацию, но исключая биты корекции
		[152, 272, 440, 640, 864, 1088, 1248, 1552, 1856, 2192, 2592, 2960, 3424, 3688, 4184, 4712, 5176, 5768, 6360, 6888, 7456, 8048, 8752, 9392, 10208, 10960, 11744, 12248, 13048, 13880, 14744, 15640, 16568, 17528, 18448, 19472, 20528, 21616, 22496, 23648],
		[128, 224, 352, 512, 688, 864, 992, 1232, 1456, 1728, 2032, 2320, 2672, 2920, 3320, 3624, 4056, 4504, 5016, 5352, 5712, 6256, 6880, 7312, 8000, 8496, 9024, 9544, 10136, 10984, 11640, 12328, 13048, 13800, 14496, 15312, 15936, 16816, 17728, 18672],
		[104, 176, 272, 384, 496, 608, 704, 880, 1056, 1232, 1440, 1648, 1952, 2088, 2360, 2600, 2936, 3176, 3560, 3880, 4096, 4544, 4912, 5312, 5744, 6032, 6464, 6968, 7288, 7880, 8264, 8920, 9368, 9848, 10288, 10832, 11408, 12016, 12656, 13328],
		[72, 128, 208, 288, 368, 480, 528, 688, 800, 976, 1120, 1264, 1440, 1576, 1784, 2024, 2264, 2504, 2728, 3080, 3248, 3536, 3712, 4112, 4304, 4768, 5024, 5288, 5608, 5960, 6344, 6760, 7208, 7688, 7888, 8432, 8768, 9136, 9776, 10208]
	];
	_this.NUMBER_OF_BLOCKS = [    // таблица для определения числа блоков по уровню ECC-коррекции (строка) и номеру версии (столбец)
		[1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
		[1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
		[1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
		[1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
	];
	_this.GP = { //generator polinomials
		7: [87, 229, 146, 149, 238, 102, 21],
		10: [251, 67, 46, 61, 118, 70, 64, 94, 32, 45],
		13: [74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78],
		15: [8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105],
		16: [120, 104, 107, 109, 102, 161, 76, 3, 91, 191, 147, 169, 182, 194, 225, 120],
		17: [43, 139, 206, 78, 43, 239, 123, 206, 214, 147, 24, 99, 150, 39, 243, 163, 136],
		18: [215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98, 96, 153],
		20: [17, 60, 79, 50, 61, 163, 26, 187, 202, 180, 221, 225, 83, 239, 156, 164, 212, 212, 188, 190],
		22: [210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98, 80, 219, 134, 160, 105, 165, 231],
		24: [229, 121, 135, 48, 211, 117, 251, 126, 159, 180, 169, 152, 192, 226, 228, 218, 111, 0, 117, 232, 87, 96, 227, 21],
		26: [173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161, 21, 245, 142, 13, 102, 48, 227, 153, 145, 218, 70],
		28: [168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27, 232, 201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123],
		30: [41, 173, 145, 152, 216, 31, 179, 182, 50, 48, 110, 86, 239, 96, 222, 125, 42, 173, 226, 193, 224, 130, 156, 37, 251, 216, 238, 40, 192, 180]
	};
	_this.ECC_PER_BLOCK = [ //ecc words per block; column - version; rows - lavel
		[7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
		[10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
		[13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
		[17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
	];
	/**
	 *Поле Галуа и обратное Поле Галуа
	 */
	_this.G_F = [
		1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 1
	];
	_this.INVERS_G_F = [
		, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175
	];
	_this.ALIGN_MODUL_ARR = [
		[14],
		[18],
		[22],
		[26],
		[30],
		[34],
		[6, 22, 38],
		[6, 24, 42],
		[6, 26, 46],
		[6, 28, 50],
		[6, 30, 54],
		[6, 32, 58],
		[6, 34, 62],
		[6, 26, 46, 66],
		[6, 26, 48, 70],
		[6, 26, 50, 74],
		[6, 30, 54, 78],
		[6, 30, 56, 82],
		[6, 30, 58, 86],
		[6, 34, 62, 90],
		[6, 28, 50, 72, 94],
		[6, 26, 50, 74, 98],
		[6, 30, 54, 78, 102],
		[6, 28, 54, 80, 106],
		[6, 32, 58, 84, 110],
		[6, 30, 58, 86, 114],
		[6, 34, 62, 90, 118],
		[6, 26, 50, 74, 98, 122],
		[6, 30, 54, 78, 102, 126],
		[6, 26, 52, 78, 104, 130],
		[6, 30, 56, 82, 108, 134],
		[6, 34, 60, 86, 112, 138],
		[6, 30, 58, 86, 114, 142],
		[6, 34, 62, 90, 118, 146],
		[6, 30, 54, 78, 102, 126, 150],
		[6, 24, 50, 76, 102, 128, 154],
		[6, 28, 54, 80, 106, 132, 158],
		[6, 32, 58, 84, 110, 136, 162],
		[6, 26, 54, 82, 110, 138, 166],
		[6, 30, 58, 86, 114, 142, 170]
	];
	_this.CODE_VERS = [
		'0', '0', '0', '0', '0', '0',
		'000010011110100110', '010001011100111000', '110111011000000100', '101001111110000000',
		'001111111010111100', '001101100100011010', '101011100000100110', '110101000110100010',
		'010011000010011110', '011100010001011100', '111010010101100000', '100100110011100100',
		'000010110111011000', '000000101001111110', '100110101101000010', '111000001011000110',
		'011110001111111010', '001101001101100100', '101011001001011000', '110101101111011100',
		'010011101011100000', '010001110101000110', '110111110001111010', '101001010111111110',
		'001111010011000010', '101000011000101101', '001110011100010001', '010000111010010101',
		'110110111110101001', '110100100000001111', '010010100100110011', '001100000010110111',
		'101010000110001011', '111001000100010101'
	];
	 /**
		* Коды маски и уровня коррекции.
	 строка - уровень коррекции;	столбец - код маски (0-7);	элемент - код*/
	_this.CODE_MASK_AND_LEVEL = [
		['111011111000100', '111001011110011', '111110110101010', '111100010011101', '110011000101111', '110001100011000', '110110001000001', '110100101110110'],
		['101010000010010', '101000100100101', '101111001111100', '101101101001011', '100010111111001', '100000011001110', '100111110010111', '100101010100000'],
		['011010101011111', '011000001101000', '011111100110001', '011101000000110', '010010010110100', '010000110000011', '010111011011010', '010101111101101'],
		['001011010001001', '001001110111110', '001110011100111', '001100111010000', '000011101100010', '000001001010101', '000110100001100', '000100000111011']
	];
	return _this;
}
