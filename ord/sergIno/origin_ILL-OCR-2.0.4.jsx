/*
    ----------------------------------------------------------------------------    
    Скрипт для распознования векторных объектов в текст при помощи tesseract.exe
    20/08/2024 год
    Автор Сергей Иноземцев
    ryzl@hotmail.com
    skype: sergey.a.ino
    Inozpress Inc.
    ver. 2.0.4.0
    ----------------------------------------------------------------------------
*/
//@target illustrator
// БЛОК ОБЪЯВЛЕНИЯ ПЕРЕМЕННЫХ
var doc = app.activeDocument;
var selection = doc.selection;
var filePath = "~/AppData/Local/Temp/IllOCR.ini";
var illOCRFile = new File(filePath);
var W = new RGBColor(); // белый цвет для щита и окошка
    W.red = 255;
    W.green = 255;
    W.blue = 255;

var styleName = "OCR_STYLE"; // имя стиля абзаца присваемого распознанному тексту
var ocrStyle = getParagraphStyleByName(styleName);

if (!ocrStyle) // Создание стиля абзаца OCR_STYLE, если он не существует
{
    var redColor = new RGBColor();
    redColor.red = 255;
    redColor.green = 0;
    redColor.blue = 0;

    ocrStyle = doc.paragraphStyles.add(styleName);
    ocrStyle.name = styleName;
    ocrStyle.size = 9; // размер 9 pt
    ocrStyle.textFont = app.textFonts.getByName("MyriadPro-Regular");
    ocrStyle.fillColor = redColor;
    ocrStyle.leading = 0; // межстрочное расстояние - 0 - значит auto
}

if (!illOCRFile.exists) // Если Файл IllOCR.ini НЕ СУЩЕСТВУЕТ
    {
        SelectLanguages() // функция отображает два списка языков и записывает в файл IllOCR.ini список языков из переменной lngOCRkey
    }


// Проверяем, есть ли выделенные объекты
if (selection.length > 0) 
{
// Получение координат текстового фрейма по границам выделенных объектов
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
// Проходим по всем выделенным объектам
    for (var i = 0; i < doc.selection.length; i++) 
    {
        var selectedItem = doc.selection[i];
        var bounds = selectedItem.visibleBounds; // [left, top, right, bottom] // Получаем границы выделенного объекта
        if (bounds[0] < minX) minX = bounds[0]; // left // Обновляем минимальные и максимальные координаты
        if (bounds[1] > maxY) maxY = bounds[1]; // top
        if (bounds[2] > maxX) maxX = bounds[2]; // right
        if (bounds[3] < minY) minY = bounds[3]; // bottom
    }

    var currentArtboard = doc.artboards[doc.artboards.getActiveArtboardIndex()]; // Получаем текущий артборд
    var artboardRect = currentArtboard.artboardRect; // [left, top, right, bottom] // Получаем размеры артборда
    var widthAR = artboardRect[2] - artboardRect[0]; // ширина Artboard
    var heightAR = artboardRect[1] - artboardRect[3]; // высота Artboard
    var rectArt = doc.pathItems.rectangle(artboardRect[1], artboardRect[0], widthAR, heightAR); // Создаем прямоугольник с размерами артборда
    rectArt.fillColor = W // заливка белая
    var widthTmp = (maxX - minX); // ширина "окошка" для распознования
    var heighTmp = (minY - maxY); // высота "окошка" для распознования
    var rectTmp = doc.pathItems.rectangle(minY, minX, widthTmp, heighTmp); // прямоугольник окошка
    rectTmp.fillColor = W
    var increase = 1; // Увеличение в миллиметрах // Увеличиваем размеры окошка на 5 мм с каждой стороны для уверенного распознования на границах фрейма
    var increasePts = increase * 2.83465;     // Преобразуем миллиметры в пункты (1 мм ≈ 2.83465 pts)
    var newWidth = rectTmp.width + increasePts * 2; // Увеличиваем ширину на 1 мм с каждой стороны // Новые размеры
    var newHeight = rectTmp.height + increasePts * 2; // Увеличиваем высоту на 1 мм с каждой стороны // Новые размеры
    // Перемещаем прямоугольник так, чтобы он оставался по центру
    rectTmp.width = newWidth;
    rectTmp.height = newHeight;
    // Перемещаем его центр в исходное положение
    rectTmp.left -= increasePts; // Сдвигаем влево на 1 мм
    rectTmp.top += increasePts;   // Сдвигаем вверх на 1 мм
    doc.selection = [rectTmp, rectArt]; // выделяем окошко и прямоугольник размером с артбоард
    
    var group = doc.groupItems.add(); //группируем выделенные окошко и щит
    for (var i = 0; i < doc.selection.length; i++) 
        doc.selection[i].move(group, ElementPlacement.INSIDE);
    doc.selection = group // выделяем группу "окошко" и "щит"
    var myshild = app.executeMenuCommand('Live Pathfinder Minus Back'); // вырезаем в щите окошко
    var file = new File("~/AppData/Local/Temp/selected_objects.png");     // Определяем имя файла для сохранения изображения
    options = new ExportOptionsPNG24();
    options.antiAliasing = true;
	options.transparency = false; // true - прозрачность : false - без прозрачности
	options.artBoardClipping = true;
    options.verticalScale = 400; // 400 - чтобы читался мелкий шрифт
	options.horizontalScale = 400;        // 400 - чтобы читался мелкий шрифт
	doc.exportFile(file, ExportType.PNG24, options);    // экспорт файла в формате png с указанными опциями по указанному пути
    var inputFilePath = "~/AppData/Local/Temp/selected_objects.png"; // Путь к файлу png для распознования tesseract.exe
    var tesseractPath = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"; // Путь с установленным в систему tesseract.exe
    //var outputFilePath = "~/Desktop/output"; // Путь для выходного файла без расширения - переделать на путь ко временной директории пользователя
    var outputFilePath = "~/AppData/Local/Temp/selected_objects.png"; // Путь для выходного файла без расширения - переделать на путь ко временной директории пользователя



    // Преобразуем путь в Windows-формат
    inputFilePath = inputFilePath.replace("~", $.getenv("USERPROFILE"));
    outputFilePath = outputFilePath.replace("~", $.getenv("USERPROFILE"));

    // Прочитать переменную из lngOCRkey файла "~/AppData/Local/Temp/IllOCR.ini"
    illOCRFile.open("r");
    var fileContent = illOCRFile.read();
    illOCRFile.close();
    lngOCRkey = fileContent;     // Присваиваем значение из содержимого файла
    
    // Создаем команду для выполнения
    var command = '"' + tesseractPath + '" "' + inputFilePath + '" "' + outputFilePath + '"' + lngOCRkey; // создание команды для bat файла для выполнения команды tesseract.exe - Сделать выбор языков в панели CEP (два языка - Primary and Secondary)
    // Создаем временный файл для хранения команды
    var scriptFile = new File(Folder.temp + "/tesseract_command.bat");
    scriptFile.open("w");
    scriptFile.writeln(command); // запись команды в bat файл
    scriptFile.close();
    scriptFile.execute(); // Запускаем командный файл
    var outputTextFilePath = outputFilePath + ".txt";    // Путь к выходному файлу
    alert ("Please wait for tesseract to finish working and click OK"); // ДЛЯ ЗАДЕРЖКИ ВЫПОЛНЕНИЯ И ОЖИДАНИЯ ЗАПИСИ ТЕКСТА В ФАЙЛ
    var outputTextFile = new File(outputTextFilePath);     // Проверяем, существует ли выходной текстовый файл
    outputTextFile.open("r");     //Читаем текст из выходного файла
    var extractedText = outputTextFile.read(); // полученный текст после распознования
    // проверка ответа из tesseract на корректность, если ответ не текст то выдача предупреждения от этом
    
    function isValue(extractedText) 
    {
        return (extractedText !== undefined && extractedText != null && extractedText != '');
    }    
        if (!isValue(extractedText)) // // проверка ответа из tesseract на корректность (если неопределено, пустое или пробел), если ответ не текст то выдача предупреждения от этом
        {
            alert("The text is not recognized." + "\n" + "Please increase the size of the image" + "\n" + "or check the correct language selection.");
            var replaceLanguages = confirm("Do you want to change the recognition languages?"); //Хотите поменять языки распознавания?
            if (replaceLanguages) 
                {
                    // Замена языков распознавания
                    var filePath = "~/AppData/Local/Temp/IllOCR.ini";
                    var lngOCRkey;
                    // вызов функции если результат распознования не текст или пустой текст
                    SelectLanguages() // функция отображает два списка языков и записывает в файл IllOCR.ini список языков из переменной lngOCRkey
                }
            alert ("The language pair has been successfully changed \n Please try again") // Языковая пара успешно изменена
    }
// Удаление рабочих файлов 
    scriptFile.close(); //закрытие командного файла
    scriptFile.remove(); // удаление командного файла
    outputTextFile.close(); // закрытие файла с распознанным текстом
    outputTextFile.remove(); // удаление текстового файла с распознанным текстом
    file.remove(); // удаление файла с изображением
    doc.selection.myshild // выделение щита с окошком
    app.executeMenuCommand('cut'); // удаление щита с окошком
    
// Создание текстового фрейма и преобразование его как "Area Type"
    var rect = doc.pathItems.rectangle(minY, minX, maxX - minX + 3, minY - maxY); // расширяем на 3 от выделенного объекта
    var textFrame = doc.textFrames.areaText(rect);
    var myStyle = doc.paragraphStyles.getByName("OCR_STYLE"); // присвоение переменной имени стиля абзаца
    textFrame.contents = extractedText; // Присваиваем текстовому фрейму текст полученный из модуля распознования
// удалить двойные энтеры
    var newText = textFrame.contents.replace("/\n\n", "\n");
    textFrame.contents = newText;
    myStyle.applyTo(textFrame.textRange);        // присвоение стиля обзаца распознанному тексту
} 
    else 
    {
        alert("Please select the objects to execute the script.");
    }


// БЛОК ФУНКЦИЙ
function getParagraphStyleByName(styleName) // функция проверки существования стиля OCR_STYLE --------------------
{
    var styles = app.activeDocument.paragraphStyles;
    for (var i = 0; i < styles.length; i++) 
    {
        if (styles[i].name === styleName) 
        {
            return styles[i];
        }
    }
    return null;
}



// функция чтения и присваивания значений переменных для названий языков из списка -----------------------------------
function getHumanNames(options) 
{
    var names = [];
    for (var i = 0; i < options.length; i++) {
        names.push(options[i].name);
    }
    return names;
}


// Функция выбора языков из списка --------------------------------------------------
function SelectLanguages ()
{
    var dialog = new Window("dialog", "Select Languages");
        // Создание выпадающего списка с названиями переменных
        var languageOptions = 
        [
            {name: "Afrikaans", value: "afr" },
            {name: "Albanian", value: "sqi" },
            {name: "Amharic", value: "amh" },
            {name: "Arabic", value: "ara" },
            {name: "Armenian", value: "hye" },
            {name: "Assamese", value: "asm" },
            {name: "Azerbaijani - Cyrilic", value: "aze_cyrl" },
            {name: "Azerbaijani", value: "aze" },
            {name: "Basque", value: "eus" },
            {name: "Belarusian", value: "bel" },
            {name: "Bengali", value: "ben" },
            {name: "Bosnian", value: "bos" },
            {name: "Breton", value: "bre" },
            {name: "Bulgarian", value: "bul" },
            {name: "Burmese", value: "mya" },
            {name: "Catalan; Valencian", value: "cat" },
            {name: "Cebuano", value: "ceb" },
            {name: "Central Khmer", value: "khm" },
            {name: "Cherokee", value: "chr" },
            {name: "Chinese simplified", value: "chi_sim" },
            {name: "Chinese traditional", value: "chi_tra" },
            {name: "Corsican", value: "cos" },
            {name: "Croatian", value: "hrv" },
            {name: "Czech", value: "ces" },
            {name: "Danish", value: "dan" },
            {name: "Dhivehi", value: "div" },
            {name: "Dutch; Flemish", value: "nld" },
            {name: "Dzongkha", value: "dzo" },
            {name: "English Middle 1100-1500", value: "enm" },
            {name: "English", value: "eng" },
            {name: "Esperanto", value: "epo" },
            {name: "Estonian", value: "est" },
            {name: "Faroese", value: "fao" },
            {name: "Filipino", value: "fil" },
            {name: "Finnish", value: "fin" },
            {name: "French Middle ca.1400-1600", value: "frm" },
            {name: "French", value: "fra" },
            {name: "Galician", value: "glg" },
            {name: "Georgian - Old", value: "kat_old" },
            {name: "Georgian", value: "kat" },
            {name: "German Fraktur Latin", value: "deu_latf" },
            {name: "German", value: "deu" },
            {name: "Greek Ancient to 1453", value: "grc" },
            {name: "Greek Modern 1453-", value: "ell" },
            {name: "Gujarati", value: "guj" },
            {name: "Haitian; Haitian Creole", value: "hat" },
            {name: "Hebrew", value: "heb" },
            {name: "Hindi", value: "hin" },
            {name: "Hungarian", value: "hun" },
            {name: "Icelandic", value: "isl" },
            {name: "Indonesian", value: "ind" },
            {name: "Inuktitut", value: "iku" },
            {name: "Irish", value: "gle" },
            {name: "Italian - Old", value: "ita_old" },
            {name: "Italian", value: "ita" },
            {name: "Japanese", value: "jpn" },
            {name: "Javanese", value: "jav" },
            {name: "Kannada", value: "kan" },
            {name: "Kazakh", value: "kaz" },
            {name: "Kirghiz; Kyrgyz", value: "kir" },
            {name: "Korean vertical", value: "kor_vert" },
            {name: "Korean", value: "kor" },
            {name: "Kurdish Kurmanji", value: "kmr" },
            {name: "Lao", value: "lao" },
            {name: "Latin", value: "lat" },
            {name: "Latvian", value: "lav" },
            {name: "Lithuanian", value: "lit" },
            {name: "Luxembourgish", value: "ltz" },
            {name: "Macedonian", value: "mkd" },
            {name: "Malay", value: "msa" },
            {name: "Malayalam", value: "mal" },
            {name: "Maltese", value: "mlt" },
            {name: "Maori", value: "mri" },
            {name: "Marathi", value: "mar" },
            {name: "Math / equation detection module", value: "equ" },
            {name: "Mongolian", value: "mon" },
            {name: "Nepali", value: "nep" },
            {name: "Norwegian", value: "nor" },
            {name: "Occitan post 1500", value: "oci" },
            {name: "Orientation and script detection module", value: "osd" },
            {name: "Oriya", value: "ori" },
            {name: "Panjabi; Punjabi", value: "pan" },
            {name: "Persian", value: "fas" },
            {name: "Polish", value: "pol" },
            {name: "Portuguese", value: "por" },
            {name: "Pushto; Pashto", value: "pus" },
            {name: "Quechua", value: "que" },
            {name: "Romanian; Moldavian; Moldovan", value: "ron" },
            {name: "Russian", value: "rus" },
            {name: "Sanskrit", value: "san" },
            {name: "Scottish Gaelic", value: "gla" },
            {name: "Serbian - Latin", value: "srp_latn" },
            {name: "Serbian", value: "srp" },
            {name: "Sindhi", value: "snd" },
            {name: "Sinhala; Sinhalese", value: "sin" },
            {name: "Slovak", value: "slk" },
            {name: "Slovenian", value: "slv" },
            {name: "Spanish; Castilian - Old", value: "spa_old" },
            {name: "Spanish; Castilian", value: "spa" },
            {name: "Sundanese", value: "sun" },
            {name: "Swahili", value: "swa" },
            {name: "Swedish", value: "swe" },
            {name: "Syriac", value: "syr" },
            {name: "Tajik", value: "tgk" },
            {name: "Tamil", value: "tam" },
            {name: "Tatar", value: "tat" },
            {name: "Telugu", value: "tel" },
            {name: "Thai", value: "tha" },
            {name: "Tibetan", value: "bod" },
            {name: "Tigrinya", value: "tir" },
            {name: "Tonga", value: "ton" },
            {name: "Turkish", value: "tur" },
            {name: "Uighur; Uyghur", value: "uig" },
            {name: "Ukrainian", value: "ukr" },
            {name: "Urdu", value: "urd" },
            {name: "Uzbek - Cyrilic", value: "uzb_cyrl" },
            {name: "Uzbek", value: "uzb" },
            {name: "Vietnamese", value: "vie" },
            {name: "Welsh", value: "cym" },
            {name: "West Frisian", value: "fry" },
            {name: "Yiddish", value: "yid" },
            {name: "Yoruba", value: "yor" }
        ];

        var variable1List = dialog.add("dropdownlist", undefined, getHumanNames(languageOptions));
        variable1List.selection = 29; // значение в списке по умолчанию (eng - английский)

        var variable2List = dialog.add("dropdownlist", undefined, getHumanNames(languageOptions));
        variable2List.selection = 41; // значение в списке по умолчанию (ger - немецкий)

        // Кнопка OK
        var button = dialog.add("button", undefined, "OK");
        button.onClick = function() {
            var lng1 = languageOptions[variable1List.selection.index].value; // выбор первого языка
            var lng2 = languageOptions[variable2List.selection.index].value; // выбор второго языка
            var lngOCRkey = " -l " + lng1 + "+" + lng2; // формирование переменной для записи в файл INI
            
        // Write the value to IllOCR.ini file
                var illOCRFile = new File(filePath);
                illOCRFile.open("w");
                illOCRFile.write(lngOCRkey);
                illOCRFile.close();            
            
            dialog.close();
        };

        // Отображение диалогового окна
        dialog.show();
}