/*
Название: MakeCropMarksAI.jsx
Приложение для использования: Adobe Illustrator CS3, CS4, CS5, CS6
Версия: 1.4
Язык реализации (Среда): JavaScript (ExtendScript Toolkit 2)
Операционные системы (Платформы): PC, Macintosh (Windows, Mac OS)
Условия распространения: Бесплатно; На Ваш риск
Назначение: Создание меток реза
Функциональные ограничения: Не работает с выделенными направляющими
Примечание: Создается дополнительный файл MakeCropMarksAI.ini для хранения настроек  
в папке с приложением Adobe Illustrator
Техническая поддержка: Sergey-Anosov@yandex.ru
https://sites.google.com/site/dtpscripting
===================================================
Name: MakeCropMarksAI.jsx
Application to use with: Adobe Illustrator CS3, CS4, CS5, CS6
Version: 1.4
Program language (Environment): JavaScript (ExtendScript Toolkit 2)
Operating systems (Platforms): PC, Macintosh (Windows, Mac OS)
Distribution conditions: Freeware; At your own risk
Functions: Makes crop marks 
Functional limitations: Can not process selection containing guides
Note: Creates additional file MakeCropMarksAI.ini for setup data in the folder where
the application Adobe Illustrator is.
Technical support: Sergey-Anosov@yandex.ru
https://sites.google.com/site/dtpscripting
*/
// описание глобальных переменных
//
// название скрипта
var the_title = "MakeCropMarksAI";
// версия скрипта
var the_version = "1.4";
// активный документ
var AD; 
// активный слой
var AL; 
// выбранный слой
var SL;
// количество слоев в активном документе
var AD_LL;
// выделение в активном документе
var the_sel;
// количество объектов в выделении
var N_sel = 0; 
// границы выделенных объектов
var v_sel_left = new Array();//левые визуальные
var g_sel_left = new Array();//левые геометрические
var v_sel_right = new Array();//правые визуальные
var g_sel_right = new Array();//правые геометрические
var v_sel_top = new Array();//верхние визуальные
var g_sel_top = new Array();//верхние геометрические
var v_sel_bottom = new Array();// нижние визуальные
var g_sel_bottom = new Array();// нижние геометрические
// границы  выделенных объектов c учетом клип. масок
var NC_v_left = new Array();//левые визуальные
var NC_g_left = new Array();//левые геометрические
var NC_v_right = new Array();//правые визуальные
var NC_g_right = new Array();//правые геометрические
var NC_v_top = new Array();//верхние визуальные
var NC_g_top = new Array();//верхние геометрические
var NC_v_bottom = new Array();// нижние визуальные
var NC_g_bottom = new Array();// нижние геометрические
// наличие клип. масок влияющих на выделение
var CLIP = false;
// начальное значение для учета клип. маски
var CLIP_INI = false;
// массив объектов без клип. масок для отображения
var NO_CLIP_OBJ_TO_SHOW = new Array();
// делать с учетом клип. масок
var MAKE_BY_CLIP = false;
//  количество документов в иллюстраторе
var N_doc = 0; 
// основной диалог
var dlg; 
// выход если ошибка ввода
var exit_if_bad_input = false;
// выход если неподходящее выделение
var exit_if_bad_sel = false;
// дропдаун для выбора объектов для построения меток
var OBJ_DROP;
// дропдаун для выбора единиц измерения
var UNITS_DROP;
// дропдаун выбора границ объектов
var BOUNDS_DROP;
// дропдаун выбора слоя
var LAYER_DROP;
// выбранные направления
var DIR_SELECTED;
// нет открытых документов
var NO_DOC = false;
// цвет для меток
var REG;// 100% Registration
var WHITE;// 0% Registration
// объекты для построения меток
var OBJECTS_TO_MAKE;
// границы для построения меток
var BOUNDS_TO_MAKE;
// опция для геометрических размеров
var GEO_OPTION = "Geometric";
// опция для визуальных размеров
var VIS_OPTION = "Visible (consider objects stroke)";
// начальный индекс для границ
var BOUNDS_INI;
// массив всех меток
var ALL_MARKS = new Array();
// массив размеров (координат) уже сделанных меток
var L_MADE = new Array();// левый
var T_MADE = new Array();// верхний
var R_MADE = new Array();// правый
var B_MADE = new Array();// нижний
// массив цвета уже сделанных меток
var C_MADE = new Array();
// текстовое значение выбранных единиц
var UNITS_TEXT;
// активен ли дропдаун выбора границ
var B_DROP_ACTIVE = false;
// нет выбранных направлений для постоения меток
var NO_DIR = false;
// чекбоксы для выбора направлений для постоения меток
var cb_tl, cb_tc, cb_tr;
var cb_rt, cb_rc, cb_rb;
var cb_bl, cb_bc, cb_br;
var cb_lt, cb_lc, cb_lb;
// кнопка Uncheck all
var b_clear_all;
//кнопка Check all
var b_set_all;
// построение белого контура
var w_cont;
// начальное значение для построения белого контура
var W_CONT_INI;
// группировка после построения
var g_m;
// начальное значение группировки после построения
var g_m_ini;
// опция только метки
var M_ONLY_OPTION = "Marks only";
// опция метки и выделение
var M_SEL_OPTION = "Marks and selection";
// опция ничего не группировать
var NO_GR_OPTION = "Nothing";
// длина метки по вертикали
var LENGTH_VER;
// начальное значение длины метки по вертикали
var LENGTH_VER_INI;
// длина метки по горизонтали
var LENGTH_HOR;
// начальное значение длины метки по горизонтали
var LENGTH_HOR_INI;
// отступ по вертикали
var OFFSET_VER;
// начальное значение отступа по вертикали
var OFFSET_VER_INI;
// отступ по горизонтали
var OFFSET_HOR;
// начальное значение отступа по горизонтали
var OFFSET_HOR_INI;
// вылет объектов по вертикали
var BLEED_VER;
// начальное значение вылета объектов по вертикали
var BLEED_VER_INI;
// вылет объектов по горизонтали
var BLEED_HOR;
// начальное значение вылета объектов по горизонтали
var BLEED_HOR_INI;
// поле ввода для толщины линии
var str_w_ed_text;
// численное значение для толщины линии
var SW_NUM;
// начальное значение для толщины линии
var SW_NUM_INI;
// дропдаун для единиц измерения для толщины линии
var str_un_drop;
// начальный индекс для единиц измерения для толщины линии
var SW_UN_INI;
// ссылка на файл с настройками
var INI_FILE = new File();
// существует ли файл с настройками
var INI_EXISTS = true;
// ошибки при обращении к файлу с настройками
var INI_ERR = false;
// файловая система Windows
var WFS = false;
// точность сравнения координат
var PREC = 0.002;
// опция для одного объекта в выделении
var SEL_OBJ_OPTION = "Selected object";
// опция для каждого объекта в выделении
var EACH_OBJ_OPTION = "Each object in selection"; 
// опция для целого выделения
var ENTIRE_SEL_OPTION = "Entire selection";
// опция для артборда
var AB_OPTION = "Artboard";
// результат ввода в диалоге
var exit_if_bad_input = false;
// результат ввода толщины линии
var BAD_SW = false;
// результат ввода длины линий
var BAD_VAL_L = false;
// текст сообщения для ошибки ввода
var BAD_VAL_TEXT = "Bad value input!\n\n";
// текст условия для ошибки ввода
var CAN_NOT_BE = " can not be <= zero";
// опция миллиметры
var MM_TEXT = "mm";
// опция сантиметры
var CM_TEXT = "cm";
// опция пункты
var PT_TEXT = "pt";
// опция дюймы
var IN_TEXT = "in";
//
// вызов главной подпрограммы
main();
// окончание выполнения скрипта :)))
//
// блок описания подпрограмм
//
// главная подпрограмма
function main () 
{
	// вызываем проверку документа и выделения
	if ( CHECK_SELECTION() ) 
	{
		// получаем координаты выделенных объектов
		SELECTION_DIM();
		// если в порядке выделение и документ:
		// устанавливаем начальные значения параметров для диалога
		INI_READ();
		//создаем диалог
		dlg = new Window('dialog');
		// определяем файловую систему
		if(File.fs == "Windows") WFS = true;
		// заголовок диалога
		dlg.text = the_title + " v." +the_version; 
		dlg.childrenAlignment = 'center';
		//
		// ширина дропдаунов для выбора объектов, границ, слоя
		var DD_WIDTH = 90;
		// создание панели чекбоксов для выбора вариантов по направлению
		var mp = dlg.add('panel');
		var mp_left = 5;
		var mp_top = 5;
		var mp_right = 435;
		var mp_bottom = 197;
		mp.bounds = [mp_left, mp_top, mp_right, mp_bottom];
		// габариты чекбокса
		var cb_w = 20;
		var cb_h = 15;
		// шаг чекбоксов по горизонтали 
		var  cb_dx = 50;
		// шаг чекбоксов по вертикали 
		var  cb_dy = 50;
		// 
		// подпрограмма создания чекбокса
		function MAKE_CB( x, y, s, where )
		{
			var cb = where.add('checkbox');
			cb.value = s;
			var c_w = WM( 15, cb_w );
			cb.bounds = [x, y, x+c_w, y+cb_h];
			return cb;
		};// end MAKE_CB
		//
		// подпрограмма создания дропдауна
		function MAKE_DROP( where, x, y, w, h, arr , ini)
		{
			var d = where.add('dropdownlist');
			d.bounds = [x, y, x+w, y+h];
			for(var i=0; i < arr.length; i++) d.add('item', arr[i]);
			d.selection = ini;
			return d;
		};// end MAKE_DROP
		//
		// подпрограмма создания чекбокса в диалоге
		function MAKE_CB_DIAL( where, x, y, w, h, text, ini)
		{
			var c = where.add('checkbox');
			c.bounds = [x, y, x+w, y+h];
			c.text = text;
			c.value = ini;
			return c;
		};// end MAKE_CB_DIAL
		//
		// подпрограмма создания горизонтальной группы чекбоксов
		function HOR_CB_GROUP( x, y, where )
		{
			var cb_arr = new Array();
			var x_cb = x;
			var s = false;
			for( var i = 0; i < 3; i++ )
			{
				if( i == 0 ) var dx = WM( -3, 0);
				if( i == 1 ) var dx = WM( -6, -5);
				if( i == 2 ) var dx = WM( -10, -9);
				cb_arr[i] = MAKE_CB( x_cb+dx, y, s, where );
				x_cb = x_cb + cb_dx;
			};// for
			return cb_arr;
		};// end HOR_CB_GROUP
		//
		// подпрограмма создания вертикальной группы чекбоксов
		function VER_CB_GROUP( x, y, where )
		{
			var cb_arr = new Array();
			var y_cb = y;
			var s = false;
			for( var i = 0; i < 3; i++ )
			{
				if( i == 0) var dy = 0;
				if( i == 1) var dy = WM( -3, -2);
				if( i == 2) var dy = -5;
				cb_arr[i] = MAKE_CB( x,  y_cb+dy, s, where );
				y_cb = y_cb + cb_dy;
			};// for
			return cb_arr;
		};// end VER_CB_GROUP
		//
		// подпрограмма создания кнопки
		function MAKE_BUTTON(x, y, w, where, txt)
		{
			var b = where.add('button');
			var btn_h = 20;
			b.text = txt;
			b.bounds = [x, y, x+w, y+btn_h];
			return b;
		};// end MAKE_BUTTON
		//
		// подпрограмма создания блока выбора направлений
		function MAKE_DIRECTIONS(x, y)
		{
			var cb_arr = new Array();
			var top_bottom_dx = WM( 5, 0 );
			// left
			var left_dx = WM( 4, 0 );
			cb_arr = VER_CB_GROUP( x+2+left_dx, y+cb_h+2, mp );
			cb_lt = cb_arr[0]; cb_lc = cb_arr[1]; cb_lb = cb_arr[2]; 
			// top
			var top_dy = WM( 0, -1);
			cb_arr = HOR_CB_GROUP( x+cb_w+top_bottom_dx, y+top_dy, mp );
			cb_tl = cb_arr[0]; cb_tc = cb_arr[1]; cb_tr = cb_arr[2]; 
			// right
			var right_dx = WM( 1, 0 );
			cb_arr = VER_CB_GROUP( x + (cb_w+ cb_dx)*2-10+right_dx, y+cb_h+2, mp );
			cb_rt = cb_arr[0]; cb_rc = cb_arr[1]; cb_rb = cb_arr[2]; 
			// bottom
			var bottom_dy = WM( 1, 0 );
			cb_arr = HOR_CB_GROUP( x+cb_w+top_bottom_dx, y + (cb_h +cb_dy)*2 -  bottom_dy , mp );
			cb_bl = cb_arr[0]; cb_bc = cb_arr[1]; cb_br = cb_arr[2]; 
			// создаем плашку
			var rect = mp.add('panel');
			var s = 2;// отступ
			var rect_left = x+cb_w+s;
			var rect_top = y+cb_h+s;
			var rect_right = x + (cb_w-7+ cb_dx)*2-s+5;
			var rect_bottom = y + (cb_h +cb_dy)*2-s;
			rect.bounds = [rect_left, rect_top, rect_right, rect_bottom];
			var s_b = 10;
			var b_left = s_b;
			var b_top =  s_b;
			var b_w = 85;
			var b_w_dx = 33;
			var b_clear_all_y = 10;
			var button_dx = WM( 2, 0 );
			b_left = b_left - button_dx;
			// создаем кнопку снять все
			var UNCH_TEXT = WM( "Uncheck all", "Uncheck" );
			b_clear_all = MAKE_BUTTON( b_left, b_clear_all_y, b_w, rect, UNCH_TEXT );
			b_clear_all.onClick = B_CLEAR_ON_CLICK;
			//
			// подпрограмма реакции на нажатие кнопки Uncheck all
			function B_CLEAR_ON_CLICK()
			{
				SET_CB( false );
				return;
			};// end B_CLEAR_ON_CLICK
			//
			// создаем кнопку направления по умолчанию
			var b_dir_default_y = b_clear_all_y + b_w_dx;
			b_dir_default = MAKE_BUTTON( b_left, b_dir_default_y, b_w, rect, "Default" );
			b_dir_default.onClick = B_DIR_DEFAULT_ON_CLICK;
			//
			// подпрограмма реакции на нажатие кнопки Default
			function  B_DIR_DEFAULT_ON_CLICK()
			{
				cb_lt.value=cb_lb.value=
				cb_tl.value=cb_tr.value=
				cb_rt.value=cb_rb.value=
				cb_bl.value=cb_br.value= true;
				cb_lc.value=cb_tc.value=cb_rc.value=cb_bc.value=false;
				return;
			};// end B_DIR_DEFAULT_ON_CLICK
			//
			// создаем кнопку выделить все
			var b_set_all_y = b_dir_default_y + b_w_dx;
			b_set_all = MAKE_BUTTON( b_left, b_set_all_y, b_w, rect, "Check all" );
			b_set_all.onClick = B_SET_ON_CLICK;
			//
			// подпрограмма реакции на нажатие кнопки Check all
			function  B_SET_ON_CLICK()
			{
				SET_CB( true );
				return;
			};// end B_SET_ON_CLICK
			//
			// подпрограмма присвоения значений сразу всем чекбоксам
			function SET_CB( act )
			{
				cb_lt.value=cb_lc.value=cb_lb.value=
				cb_tl.value=cb_tc.value=cb_tr.value=
				cb_rt.value=cb_rc.value=cb_rb.value=
				cb_bl.value=cb_bc.value=cb_br.value=
				act;
				return;
			};// end SET_CB
			return;
		};// end MAKE_DIRECTIONS
		//
		// собственно создаем блок выбора направлений
		var make_dir_dy = WM( 0, 2 );
		MAKE_DIRECTIONS(mp_left, mp_top+make_dir_dy+2);
		//
		// подпрограмма создания панели ввода параметров
		function MAKE_PANEL(x, y, where, vert_ini, hor_ini, txt)
		{
			var h = 20;
			var w = 50;
			var w_txt = 45;
			var w_un = 30;
			var dx = 3;
			// text
			var txt_left = x, txt_top = y, txt_right = x+w_txt, txt_bottom = y+h; 
			var t = where.add('statictext');
			t.text = txt;
			t.bounds = [txt_left, txt_top, txt_right, txt_bottom];
			//
			// подпрограмма создания окна ввода с единицами
			function ED_TEXT(x_e, y_e, ini_txt, un_txt)
			{
				var et = where.add('edittext');
				var et_left = x_e, et_top = y_e, et_right = et_left+w, et_bottom = y_e+h;
				et.bounds = [et_left, et_top, et_right, et_bottom];
				et.text = ini_txt;
				//
				// подпрограмма реакции на ввод текста (в процессе)
				et.onChanging = function ()
				{
					digit_on_Changing( et, ini_txt, "0" );
					return;
				};// end  et_on_Changing
				//
				// подпрограмма реакции на ввод текста (окончание)
				et.onChange = function ()
				{
					digit_on_Change( et );
					return;
				};// end et.onChange
				//
				var un = where.add('statictext');
				var un_left = et_right+dx, un_top = y_e, un_right = un_left+w_un, un_bottom = y_e+h; 
				un.bounds = [un_left, un_top, un_right, un_bottom];
				un.text = un_txt;
				return [et, un];
			};// end ED_TEXT
			//
			var x_et_vert = x+w_txt+dx+0;
			var et_vert = ED_TEXT(x_et_vert, y, vert_ini, UNITS_TEXT);
			var et_hor = ED_TEXT(x_et_vert+90, y, hor_ini, UNITS_TEXT);
			return [et_vert, et_hor];
		};// end MAKE_PANEL
		//
		// подпрограмма позиционирования текста
		function TEXT_XY(x, y, w, where, txt)
		{
			var t = where.add('statictext');
			t.bounds = [x, y, x+w, y+18];
			t.text = txt;
			return;
		};// end TEXT_XY
		//
		// обработка поля ввода в процессе
		function digit_on_Changing( et, def, emp ) 
		// et - поле ввода
		// def - значение по умолчанию если ошибка ввода
		// emp - значение если пустое поле
		{
			// если была ошибка ввода
			if( exit_if_bad_input )
			{
				exit_if_bad_input = false;
				et.active = true;
			};// if
			// вызываем подпрограмму получения числа в процессе ввода
			var text_in = GET_NUMBER_ON_INPUT();
			//
			// подпрограмма получения числа из текстового ввода
			// в процессе ввода
			function GET_NUMBER_ON_INPUT() 
			{
				// текст в поле ввода
				var the_t = et.text;
				// если была ошибка ввода
				if( exit_if_bad_input )
				{
					 et.text = def;// присваиваем текст по умолчанию
					 exit_if_bad_input = false;
					 return et.text;
				};// if
				// результирующая строка
				var t = "";
				// текущий символ
				var t_i;
				// количество десятичных точек (запятых)
				var N_C = 0;
				// количество знаков плюс
				var N_P = 0;
				// количество знаков минус
				var N_M = 0;
				// ошибки ввода нет (пока :)))
				exit_if_bad_input = false;
				// цикл по входной строке
				for(var i=0; i < the_t.length; i++) 
				{
					// текущий символ
					t_i = the_t[i];
					// заменяем запятую на точку
					if( t_i == "," ) t_i = ".";
					// увеличиваем счетчик точек
					if( t_i == "." ) N_C = N_C +1;
					// увеличиваем счетчик минусов
					if( t_i == "-" ) N_M = N_M +1;
					// увеличиваем счетчик плюсов
					if( t_i == "+" ) N_P = N_P +1;
					// если символ не цифра, слишком много точек, плюсов-минусов
					// или плюсы-минусы не на месте
					if( ( (t_i != "-" &&  t_i != "+" &&  t_i != "."  ) &&  NO_DIGIT_SYMBOL( t_i ) ) || 
						  N_C>1 || ((N_M+N_P) > 1) || ( (t_i == "-" || t_i == "+") && i != 0)
					  ) 
					{
						// считаем, что ошибка ввода
						exit_if_bad_input = true;
						alert( "Bad number input!" );
						et.text = def;// присваиваем текст по умолчанию
						et.active = true;
						return et.text;
					};// if
					// формируем результирующую строку
					t = t + t_i;
				};// for i
				// если пустая строка в поле ввода
				if( t == "" )
				{
					et.text = emp;// присваиваем текст если пустое поле
				};// if
				return et.text;
			};// end GET_NUMBER_ON_INPUT			
			return;
		};// end digit_on_Changing
		//
		// обработка поля ввода по завершении
		function digit_on_Change( et ) 
		{
			// текст в поле ввода
			var txt = et.text;
			// требуется ли ноль в поле ввода
			var the_zero = false;
			// пустое поле, спецсимволы, ошибка ввода в поле ввода
			if( txt == ""  || txt == " " || txt == "-" || txt == "+"|| txt == "." || txt == "," || exit_if_bad_input ) 
			{
				 the_zero = true;
			};// if
			// не число в поле ввода
			if( isNaN( parseFloat (TEXT_TO_DIGIT ( txt )) ) ) 
			{
				the_zero = true;
			};// if
			// число равно нулю в поле ввода
			if( parseFloat (TEXT_TO_DIGIT ( txt )) == 0. ) 
			{
				the_zero = true;
			};// if	
			// если требуется ноль присваиваем его в поле ввода
			if( the_zero ) 
			{
				et.text = "0";
			};// if
			return;
		};// end digit_on_Change
		//
		// подпрограмма создания панели для опций
		function MAKE_OPTIONS_PANEL(x, y)
		{
			var VER_HOR_ARR = new Array();
			var w_vert = 70;
			var w_hor = 70;
			var y_vert_hor = y-3;
			var dx_vert = 50;
			var x_vert = x+ dx_vert;
			TEXT_XY(x_vert, y_vert_hor, w_vert, mp , "Vertical");
			var dx_hor = 20;
			var x_hor = x_vert + w_vert + dx_hor;
			TEXT_XY(x_hor, y_vert_hor, w_hor, mp, "Horizontal");
			var pan_x = x;
			var pan_y_0 =y + 20;
			var pan_dy = 24;
			// панель для длины
			var pan_y_length = pan_y_0-5;
			VER_HOR_ARR = MAKE_PANEL(pan_x, pan_y_length, mp, LENGTH_VER_INI, LENGTH_HOR_INI, "Length:");
			LENGTH_VER = VER_HOR_ARR[0][0];
			var LENGTH_VER_UN = VER_HOR_ARR[0][1];
			LENGTH_HOR = VER_HOR_ARR[1][0];
			var LENGTH_HOR_UN = VER_HOR_ARR[1][1];
			// панель для оффсета (отступа)
			var pan_y_offset = pan_y_length + pan_dy;
			VER_HOR_ARR = MAKE_PANEL(pan_x, pan_y_offset, mp, OFFSET_VER_INI, OFFSET_HOR_INI, "Offset:");
			OFFSET_VER = VER_HOR_ARR[0][0];
			var OFFSET_VER_UN = VER_HOR_ARR[0][1];
			OFFSET_HOR = VER_HOR_ARR[1][0];
			var OFFSET_HOR_UN = VER_HOR_ARR[1][1];
			// панель для вылета
			var pan_y_bleed = pan_y_offset + pan_dy;
			VER_HOR_ARR = MAKE_PANEL(pan_x, pan_y_bleed, mp, BLEED_VER_INI, BLEED_HOR_INI, "Bleed:");
			BLEED_VER = VER_HOR_ARR[0][0];
			var BLEED_VER_UN = VER_HOR_ARR[0][1];
			BLEED_HOR = VER_HOR_ARR[1][0];
			var BLEED_HOR_UN = VER_HOR_ARR[1][1];
			// дропдаун для основных единиц
			var pan_y_units = pan_y_bleed + pan_dy+1;
			var units_w = 35;
			TEXT_XY(pan_x, pan_y_units, units_w, mp , "Units:");
			var un_drop_h = 20;
			var un_drop_w = 55;
			var un_drop_left = pan_x+units_w+0;
			var un_drop_ini = GET_ACTIVE_UNITS()[1];
			un_drop = MAKE_DROP( mp, un_drop_left, pan_y_units, un_drop_w, un_drop_h, [MM_TEXT, CM_TEXT, PT_TEXT, IN_TEXT] , un_drop_ini );
			//
			// подпрограмма реакции на смену единиц измерения
			un_drop.onChange = function ()
			{
				LENGTH_VER_UN.text = LENGTH_HOR_UN.text = 
				OFFSET_VER_UN.text = OFFSET_HOR_UN.text = 
				BLEED_VER_UN.text = BLEED_HOR_UN.text = 
				UNITS_TEXT = un_drop.selection.text;
				return;
			};// end un_drop.onChanging
			//
			// чекбокс для учета клипмаски
			MAKE_BY_CLIP = MAKE_CB_DIAL( mp, un_drop_left+un_drop_w+3, pan_y_units, 150, un_drop_h, "Consider clipping mask", W_CONT_INI);
			if( !CLIP )
			{
				MAKE_BY_CLIP.enabled = MAKE_BY_CLIP.value = false
			}
			else
			{
				MAKE_BY_CLIP.value = CLIP_INI = true;
			};// if-else
			// панель для толщины линии
			var str_w_y = pan_y_units + pan_dy+1;
			str_w_txt_w = 90;
			TEXT_XY(pan_x, str_w_y+1, str_w_txt_w, mp , "Stroke weight:");
			str_w_ed_text = mp.add('edittext');
			var str_w_left = x + str_w_txt_w + 3;
			var str_w_ed_tex_w = 55;
			var str_w_right = str_w_left+str_w_ed_tex_w;
			str_w_ed_text.bounds = [str_w_left, str_w_y, str_w_right, str_w_y+22];
			str_w_ed_text.text = SW_NUM_INI;
			//
			// подпрограмма реакции на ввод толщины линии (в процессе)
			str_w_ed_text.onChanging = function ()
			{
				digit_on_Changing( str_w_ed_text, SW_NUM_INI, "0" );
				return;
			};// end sw_on_Changing
			//
			// подпрограмма реакции на ввод толщины линии (окончание)
			str_w_ed_text.onChange = function ()
			{
				digit_on_Change( str_w_ed_text );
				return;
			};// end str_w_ed_text.onChange
			//
			// единицы для толщины линии
			var str_un_drop_left = str_w_right +5;
			var str_un_drop_h = 20;
			var str_un_drop_w = 60;
			str_un_drop = MAKE_DROP( mp, str_un_drop_left, str_w_y, str_un_drop_w, str_un_drop_h, [MM_TEXT, CM_TEXT, PT_TEXT, IN_TEXT] , SW_UN_INI);
			// выбор для группировки
			var g_t = mp.add('statictext');
			g_t.text = "Group after: ";
			var g_m_w = 90;
			var g_m_left = pan_x, g_m_top = str_w_y+str_un_drop_h+5, g_m_right = g_m_left+g_m_w, g_m_bottom = g_m_top+20; 
			g_t.bounds = [g_m_left, g_m_top, g_m_right, g_m_bottom];
			g_m = mp.add('dropdownlist');
			// опция не группировать ничего
			g_m.add('item', NO_GR_OPTION);
			// опция группировать только метки
			g_m.add('item', M_ONLY_OPTION);
			// если есть выделение опция группировать метки и выделение
			if( N_sel > 0 ) g_m.add('item', M_SEL_OPTION);
			var g_m_left_d = g_m_right+3;
			var g_m_right_d = g_m_left_d + 120;
			g_m.bounds = [g_m_left_d, g_m_top, g_m_right_d, g_m_top + 20];
			// если начальная опция группировать метки и выделение
			// но в документе нет выделения начальную опцию ставим 
			// группировать только метки
			if( g_m_ini == 2 && N_sel == 0 ) g_m_ini = 1;
			g_m.selection = g_m_ini;
			// чекбокс для белого контура
			var w_cont_left = pan_x, w_cont_top = g_m_bottom+1;
			var w_cont_w = 200, w_cont_h = 22;
			w_cont = MAKE_CB_DIAL( mp, w_cont_left,  w_cont_top,w_cont_w, w_cont_h, "White contour around mark", W_CONT_INI);
			return;
		};// end MAKE_OPTIONS_PANEL
		//
		// осбственно создаем панель опций
		 MAKE_OPTIONS_PANEL(175, 5)
		//
		// подпрограмма создания линиии
		function MAKE_LINE_DIAL() 
		{
			var the_line = dlg.add('panel');
			the_line.bounds = [mp_left, undefined, mp_right, undefined];
			return;
		};// end MAKE_LINE_DIAL
		//
		// создаем группу для выбора объектов и границ
		// как строка внизу
		var OBJ_BOUNDS = dlg.add('group');
		OBJ_BOUNDS.orientation = 'row';
		OBJ_BOUNDS.alignChildren = 'center';
		// 
		// создаем группу выбора объектов слева
		OBJ_GROUP = OBJ_BOUNDS.add('group');
		OBJ_GROUP.orientation = 'row';
		var OBJ_GROUP_TEXT = OBJ_GROUP.add('statictext');
		OBJ_GROUP_TEXT.text = "Object(s):";
		var OBJ_DROP = OBJ_GROUP.add('dropdownlist');
		OBJ_DROP.minimumSize.width = 
		OBJ_DROP.maximumSize.width = DD_WIDTH;
		OBJ_DROP.onChange = OBJ_DROP_ON_CHANGE;
		//
		// подпрограмма деактивации дропдауна выбора вида границ
		function OBJ_DROP_ON_CHANGE() 
		{
			// если объект для построения меток артборд 
			if( OBJ_DROP.selection.text == AB_OPTION ) 
			{
				// деактивируем выбор границ
				 DROP_ACTIVE_DEACTIVE( B_DROP, false );
				 // если был учет клипмасок отключаем чекбокс 
				 if( CLIP && MAKE_BY_CLIP.enabled)
				{
					// запоминаем начальное значение
					CLIP_INI = MAKE_BY_CLIP.value;
					// деактивируем чекбокс
					MAKE_BY_CLIP.value = MAKE_BY_CLIP.enabled = false;
				};// if
			} 
			// если объект для построения меток НЕ артборд 
			else 
			{
				// активируем выбор границ
				DROP_ACTIVE_DEACTIVE( B_DROP, true );
				 // если был учет клипмасок включаем чекбокс 
				if( CLIP && !MAKE_BY_CLIP.enabled)
				{
					// активируем чекбокс
					MAKE_BY_CLIP.enabled = true;
					// присваиваем начальное значение
					MAKE_BY_CLIP.value = CLIP_INI;
				};// if
			};// if-else
			return;
		};// end OBJ_DROP_ON_CHANGE
		//
		// подпрограмма деактивации / активации списка
		function DROP_ACTIVE_DEACTIVE( the_drop, act ) 
		{
			var NA;
			if( !act ) 
			{
				if( !the_drop.enabled ) return;
				NA = the_drop.add('item', "N/A");
				NA.selected = true;
				the_drop.enabled = false;
			} 
			else 
			{
				try 
				{
					if( the_drop.enabled ) return;
					the_drop.remove(  the_drop.items[the_drop.items.length-1]  );
					the_drop.items[0].selected = true;
					the_drop.enabled = true;
				} catch ( error ) {};
			};// if-else
			return;
		};// end DROP_ACTIVE_DEACTIVE
		//
		// если выделены объекты предлагаем выбор границ
		if( N_sel > 0 ) 
		{
			// создаем группу выбора границ
			B_GROUP = OBJ_BOUNDS.add('group');
			B_GROUP.orientation = 'row';
			B_DROP_ACTIVE = true;
			var B_GROUP_TEXT = B_GROUP.add('statictext');
			B_GROUP_TEXT.text = "Bounds:";
			var B_DROP = B_GROUP.add('dropdownlist');
			B_DROP.minimumSize.width =
			B_DROP.maximumSize.width = DD_WIDTH;
			B_DROP.add('item', GEO_OPTION);
			B_DROP.add('item', VIS_OPTION );
			B_DROP.selection = BOUNDS_INI;
		};// if
		 //
		 // создаем группу выбора слоя
		 if( AD_LL > 1 ) 
		 {
			var LAY_GROUP = OBJ_BOUNDS.add('group');
			LAY_GROUP.orientation = 'row';
			var LAY_GROUP_TEXT = LAY_GROUP.add('statictext');
			LAY_GROUP_TEXT.text = "Layer:";
			var LAY_DROP = LAY_GROUP.add('dropdownlist');
			LAY_DROP.minimumSize.width =
			LAY_DROP.maximumSize.width = DD_WIDTH - WM( 13, 17 );
			for( var i=0; i < AD_LL; i++ )
			{
				var the_lay = LAY_DROP.add('item', AD.layers[i].name);
				if( AD.layers[i] == AL ) the_lay.selected = true;
			};// for
		};// if
		//
		// если есть выделенные объекты
		if( N_sel > 0 ) 
		{
			// только один объект
			if( N_sel == 1 ) OBJ_DROP.add('item', SEL_OBJ_OPTION);
			// если больше одного объекта
			if( N_sel >= 2 ) 
			{
				OBJ_DROP.add('item', ENTIRE_SEL_OPTION);
				OBJ_DROP.add('item', EACH_OBJ_OPTION);
			};// if
		};// if
		OBJ_DROP.add('item', AB_OPTION);
		//
		OBJ_DROP.selection = 0;
		//
		MAKE_LINE_DIAL();
		// 
		// создание панели кнопок (кнопка ОК, кнопка Cancel)
		dlg.okPanel = dlg.add('group');
		dlg.okPanel.orientation = 'row';
		dlg.okPanel.okBtn = dlg.okPanel.add('button', undefined, 'OK');// кнопка ОК
		dlg.okPanel.cancelBtn =dlg.okPanel.add('button',undefined, 'Cancel');// кнопка Cancel
		//
		// собственно показываем окно диалога
		var DIALOG_BUTTON = dlg.show();
		// если выбрана первая кнопка (ОК) выполняем построение напр.
		if (DIALOG_BUTTON == 1) 
		{
			// объекты
			OBJECTS_TO_MAKE =  OBJ_DROP.selection.text;
			// направления
			cb_lt = cb_lt.value; cb_lc = cb_lc.value; cb_lb = cb_lb.value;
			cb_tl = cb_tl.value; cb_tc =cb_tc.value; cb_tr =cb_tr.value;
			cb_rt = cb_rt.value; cb_rc = cb_rc.value; cb_rb =cb_rb.value;
			cb_bl = cb_bl.value; cb_bc =cb_bc.value; cb_br =cb_br.value;
			// длина по вертикали
			LENGTH_VER_INI = LENGTH_VER.text;
			LENGTH_VER = TEXT_TO_POINTS( LENGTH_VER_INI, UNITS_TEXT ); 
			// длина по горизонтали
			LENGTH_HOR_INI = LENGTH_HOR.text;
			LENGTH_HOR = TEXT_TO_POINTS( LENGTH_HOR_INI, UNITS_TEXT );
			// отступ (офсет) по вертикали
			OFFSET_VER_INI = OFFSET_VER.text;
			OFFSET_VER = TEXT_TO_POINTS( OFFSET_VER_INI, UNITS_TEXT ); 
			// отступ (офсет) по горизонтали
			OFFSET_HOR_INI =OFFSET_HOR.text;
			OFFSET_HOR = TEXT_TO_POINTS( OFFSET_HOR_INI, UNITS_TEXT );
			// вылет по вертикали
			BLEED_VER_INI = BLEED_VER.text;
			BLEED_VER = TEXT_TO_POINTS( BLEED_VER_INI, UNITS_TEXT  ); 
			// вылет по горизонтали
			BLEED_HOR_INI = BLEED_HOR.text;
			BLEED_HOR = TEXT_TO_POINTS( BLEED_HOR_INI, UNITS_TEXT );
			// толщина линии
			SW_UN_INI = str_un_drop.selection.index;
			SW_NUM =  TEXT_TO_POINTS ( str_w_ed_text.text, GET_UNITS_DROP( SW_UN_INI ) );
			// проверяем введенные значения длины
			if( LE_ZERO( LENGTH_VER ) || LE_ZERO( LENGTH_HOR ) ) 
			{
				BAD_VAL_L = true;
				BAD_VAL_TEXT =  BAD_VAL_TEXT+ "Crop mark length"+ CAN_NOT_BE + "\n";
			};// if
			// проверяем введенное значение толщины линии
			if( LE_ZERO( SW_NUM ) ) 
			{
				BAD_SW = true;
				BAD_VAL_TEXT = BAD_VAL_TEXT + "Stroke weight" + CAN_NOT_BE + "\n";
			};// if
			// если есть ошибки ввода выход
			if( BAD_VAL_L || BAD_SW ) 
			{
				alert( BAD_VAL_TEXT );
				return;
			};// if
			// белый контур
			w_cont = w_cont.value;
			// группировка меток и выделения
			g_m_ini = g_m.selection.index;
			g_m = g_m.selection.text;
			// границы объектов для построения
			// если есть выделенные объекты берем опцию из дропдауна границ
			if( N_sel > 0 ) BOUNDS_TO_MAKE = B_DROP.selection.text
			// если нет выделения ставим геометрические границы (формально)
			else BOUNDS_TO_MAKE = GEO_OPTION;
			// если в документе слоев больше одного
			if( AD_LL > 1 ) 
			{
				// выбираем слой для построения меток из дропдауна выбора слоев
				SL = AD.layers[LAY_DROP.selection.index];
			};// if
			// учет клип. маски
			if( CLIP ) MAKE_BY_CLIP = MAKE_BY_CLIP.value;
			// 
			// выполнение операции построения меток
			OPERATION();
			// записываем начальные значения в файл
			INI_WRITE();
		};// if DIALOG_BUTTON == 1
	};// if CHECK_SELECTION()
	return;
};//end main()
//
// продпрограмма выполнения скрипта (в диалоге был ОК)
function OPERATION() 
{
	// проверяем есть ли выбранные направления
	var the_dir = cb_lt+cb_lc+cb_lb+
						 cb_tl+cb_tc+cb_tr+
						 cb_rt+cb_rc+cb_rb+
						 cb_bl+cb_bc+cb_br;
	if( the_dir == 0 ) 
	{
		alert("No directions were chosen!");
		return;
	};
	//
	// подпрограмма присвоения Registration через имя
	function GET_REG_BY_NAME( the_name )
	{
		REG = AD.swatches.getByName(the_name).color;
		WHITE = AD.swatches.getByName(the_name).color;
		return;
	};// end GET_REG_BY_NAME
	//
	// создаем цвета Registration
	// будем пытаться напрямую обратиться к цвету Registration
	// если будет ошибка, будем считать, что приложение неанглийское 
	// или файл создан неанглийским Иллюстратором
	//
	// имя спота Registration для английской версии
	var REG_NAME_ENGLISH = "[Registration]";
	// пытаемся присваивать английское имя
	try
	{
		GET_REG_BY_NAME( REG_NAME_ENGLISH );
	}
	// если ошибка значит неанглийский Иллюстратор 
	// или документ из неанглийского Иллюстратора
	catch ( error )
	{
		// найден ли спот приводки в спотах документа
		var REG_FOUND = false;
		try
		{
			// цикл по спотам в документе 
			for( var i = 0; i < AD.spots.length; i++ )
			{
				// текущий спот
				var the_spot = AD.spots[i];
				// имя спота
				var the_spot_name = the_spot.name;
				// цветовая модель спота
				var the_type = the_spot.colorType;
				// если цветовая модель Registration
				if( the_type == ColorModel.REGISTRATION )
				{
					// если первый символ имени "["  и последний символ имени "]"
					if( the_spot_name[0] == "[" && the_spot_name[the_spot_name.length-1] == "]")
					{
						// получаем неанглийский спот для приводки
						GET_REG_BY_NAME( the_spot_name );
						REG_FOUND = true;
					};// if
				};// if
			};// for i
		}
		catch( error ) { };// try-catch
		// если была ошибка или не найдено в спотах
		// создаем новый спот для Registration
		if( !REG_FOUND )
		{
			var NEW_REG = AD.spots.add();
			NEW_REG.colorType = ColorModel.REGISTRATION;
			NEW_REG.name = REG_NAME_ENGLISH;
			var NEW_REG_NAME = NEW_REG.name;
			GET_REG_BY_NAME( NEW_REG_NAME );
		};// if
	};// try-catch
	// даем 100% оттенок для основного Registration
	REG.tint = 100;
	// White (0% of Registration)
	WHITE.tint = 0;
	// открываем выбранный слой
	if( !SL.visible ) SL.visible = true;
	if( SL.locked ) SL.locked = false;
	//
	// начинаем выполнение команд из диалога
	//
	// если объект для построения - артборд
	if( OBJECTS_TO_MAKE == AB_OPTION)
	{
		// запоминаем начало координат
		AD_rulerOrigin = AD.rulerOrigin;
		// ставим начало координат в ноль
		AD.rulerOrigin = [0., 0.];
		// строим метки для артборда
		MARKS( 0., AD.height, 0., AD.width);
		// восстанавливаем старое начало координат
		AD.rulerOrigin = AD_rulerOrigin;
	};// if Artboard
	//
	//  если объект для построения - 
	// выделениие целиком или каждый объект в выделении или только один выделенный объект
	//
	if( OBJECTS_TO_MAKE == ENTIRE_SEL_OPTION || 
		 OBJECTS_TO_MAKE == EACH_OBJ_OPTION || 
		 OBJECTS_TO_MAKE == SEL_OBJ_OPTION)
	{
		// массивы координат в зависимости от границ
		var top_arr = new Array();
		var left_arr = new Array();
		var bottom_arr = new Array();
		var right_arr = new Array();
		// геометрические границы
		if( BOUNDS_TO_MAKE == GEO_OPTION )
		{
			// если учитываем клип. маску
			if( MAKE_BY_CLIP )
			{ top_arr = NC_g_top; left_arr = NC_g_left;  bottom_arr = NC_g_bottom; right_arr = NC_g_right }
			// если НЕ учитываем клип. маску
			else
			{ top_arr = g_sel_top; left_arr = g_sel_left;  bottom_arr = g_sel_bottom; right_arr = g_sel_right };
		} 
		// визуальные границы
		else 
		{
			// если учитываем клип. маску
			if( MAKE_BY_CLIP )
			{ top_arr = NC_v_top; left_arr = NC_v_left;  bottom_arr = NC_v_bottom; right_arr = NC_v_right }
			// если НЕ учитываем клип. маску
			else
			{ top_arr = v_sel_top; left_arr = v_sel_left;  bottom_arr = v_sel_bottom; right_arr = v_sel_right };
		};// if-else
	};// if
	//
	// выделение целиком или выделен только один объект
	if( OBJECTS_TO_MAKE == ENTIRE_SEL_OPTION || OBJECTS_TO_MAKE == SEL_OBJ_OPTION)
	{
		var the_top = MAX_IN_ARRAY( top_arr);
		var the_left = MIN_IN_ARRAY( left_arr );
		var the_bottom = MIN_IN_ARRAY( bottom_arr );
		var the_right = MAX_IN_ARRAY( right_arr );
		MARKS( the_left, the_top, the_bottom, the_right);
	};// if Entire selection Selected object
	//
	// каждый выделенный объект
	if( OBJECTS_TO_MAKE == EACH_OBJ_OPTION )
	{
		// цикл по объектам в выделении
		for( var i = 0; i < N_sel; i++ ) 
		{
			MARKS( left_arr[i], top_arr[i], bottom_arr[i], right_arr[i] );
		};// for
	};// if Each object in selection
	//
	// ошибка при группировке
	var g_err = false;
	// если задана группировка меток
	if( g_m == M_ONLY_OPTION || g_m == M_SEL_OPTION )
	{
		// сначала группируем метки
		try
		{
			// если меток больше одной
			if( ALL_MARKS.length > 1 ) 
			{
				// создаем группу для меток на выбранном слое
				var G_M = SL.groupItems.add();
				// цикл по меткам
				for( var i=0; i < ALL_MARKS.length; i++ ) 
				{
					// добавляем метки в группу
					ALL_MARKS[i].move(G_M, ElementPlacement.INSIDE);
				};// for
			}
			// если метка только одна
			else 
			{
				// тогда эта метка как бы группа меток :)))
				var G_M = ALL_MARKS[0];
			};// if-else
		} 
		catch ( error ) 
		{  
			g_err = true 
		};// try-catch
	};// if M_ONLY_OPTION or M_SEL_OPTION
	// если задана группировка меток и выделения
	// группируем метки и выделение
	if( g_m == M_SEL_OPTION)
	{
		// снимаем старое выделение
		app.selection = null;
		// группируем выделение
		try
		{
			// если в выделении только один объект
			if( N_sel == 1 )  
			{
				// тогда этот объект как бы группа объктов в выделении :)))
				var G_S = the_sel[0];
			}
			// если в выделении больше одого объекта
			else 
			{
				// создаем группу для выделенных объектов на выбранном слое
				var G_S = SL.groupItems.add();
				// цикл по объектам в выделении
				for( var i=0; i < N_sel; i++ ) 
				{
					// добавляем выделенные объекты в группу
					the_sel[i].move(G_S, ElementPlacement.INSIDE);
				};// for
			};// if-else
		} catch ( error ) {  g_err = true };
		// группируем выделение и метки
		try
		{
			var G = SL.groupItems.add();
			G_S.move(G, ElementPlacement.INSIDE);
			G_M.move(G, ElementPlacement.INSIDE);
		} catch ( error ) {  g_err = true };
		// выделяем новую группу
		try
		{
			G.selected = true;
		} catch ( error ) {  g_err = true };
	};// if Marks and selection
	// если была ошибка группировки
	if( g_err )
	try
	{
		alert("Can not group!");
		// восстанавливаем старое выделение в документе
		app.selection = the_sel;
	} catch ( error ) {};
	return;
};// end OPERATION()
//
// подпрограмма проверки выделения
function CHECK_SELECTION() 
{
	// есть ли открытые документы
	N_doc = app.documents.length;
	if (N_doc < 1 ) 
	{
		alert( "There are no open documents!");
		NO_DOC = true;
		return false;
	};// if
	// активный документ
	AD = app.activeDocument;
	// активный слой
	AL = AD.activeLayer;
	// выделение в активном документе
	the_sel = AD.selection;
	// количество объектов в активном документе
	N_sel = the_sel.length;
	// выбранный слой
	SL = AL;
	// количество слоев в активном документе
	AD_LL = AD.layers.length;
	// есть ли направляющие в выделении
	if( GUIDES_IN_SELECTION() ) 
	{
		 alert("There are some selected guides!"+"\n"+"Can not process that!");
		 exit_if_bad_sel = true;
		 return false;
	};// if
	// проверка на выделение объектов белой стрелкой
	var WHITE_ARROW = false;
	for( var i=0; i < N_sel; i++ ) 
	{
		if( SELECTED_IN_GROUP(the_sel[i]) ) 
		{
			WHITE_ARROW = true;
		};// if
	};// for
	if( WHITE_ARROW ) 
	{
		if(!confirm("Most likely White arrow (Direct selection tool)\nwas used to select the object(s). Black arrow (Selection tool)\nin this case is recommended.\n\nContinue anyway?")) return false;
	};//
	//получаем размеры выделения
	SELECTION_DIM();
	// если непригодное выделение тогда выход
	if( exit_if_bad_sel ) 
	{
		alert("Can not process the selection!");
		return false;
	};// if
	// получаем единицы измерения в документе
	UNITS_TEXT = GET_ACTIVE_UNITS()[0];
	// дополняем опцию для каждого объекта в выделении
	EACH_OBJ_OPTION = EACH_OBJ_OPTION +" ("+N_sel+" objects)";
	// дополняем опцию для артборда
	try
	{
		// если версия программы позволяет создавать атрборды
		if( AD.hasOwnProperty("artboards") )
		{
			// если в активном документе больше 1 артборда
			if( AD.artboards.length > 1 )
			{
				// получаем имя активного артборда
				var AB_NAME = unescape( AD.artboards[ AD.artboards.getActiveArtboardIndex() ].name );
				// добавляем имя атборда к опции для артборда
				AB_OPTION = AB_OPTION +" ("+ AB_NAME + ")";
			};// if
		};// if
	} catch ( error ) {};// try-catch
	return true;
}// end CHECK_SELECTION()
//
// подпрограмма проверки выделен ли объект
// в группе белой стрелкой
function SELECTED_IN_GROUP( the_obj ) 
{
	try 
	{
		var the_parent = the_obj.parent;
		if( the_parent.constructor.name == "GroupItem" ) return true;
	} catch ( error ) { };
	return false;
};// end SELECTED_IN_GROUP
//
// подпрограмама поиска направляющих в выделении
function GUIDES_IN_SELECTION() 
{
	// подпрограмма поиска направляющих внутри объекта
	function GUIDES_INSIDE( the_obj ) 
	{
		if( IS_GUIDE( the_obj ) ) return true;
		try 
		{
			// цикл по составным частям объекта
			for( var i =0; i < the_obj.pageItems.length; i++ ) 
			{
				if( GUIDES_INSIDE( the_obj.pageItems[i] ) ) return true;
			};// for
		} catch( error) {};
		return false;
	};// end GUIDES_INSIDE
	//
	// цикл по объектам в выделении
	for( var i=0; i < the_sel.length; i++ )
	{
		if( GUIDES_INSIDE( the_sel[i] ) ) return true;
	};// for
	return false;
};// end GUIDES_IN_SELECTION
//
// подпрограмма вычисления размеров выделения
function SELECTION_DIM() 
{
	// начальное присвоение крайних значений
	// для каждого объекта в выделении
	for(var i=0; i < N_sel; i++) 
	{
		var the_obj = the_sel[i];
		// получаем общие границы выделенного объекта
		var sel_bounds = new Array();
		sel_bounds = SEL_BOUNDS ( the_obj );
		if( sel_bounds == false ) 
		{
			exit_if_bad_sel = true;
			return;
		};// if
		if( IS_GUIDE(the_obj) ) return;
		// геометрические
		g_sel_left[i] = sel_bounds[0];
		g_sel_top[i] =  sel_bounds[1];
		g_sel_right[i] =  sel_bounds[2];
		g_sel_bottom[i] =  sel_bounds[3];
		// визуальные
		v_sel_left[i] = sel_bounds[4];
		v_sel_top[i] =  sel_bounds[5];
		v_sel_right[i] =  sel_bounds[6];
		v_sel_bottom[i] =  sel_bounds[7];
		//
		// с учетом клип маски
		var nc_bounds = new Array(); 
		nc_bounds = NO_CLIP_BOUNDS (the_obj);
		// геом. границы
		NC_g_left[i] = nc_bounds[0];
		NC_g_top[i] = nc_bounds[1];
		NC_g_right[i] = nc_bounds[2];
		NC_g_bottom[i] = nc_bounds[3];
		// визуальные границы
		NC_v_left[i] = nc_bounds[4];
		NC_v_top[i] = nc_bounds[5];
		NC_v_right[i] = nc_bounds[6];
		NC_v_bottom[i] = nc_bounds[7];
		//
		if( (g_sel_left[i] != NC_g_left[i]) || (g_sel_top[i] != NC_g_top[i]) || (g_sel_right[i] != NC_g_right[i]) || (g_sel_bottom[i] != NC_g_bottom[i]) ||
			 (v_sel_left[i] != NC_v_left[i]) || (v_sel_top[i] != NC_v_top[i]) || (v_sel_right[i] != NC_v_right[i]) || (v_sel_bottom[i] != NC_v_bottom[i]) ) 
		{
            CLIP = true;
		};// if  
	};// for i
	return;
};// end SELECTION_DIM
//
// подпрограмма получения границ по выделению
function SEL_BOUNDS ( the_obj ) 
{
	try 
	{
		var g_L =  the_obj.geometricBounds[0];
		var v_L =  the_obj.visibleBounds[0];
		var g_T =  the_obj.geometricBounds[1];
		var v_T =  the_obj.visibleBounds[1];
		var g_R =  the_obj.geometricBounds[2];
		var v_R =  the_obj.visibleBounds[2];
		var g_B =  the_obj.geometricBounds[3];
		var v_B =  the_obj.visibleBounds[3];
	} 
	catch ( error ) 
	{
		return false;
	};// try-catch	
	return [g_L, g_T, g_R, g_B,   v_L, v_T, v_R, v_B];
};// end SEL_BOUNDS
//
// подпрограмма определения границ того что не в масках
// возвращает массив границ
// в ней еще есть подпрограмма создания массивов границ того что не в масках
function NO_CLIP_BOUNDS (the_obj) 
{
	// определяем массив объектов вне масок
	var NO_CLIP_OBJECTS = new Array();
	// получаем массив объектов вне масок
	GET_NO_CLIP_OBJECTS ( the_obj );
	// определяем массивы границ объектов вне масок
	var v_left =  new Array();
	var g_left = new Array();
	var v_top =  new Array();
	var g_top = new Array();
	var v_right =  new Array();
	var g_right = new Array();
	var v_bottom =  new Array();
	var g_bottom = new Array();
	// заполняем массивы границ объектов вне масок
	for (var i=0; i < NO_CLIP_OBJECTS.length; i++) 
	{
		g_left[i] = NO_CLIP_OBJECTS[i].geometricBounds[0];
		v_left[i] = NO_CLIP_OBJECTS[i].visibleBounds[0];
		g_top[i] = NO_CLIP_OBJECTS[i].geometricBounds[1];
		v_top[i] = NO_CLIP_OBJECTS[i].visibleBounds[1];
		g_right[i] = NO_CLIP_OBJECTS[i].geometricBounds[2];
		v_right[i] = NO_CLIP_OBJECTS[i].visibleBounds[2];
		g_bottom[i] = NO_CLIP_OBJECTS[i].geometricBounds[3];
		v_bottom[i] = NO_CLIP_OBJECTS[i].visibleBounds[3];
	};// for
	// вычисляем результирующие границы объектов вне масок
	// LEFT
	var v_L = MIN_IN_ARRAY ( v_left );
	var g_L = MIN_IN_ARRAY ( g_left );
	// TOP
	var v_T = MAX_IN_ARRAY ( v_top );
	var g_T = MAX_IN_ARRAY ( g_top );
	// RIGHT
	var v_R = MAX_IN_ARRAY ( v_right );
	var g_R = MAX_IN_ARRAY ( g_right );
	// BOTTOM
	var v_B = MIN_IN_ARRAY ( v_bottom );
	var g_B = MIN_IN_ARRAY ( g_bottom );
	return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];
	//
	// подпрограмма занесения в массив объектов вне маски
	// (вложена в подпрограмму NO_CLIP_BOUNDS)
	function GET_NO_CLIP_OBJECTS ( the_obj ) 
	{
		// если объект клип. маска
		if (IS_CLIP (the_obj)) 
		{
			// заносим в массив только сам контур клип. маски  и сразу возвращаемся!!!!
			// в этом ВСЯ фишка!!!!
			try 
			{
				NO_CLIP_OBJECTS.push(the_obj.pathItems[0]);
				NO_CLIP_OBJ_TO_SHOW.push(the_obj.pathItems[0]);
			} catch ( error ) {};
			return;
		}// if
		// если группа, то просматриваем элементы группы
		if( the_obj.constructor.name == "GroupItem" ) 
		{
			try 
			{
				// определяем под-объекты в группе
				var N_sub_obj =  the_obj.pageItems.length;
				for (var i=0; i < N_sub_obj; i++) 
				{
					GET_NO_CLIP_OBJECTS ( the_obj.pageItems[i] );
				}// for
			} catch (error) {}
			// если группа, то возврат здесь, чтобы не занести саму группу в массив
			return;
		}// if
		// заносим в массив объект 
		NO_CLIP_OBJECTS.push(the_obj);
		NO_CLIP_OBJ_TO_SHOW.push(the_obj);
		return;
	};// end GET_NO_CLIP_OBJECTS
};// end NO_CLIP_BOUNDS
//
// подпрограмма получения ссылки на файл данных
function GET_INI_FILE()
{
	// получаем адрес папки с приложением
	SCRIPT_FOLDER = app.path;
	// получаем ссылку на файл данных
	INI_FILE = File( SCRIPT_FOLDER + "/"+ the_title +".ini" );
	return;
};// end GET_INI_FILE
//
// подпрограмма определения является ли объект клип. группой
function IS_CLIP ( the_obj ) 
{
	try 
	{
		if (the_obj.constructor.name == "GroupItem" ) 
		{
			if( the_obj.clipped ) 
			{
				return true;
			};// if
		};// if
	} catch (error) {};// try-catch
	return false;
};// end  IS_CLIP
//
// подпрограмма чтения начальных значений из файла
function INI_READ()
{
	// получаем ссылку на файл данных
	GET_INI_FILE();
	// существует ли он
	INI_EXISTS = INI_FILE.exists;
	// если не существует, получаем начальные значения по умолчанию
	if( !INI_EXISTS ) SET_INI()
	// если существует, получаем начальные значения из этого файла
	else 
	{
		try
		{
			// открываем файл данных на чтение
			FILE_IO( false );
		} 
		// если ошибка при чтении файла данных
		catch ( error ) 
		{
			// присваиваем значения по умолчанию
			SET_INI();
		};// try-catch
	};// if-else
	// если ошибка при обработке данных из файла
	// присваиваем значения по умолчанию
	if( INI_ERR ) SET_INI();
	return;
};// end INI_READ
//
// подпрограмма записи начальных значений в файл
function INI_WRITE()
{
	// присваиваем в начальные значения полученные из диалога
	//
	// численное значение толщины линии
	SW_NUM_INI = (TEXT_TO_DIGIT(str_w_ed_text.text)).toString(); 
	// единицы измерения для толщины линии (индекс)
	SW_UN_INI = SW_UN_INI.toString(); 
	// построение белого контура (1 - да, 0 - нет )
	if( w_cont ) W_CONT_INI ="1" else W_CONT_INI = "0";
	// группировка после построения (индекс)
	g_m_ini = g_m_ini.toString();
	// границы объектов (индекс 1 - визуальные, 0 - геометрические)
	if( BOUNDS_TO_MAKE == VIS_OPTION ) BOUNDS_INI = "1" else BOUNDS_INI = "0";
	// существует ли файл (на всякий случай еще раз)
	INI_EXISTS = INI_FILE.exists;
	// если не существует, пытаемся создать
	if( !INI_EXISTS ) 
	{
		try
		{
			// получаем ссылку на файл данных
			GET_INI_FILE();
		} catch ( error ) {};
	};// if
	try
	{
		// записываем в файл данных
		FILE_IO( true );
	} catch ( error ) {};
	return;
};// end INI_WRITE
//
// подпрограмма проверки данных при чтении/записи
function BAD_DATA( x )
{ 
	if( isNaN(parseFloat(x)) || x === undefined ) return true;
	return false;
};// end BAD_DATA
//
// подпрограмма чтения/записи в файл данных
// n = true запись
// n = false чтение
function FILE_IO( n )
{
	// ошибка при вводе начальных значений
	INI_ERR = false;
	// массив данных для чтения
	var r = new Array();
	// массив данных для записи
	var w = new Array();
	// число параметров ввода/вывода
	var N_PAR = 11;// (0-10)
	try 
	{
		// запись
		if( n ) 
		{
			// длина метки по вертикали
			w[0] = LENGTH_VER_INI; 
			// длина метки по горизонтали
			w[1] = LENGTH_HOR_INI; 
			// отступ метки по вертикали
			w[2] = OFFSET_VER_INI; 
			// отступ метки по горизонтали
			w[3] = OFFSET_HOR_INI;
			// вылет объекта по вертикали
			w[4] = BLEED_VER_INI;    
			// вылет объекта по горизонтали
			w[5] = BLEED_HOR_INI;
			// числовое значение толщины метки
			w[6] = SW_NUM_INI;       
			// единицы измерения для толщины метки (индекс)
			w[7] = SW_UN_INI; 
			// построение белого контура (1 - да, 0 - нет )
			w[8] = W_CONT_INI;       
			// границы объектов (индекс 1 - визуальные, 0 - геометрические)
			w[9] = BOUNDS_INI;
			// группировка после построения меток (индекс)
			w[10] = g_m_ini;
		};// if
		// если стина, то открываем на запись
		if( n ) INI_FILE.open("w")
		// если ложь то открываем на чтение
		else INI_FILE.open("r");
		// цикл по массиву начальных значений
		for( var i=0; i < N_PAR; i++ )
		{
			// запись
			if( n ) 
			{ 
				if ( BAD_DATA( w[i] ) ) INI_ERR = true;
				INI_FILE.writeln( w[i] );
			}
			// чтение
			else 
			{
				r[i] = INI_FILE.readln();
				if ( BAD_DATA( r[i] ) ) INI_ERR = true;
			};// if-else
		};// for
		// чтение
		if( !n ) 
		{
			// длина метки по вертикали
			LENGTH_VER_INI = r[0]; 
			// длина метки по горизонтали
			LENGTH_HOR_INI = r[1]; 
			// отступ метки по вертикали
			OFFSET_VER_INI = r[2]; 
			// отступ метки по горизонтали
			OFFSET_HOR_INI = r[3];
			// вылет объекта по вертикали
			BLEED_VER_INI = r[4];  
			// вылет объекта по горизонтали
			BLEED_HOR_INI = r[5];
			// числовое значение толщины метки
			SW_NUM_INI = r[6]; 
			// единицы измерения для толщины метки (индекс)
			SW_UN_INI = r[7]; 
			// построение белого контура (1 - да, 0 - нет )
			W_CONT_INI = r[8]; 
			if( parseInt( W_CONT_INI ) == 1 ) W_CONT_INI = true else W_CONT_INI = false;
			// границы объектов ( индекс 1 - визуальные, 0 - геометрические)
			BOUNDS_INI = r[9];
			// группировка после построения меток (индекс)
			g_m_ini = r[10];
		};// if
		// закрываем файл
		INI_FILE.close();
	}
	catch ( error )
	{
		INI_ERR = true;
	};// try-catch
	try
	{ 
		INI_FILE.close();
	} catch( error ) {};
	return;
};// end FILE_IO
//
// функция чтения текстового ввода и перевода в число
function TEXT_TO_DIGIT ( txt ) 
{
	var s = "";
	// если пусто то ноль
	if( (txt == "") || (txt == "+") || (txt == "-") ) s = "0";
	var only_space = true;
	for( var i=0; i < txt.length; i++ ) 
	{
		if( txt[i] != " " ) only_space = false;
		if( txt[i] == ",") s = s + "." else s = s + txt[i];
	};// for
	// если только пробелы то ноль
	if( only_space || (s == ".") || (s == "-") ) s = "0";
	var sn = "";
	// пропускаем пробелы
	for( var i=0; i < s.length; i++ ) 
	{
		if( s[i] == " " ) continue;
		sn = sn + s[i];
	};// for
	var d = parseFloat( sn );
	// возвращаем значение в пунктах для расчета
	return d;
};// end TEXT_TO_DIGIT
//
// проверка является ли символ цифрой
function NO_DIGIT_SYMBOL( s ) 
{
	try
	{
		if( s!= "0" && s!= "1" && s!= "2" && s!= "3" && s!= "4" && 
			 s!= "5" && s!= "6" && s!= "7" && s!= "8" && s!= "9") return true;
	} catch( error ) {};
	return false;
};// end NO_DIGIT_SYMBOL
//
// подпрограмма определения макс. значения в массиве
function MAX_IN_ARRAY ( the_array) 
{
	var MAX =  the_array[0];
	for ( var i = 0; i < the_array.length; i++ ) 
	{
		if(  the_array[i] > MAX ) MAX =  the_array[i];
	};// for
	return MAX;
};// end  MAX_IN_ARRAY
//
// подпрограмма определения мин. значения в массиве
function MIN_IN_ARRAY ( the_array) 
{
	var MIN =  the_array[0];
	for ( var i = 0; i < the_array.length; i++ ) 
	{
		if(  the_array[i] < MIN ) MIN =  the_array[i];
	};// for
	return MIN;
};// end MIN_IN_ARRAY
//
// подпрограмма получения границ по выделению
function SEL_OBJ_BOUNDS ( the_obj ) 
{
	// left
	var g_L =  the_obj.geometricBounds[1];
	var v_L =  the_obj.visibleBounds[1];
	// top
	var g_T =  the_obj.geometricBounds[0];
	var v_T =  the_obj.visibleBounds[0];
	// right
	var g_R =  the_obj.geometricBounds[3];
	var v_R =  the_obj.visibleBounds[3];
	// bottom
	var g_B =  the_obj.geometricBounds[2];
	var v_B =  the_obj.visibleBounds[2];
	return [g_L, g_T, g_R, g_B,   v_L, v_T, v_R, v_B];
};// end SEL_OBJ_BOUNDS
//
// продпрограмма определения является ли объект направляющей
function IS_GUIDE ( the_obj ) 
{
	try 
	{
		if (the_obj.guides)  
		{
			return true;
		}
	} catch (error) {};
	return false;
};// end  IS_GUIDE
//
// подпрограмма создания блока меток справа
function MARK_RIGHT_BLOCK( right, top, bottom ) 
{
	// подпрограмма создания метки справа
	function MARK_RIGHT( r, y )
	{
		var the_left = r + OFFSET_HOR;
		var the_right = the_left + LENGTH_HOR;
		MAKE_MARK_HOR( the_left, the_right, y, true, SW_NUM );
		return;
	};// end MARK_RIGHT
	//
	// право верх
	if( cb_rt ) MARK_RIGHT( right, top - BLEED_VER);
	// право центр
	if( cb_rc ) MARK_RIGHT( right, ( top + (bottom-top)/2.) );
	// право низ
	if( cb_rb ) MARK_RIGHT( right, bottom + BLEED_VER );
	return;
};// end MARK_RIGHT_BLOCK
//
// подпрограмма создания блока меток слева
function MARK_LEFT_BLOCK( left, top, bottom ) 
{
	// подпрограмма создания метки слева
	function MARK_LEFT( l, y )
	{
		var the_right = l - OFFSET_HOR;
		var the_left = the_right - LENGTH_HOR;
		MAKE_MARK_HOR( the_left, the_right, y, true, SW_NUM );
		return;
	};// end MARK_LEFT
	//
	// лево верх
	if( cb_lt ) MARK_LEFT( left, top - BLEED_VER);
	// лево центр
	if( cb_lc ) MARK_LEFT( left, ( top + (bottom-top)/2.) );
	// лево низ
	if( cb_lb ) MARK_LEFT( left, bottom + BLEED_VER );
	return;
};// end MARK_LEFT_BLOCK
//
// подпрограмма создания блока меток сверху
function MARK_TOP_BLOCK( top, left, right) 
{
	// подпрограмма создания метки сверху
	function MARK_TOP( t, x )
	{
		var the_bottom = t + OFFSET_VER;
		var the_top = the_bottom + LENGTH_VER;
		MAKE_MARK_VER( the_top, the_bottom, x, true, SW_NUM );
		return;
	};// end MARK_TOP
	//
	// верх лево 
	if( cb_tl ) MARK_TOP( top, left + BLEED_HOR);
	// лево центр
	if( cb_tc ) MARK_TOP( top, ( left + ( right - left)/2.) );
	// лево низ
	if( cb_tr ) MARK_TOP( top, right - BLEED_HOR );
	return;
};// end MARK_TOP_BLOCK
//
// подпрограмма создания блока меток снизу
function MARK_BOTTOM_BLOCK( bottom, left, right) 
{
	// подпрограмма создания метки сверху
	function MARK_BOTTOM( b, x )
	{
		var the_top = b - OFFSET_VER;
		var the_bottom = the_top - LENGTH_VER;
		MAKE_MARK_VER( the_top, the_bottom, x, true, SW_NUM );
		return;
	};// end MARK_BOTTOM
	//
	// низ лево 
	if( cb_bl ) MARK_BOTTOM( bottom, left + BLEED_HOR);
	// низ центр
	if( cb_bc ) MARK_BOTTOM( bottom, ( left + ( right - left)/2.) );
	// низ низ
	if( cb_br ) MARK_BOTTOM( bottom, right - BLEED_HOR );
	return;
};// end MARK_BOTTOM_BLOCK
//
// подпрограмма создания меток вокруг объекта
function MARKS( left, top, bottom, right)
{
	MARK_LEFT_BLOCK( left, top, bottom);
	MARK_TOP_BLOCK( top, left, right);
	MARK_BOTTOM_BLOCK( bottom, left, right);
	MARK_RIGHT_BLOCK( right, top, bottom );
	return;
};// end MARKS
//
// подпрограмма создания вертикальной линии
function MAKE_MARK_VER(the_top, the_bottom, the_x)
{
	var the_obj;
	the_obj = MAKE_MARK(the_top, the_x, the_bottom, the_x);
	if( the_obj === false ) return;
	// если задана последующая группировка меток и выделения
	if( g_m ) ALL_MARKS.push( the_obj );
	return;
};// end MAKE_MARK_VER
//
// подпрограмма создания горизонтальной линии
function MAKE_MARK_HOR(the_left, the_right, the_y)
{
	var the_obj;
	the_obj = MAKE_MARK(the_y, the_left, the_y, the_right);
	if( the_obj === false ) return;
	// если задана последующая группировка меток и выделения
	if( g_m ) ALL_MARKS.push( the_obj );
	return;
};// end MAKE_MARK_HOR
//
// подпрограмма создания метки
function MAKE_MARK(the_top, the_left, the_bottom, the_right)
{
	var the_obj;
	// если задан белый контур сначала делаем расширенную белую линию (+1 pt)
	if( w_cont ) 
	{
		// проверяем создана ли на этом месте белая метка
		if( ALREADY_MADE(the_left, the_top, the_right, the_bottom, false) ) return false;
		var W_L = MAKE_LINE(the_top, the_left, the_bottom, the_right, false, SW_NUM+1.);
		L_MADE.push( the_left ); T_MADE.push( the_top ); R_MADE.push( the_right ); B_MADE.push( the_bottom ); C_MADE.push( false );
	};// if
	// собственно делаем линию цветом регистр.
	// проверяем создана ли на этом месте метка с обводкой регистр.
	if( ALREADY_MADE(the_left, the_top, the_right, the_bottom, true) ) return false;
	var R_L = MAKE_LINE(the_top, the_left, the_bottom, the_right, true, SW_NUM);
	L_MADE.push( the_left ); T_MADE.push( the_top ); R_MADE.push( the_right ); B_MADE.push( the_bottom ); C_MADE.push( true );
	// создаем группу из белой и регистр. линии
	if( w_cont )
	{
		try
		{
			var G = SL.groupItems.add();
			W_L.move(G, ElementPlacement.INSIDE);
			R_L.move(G, ElementPlacement.INSIDE);
			the_obj = G;
		} catch ( error ) {};
	}
	else the_obj = R_L;
	return the_obj;
};// end MAKE_MARK
//
// подпрограмма создания линии
function MAKE_LINE(the_top, the_left, the_bottom, the_right, the_color, the_weight)
{
	var the_line = SL.pathItems.add();
	the_line.setEntirePath([[the_left, the_top], [the_right, the_bottom]]);
	the_line.stroked = true;
	the_line.filled = false;
	the_line.strokeOverprint = false;
	the_line.strokeCap = StrokeCap.BUTTENDCAP;
	the_line.opacity = 100;
	the_line.wrapped = false;
	the_line.strokeDashes = new Array();
	if( the_color ) the_line.strokeColor = REG
	else the_line.strokeColor = WHITE;
	the_line.strokeWidth = the_weight;
	return the_line;
};// end MAKE_LINE
//
// подпрограмма присвоения начальных значений для диалога
function SET_INI()
{
	// длина метки вертикальная
	LENGTH_VER_INI = "5";
	// длина метки горизонтальная
	LENGTH_HOR_INI = "5";
	// отступ вертикальный
	OFFSET_VER_INI = "2";
	// отступ горизонтальный
	OFFSET_HOR_INI = "2";
	// вылет вертикальный
	BLEED_VER_INI = "0";
	// вылет горизонтальный
	BLEED_HOR_INI = "0";
	// толщина линии
	SW_NUM_INI = "0.25";
	// единицы для линии
	SW_UN_INI = 2;
	// белый контур
	W_CONT_INI = false;
	// группировка
	g_m_ini = 0;
	// границы (ставим геометрические)
	BOUNDS_INI = 0;
	return;
};// end SET_INI
//
// функция чтения текстового ввода в активных единицах и перевода в пункты
function TEXT_TO_POINTS ( txt, u ) 
{
	var d = txt.toLowerCase();
	var k = 1.;
	if( u == MM_TEXT ) k = (72./25.4);// 0
	if( u == CM_TEXT ) k = ((72./25.4)*10.);// 1
	if( u == PT_TEXT ) k = 1.; // 2
	if( u == IN_TEXT ) k = 72.; // 3
	d = parseFloat( TEXT_TO_DIGIT(txt) ) * k;
	// если не цифра, обнуляем
	 if( isNaN(d) ) 
	 {
		 d = 0.;
		 exit_if_bad_input = true;
		 return;
	};// if
	// возвращаем значение в пунктах для расчета
	return d;
};// end TEXT_TO_POINTS
//
// подпрограмма получения единиц из меню
function GET_UNITS_DROP( N ) 
{
	if( N == 0 ) return MM_TEXT;
	if( N == 1 ) return CM_TEXT;
	if( N == 2 ) return PT_TEXT;
	if( N == 3 ) return IN_TEXT;
	return PT_TEXT;
};// GET_UNITS_DROP
//
// подпрограмма получения активных единиц
function GET_ACTIVE_UNITS() 
{
	var AD_units = app.activeDocument.rulerUnits;
	if( AD_units == RulerUnits.Millimeters ) return [MM_TEXT, 0];
	if( AD_units == RulerUnits.Centimeters ) return [CM_TEXT, 1];
	if( AD_units == RulerUnits.Points ) return [PT_TEXT, 2];
	if( AD_units == RulerUnits.Inches ) return [IN_TEXT, 3];
	return [MM_TEXT, 0];
};// end GET_ACTIVE_UNITS
//
// подпрограмма определения является ли значение меньше или равно 0
function LE_ZERO( x ) 
{
	try
	{
		if( x <= 0. ) return true;
	} catch( error ) {};
	return false;
};// end LE_ZERO
//
// подпрограмма проверки создана ли уже метка
function ALREADY_MADE( L, T, R, B, C )
{
	try
	{
		for( var i=0; i < L_MADE.length; i++ )
		{
			// вычисляем разницы координат текущей метки
			// со всеми уже созданными
			var DL = Math.abs( L -  L_MADE[i] );
			var DT = Math.abs( T - T_MADE[i] );
			var DR = Math.abs( R - R_MADE[i] );
			var DB = Math.abs( B - B_MADE[i] );
			if 
			( 
				// если все разницы координат текущей метки
				// оказались меньше заданной точности
				( DL <= PREC ) && 
				( DT <= PREC ) && 
				( DR <= PREC ) && 
				( DB <= PREC ) &&
				// и совпал цвет
				( C == C_MADE[i] )
			) 
			{
				// считаем что метка на заданном месте с заданным цветом
				// уже существует (создавать новую на этом месте с этим цветом не надо)
				return true;
			};// if
		};// for i
	} catch ( error ) {};
	// если условия не выполнились считаем что метка еще не создана
	return false;
};// end ALREADY_MADE
//
// подпрограмма присвоения значения переменной
// в зависимости от файловой системы
function WM( W, M )
{
	if( WFS ) return W
	else return M;
};// end WM