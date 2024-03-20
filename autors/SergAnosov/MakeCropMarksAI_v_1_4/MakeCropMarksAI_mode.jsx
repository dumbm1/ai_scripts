(function makeCropMarks() {
  {
    var the_title           = "MakeCropMarksAI",
        the_version         = "1.4",
        AD,
        AL,
        SL,
        AD_LL,
        the_sel,
        N_sel               = 0,
        v_sel_left          = [],
        g_sel_left          = [],
        v_sel_right         = [],
        g_sel_right         = [],
        v_sel_top           = [],
        g_sel_top           = [],
        v_sel_bottom        = [],
        g_sel_bottom        = [],
        NC_v_left           = [],
        NC_g_left           = [],
        NC_v_right          = [],
        NC_g_right          = [],
        NC_v_top            = [],
        NC_g_top            = [],
        NC_v_bottom         = [],
        NC_g_bottom         = [],
        CLIP                = false,
        CLIP_INI            = false,
        NO_CLIP_OBJ_TO_SHOW = [],
        MAKE_BY_CLIP        = false,
        N_doc               = 0,
        dlg,
        exit_if_bad_input   = false,
        exit_if_bad_sel     = false,
        OBJ_DROP,
        UNITS_DROP,
        BOUNDS_DROP,
        LAYER_DROP,
        DIR_SELECTED,
        NO_DOC              = false,
        REG,
        WHITE,
        OBJECTS_TO_MAKE,
        BOUNDS_TO_MAKE,
        GEO_OPTION          = "Geometric",
        VIS_OPTION          = "Visible (consider objects stroke)",
        BOUNDS_INI,
        ALL_MARKS           = [],
        L_MADE              = [],
        T_MADE              = [],
        R_MADE              = [],
        B_MADE              = [],
        C_MADE              = [],
        UNITS_TEXT,
        B_DROP_ACTIVE       = false,
        NO_DIR              = false,
        cb_tl, cb_tc, cb_tr,
        cb_rt, cb_rc, cb_rb,
        cb_bl, cb_bc, cb_br,
        cb_lt, cb_lc, cb_lb,
        b_clear_all,
        b_set_all,
        w_cont,
        W_CONT_INI,
        g_m,
        g_m_ini,
        M_ONLY_OPTION       = "Marks only",
        M_SEL_OPTION        = "Marks and selection",
        NO_GR_OPTION        = "Nothing",
        LENGTH_VER,
        LENGTH_VER_INI,
        LENGTH_HOR,
        LENGTH_HOR_INI,
        OFFSET_VER,
        OFFSET_VER_INI,
        OFFSET_HOR,
        OFFSET_HOR_INI,
        BLEED_VER,
        BLEED_VER_INI,
        BLEED_HOR,
        BLEED_HOR_INI,
        str_w_ed_text,
        SW_NUM,
        SW_NUM_INI,
        str_un_drop,
        SW_UN_INI,
        INI_FILE            = new File(),
        INI_EXISTS          = true,
        INI_ERR             = false,
        WFS                 = false,
        PREC                = 0.002,
        SEL_OBJ_OPTION      = "Selected object",
        EACH_OBJ_OPTION     = "Each object in selection",
        ENTIRE_SEL_OPTION   = "Entire selection",
        AB_OPTION           = "Artboard",
        exit_if_bad_input   = false,
        BAD_SW              = false,
        BAD_VAL_L           = false,
        BAD_VAL_TEXT        = "Bad value input!\n\n",
        CAN_NOT_BE          = " can not be <= zero",
        MM_TEXT             = "mm",
        CM_TEXT             = "cm",
        PT_TEXT             = "pt",
        IN_TEXT             = "in";
  }

  main();

  function main() {

    if (CHECK_SELECTION()) {

      SELECTION_DIM();

      INI_READ();

      dlg = new Window('dialog');

      if (File.fs == "Windows") WFS = true;

      dlg.text = the_title + " v." + the_version;
      dlg.childrenAlignment = 'center',
        DD_WIDTH = 90,
        mp = dlg.add('panel'),
        mp_left = 5,
        mp_top = 5,
        mp_right = 435,
        mp_bottom = 197;
      mp.bounds = [mp_left, mp_top, mp_right, mp_bottom],
        cb_w = 20,
        cb_h = 15,
        cb_dx = 50,
        cb_dy = 50;

      function MAKE_CB(x, y, s, where) {
        var cb = where.add('checkbox');
        cb.value = s,
          c_w = WM(15, cb_w);
        cb.bounds = [x, y, x + c_w, y + cb_h];
        return cb;
      }

      function MAKE_DROP(where, x, y, w, h, arr, ini) {
        var d    = where.add('dropdownlist');
        d.bounds = [x, y, x + w, y + h];
        for (var i = 0; i < arr.length; i++) {
          d.add('item', arr[i]);
        }
        d.selection = ini;
        return d;
      }

      function MAKE_CB_DIAL(where, x, y, w, h, text, ini) {
        var c    = where.add('checkbox');
        c.bounds = [x, y, x + w, y + h];
        c.text   = text;
        c.value  = ini;
        return c;
      }

      function HOR_CB_GROUP(x, y, where) {
        var cb_arr = [],
            x_cb   = x,
            s      = false;
        for (var i = 0; i < 3; i++) {
          if (i == 0) var dx = WM(-3, 0);
          if (i == 1) var dx = WM(-6, -5);
          if (i == 2) var dx = WM(-10, -9);
          cb_arr[i] = MAKE_CB(x_cb + dx, y, s, where);
          x_cb      = x_cb + cb_dx;
        }

        return cb_arr;
      }

      function VER_CB_GROUP(x, y, where) {
        var cb_arr = [],
            y_cb   = y,
            s      = false;
        for (var i = 0; i < 3; i++) {
          if (i == 0) var dy = 0;
          if (i == 1) var dy = WM(-3, -2);
          if (i == 2) var dy = -5;
          cb_arr[i] = MAKE_CB(x, y_cb + dy, s, where);
          y_cb      = y_cb + cb_dy;
        }

        return cb_arr;
      }

      function MAKE_BUTTON(x, y, w, where, txt) {
        var b     = where.add('button'),
            btn_h = 20;
        b.text    = txt;
        b.bounds  = [x, y, x + w, y + btn_h];
        return b;
      }

      function MAKE_DIRECTIONS(x, y) {
        var cb_arr        = [],
            top_bottom_dx = WM(5, 0),
            left_dx       = WM(4, 0);
        cb_arr            = VER_CB_GROUP(x + 2 + left_dx, y + cb_h + 2, mp);
        cb_lt             = cb_arr[0];
        cb_lc             = cb_arr[1];
        cb_lb = cb_arr[2],
          top_dy = WM(0, -1);
        cb_arr = HOR_CB_GROUP(x + cb_w + top_bottom_dx, y + top_dy, mp);
        cb_tl  = cb_arr[0];
        cb_tc  = cb_arr[1];
        cb_tr = cb_arr[2],
          right_dx = WM(1, 0);
        cb_arr = VER_CB_GROUP(x + (cb_w + cb_dx) * 2 - 10 + right_dx, y + cb_h + 2, mp);
        cb_rt  = cb_arr[0];
        cb_rc  = cb_arr[1];
        cb_rb = cb_arr[2],
          bottom_dy = WM(1, 0);
        cb_arr = HOR_CB_GROUP(x + cb_w + top_bottom_dx, y + (cb_h + cb_dy) * 2 - bottom_dy, mp);
        cb_bl  = cb_arr[0];
        cb_bc  = cb_arr[1];
        cb_br = cb_arr[2],
          rect = mp.add('panel'),
          s = 2,
          rect_left = x + cb_w + s,
          rect_top = y + cb_h + s,
          rect_right = x + (cb_w - 7 + cb_dx) * 2 - s + 5,
          rect_bottom = y + (cb_h + cb_dy) * 2 - s;
        rect.bounds = [rect_left, rect_top, rect_right, rect_bottom],
          s_b = 10,
          b_left = s_b,
          b_top = s_b,
          b_w = 85,
          b_w_dx = 33,
          b_clear_all_y = 10,
          button_dx = WM(2, 0);
        b_left = b_left - button_dx,
          UNCH_TEXT = WM("Uncheck all", "Uncheck");
        b_clear_all         = MAKE_BUTTON(b_left, b_clear_all_y, b_w, rect, UNCH_TEXT);
        b_clear_all.onClick = B_CLEAR_ON_CLICK;

        function B_CLEAR_ON_CLICK() {
          SET_CB(false);
          return;
        }

        var b_dir_default_y   = b_clear_all_y + b_w_dx;
        b_dir_default         = MAKE_BUTTON(b_left, b_dir_default_y, b_w, rect, "Default");
        b_dir_default.onClick = B_DIR_DEFAULT_ON_CLICK;

        function B_DIR_DEFAULT_ON_CLICK() {
          cb_lt.value = cb_lb.value =
            cb_tl.value = cb_tr.value =
              cb_rt.value = cb_rb.value =
                cb_bl.value = cb_br.value = true;
          cb_lc.value = cb_tc.value = cb_rc.value = cb_bc.value = false;
          return;
        }

        var b_set_all_y   = b_dir_default_y + b_w_dx;
        b_set_all         = MAKE_BUTTON(b_left, b_set_all_y, b_w, rect, "Check all");
        b_set_all.onClick = B_SET_ON_CLICK;

        function B_SET_ON_CLICK() {
          SET_CB(true);
          return;
        }

        function SET_CB(act) {
          cb_lt.value = cb_lc.value = cb_lb.value =
            cb_tl.value = cb_tc.value = cb_tr.value =
              cb_rt.value = cb_rc.value = cb_rb.value =
                cb_bl.value = cb_bc.value = cb_br.value =
                  act;
          return;
        }

        return;
      }

      var make_dir_dy = WM(0, 2);
      MAKE_DIRECTIONS(mp_left, mp_top + make_dir_dy + 2);

      function MAKE_PANEL(x, y, where, vert_ini, hor_ini, txt) {
        var h                                                            = 20,
            w                                                            = 50,
            w_txt                                                        = 45,
            w_un                                                         = 30,
            dx                                                           = 3,
            txt_left = x, txt_top = y, txt_right = x + w_txt, txt_bottom = y + h,
            t                                                            = where.add('statictext');
        t.text                                                           = txt;
        t.bounds                                                         = [txt_left, txt_top, txt_right, txt_bottom];

        function ED_TEXT(x_e, y_e, ini_txt, un_txt) {
          var et                                                             = where.add('edittext'),
              et_left = x_e, et_top = y_e, et_right = et_left + w, et_bottom = y_e + h;
          et.bounds                                                          = [et_left, et_top, et_right, et_bottom];
          et.text                                                            = ini_txt;

          et.onChanging = function() {
            digit_on_Changing(et, ini_txt, "0");
            return;
          }

          et.onChange = function() {
            digit_on_Change(et);
            return;
          }

          var un        = where.add('statictext'),
              un_left   = et_right + dx,
              un_top    = y_e,
              un_right  = un_left + w_un,
              un_bottom = y_e + h;
          un.bounds     = [un_left, un_top, un_right, un_bottom];
          un.text       = un_txt;
          return [et, un];
        }

        var x_et_vert = x + w_txt + dx + 0,
            et_vert   = ED_TEXT(x_et_vert, y, vert_ini, UNITS_TEXT),
            et_hor    = ED_TEXT(x_et_vert + 90, y, hor_ini, UNITS_TEXT);
        return [et_vert, et_hor];
      }

      function TEXT_XY(x, y, w, where, txt) {
        var t    = where.add('statictext');
        t.bounds = [x, y, x + w, y + 18];
        t.text   = txt;
        return;
      }

      function digit_on_Changing(et, def, emp) {

        if (exit_if_bad_input) {
          exit_if_bad_input = false;
          et.active         = true;
        }

        var text_in = GET_NUMBER_ON_INPUT();

        function GET_NUMBER_ON_INPUT() {

          var the_t = et.text;

          if (exit_if_bad_input) {
            et.text           = def;
            exit_if_bad_input = false;
            return et.text;
          }

          var t   = "",
              t_i,
              N_C = 0,
              N_P = 0,
              N_M = 0;

          exit_if_bad_input = false;

          for (var i = 0; i < the_t.length; i++) {

            t_i = the_t[i];

            if (t_i == ",") t_i = ".";

            if (t_i == ".") N_C = N_C + 1;

            if (t_i == "-") N_M = N_M + 1;

            if (t_i == "+") N_P = N_P + 1;

            if (( (t_i != "-" && t_i != "+" && t_i != "."  ) && NO_DIGIT_SYMBOL(t_i) ) ||
              N_C > 1 || ((N_M + N_P) > 1) || ( (t_i == "-" || t_i == "+") && i != 0)
            ) {

              exit_if_bad_input = true;
              alert("Bad input-number input!");
              et.text   = def;
              et.active = true;
              return et.text;
            }

            t = t + t_i;
          }

          if (t == "") {
            et.text = emp;
          }

          return et.text;
        }

        return;
      }

      function digit_on_Change(et) {

        var txt      = et.text,
            the_zero = false;

        if (txt == "" || txt == " " || txt == "-" || txt == "+" || txt == "." || txt == "," || exit_if_bad_input) {
          the_zero = true;
        }

        if (isNaN(parseFloat(TEXT_TO_DIGIT(txt)))) {
          the_zero = true;
        }

        if (parseFloat(TEXT_TO_DIGIT(txt)) == 0.) {
          the_zero = true;
        }

        if (the_zero) {
          et.text = "0";
        }

        return;
      }

      function MAKE_OPTIONS_PANEL(x, y) {
        var VER_HOR_ARR = [],
            w_vert      = 70,
            w_hor       = 70,
            y_vert_hor  = y - 3,
            dx_vert     = 50,
            x_vert      = x + dx_vert;
        TEXT_XY(x_vert, y_vert_hor, w_vert, mp, "Vertical"),
          dx_hor = 20,
          x_hor = x_vert + w_vert + dx_hor;
        TEXT_XY(x_hor, y_vert_hor, w_hor, mp, "Horizontal"),
          pan_x = x,
          pan_y_0 = y + 20,
          pan_dy = 24,
          pan_y_length = pan_y_0 - 5;
        VER_HOR_ARR = MAKE_PANEL(pan_x, pan_y_length, mp, LENGTH_VER_INI, LENGTH_HOR_INI, "Length:");
        LENGTH_VER = VER_HOR_ARR[0][0],
          LENGTH_VER_UN = VER_HOR_ARR[0][1];
        LENGTH_HOR = VER_HOR_ARR[1][0],
          LENGTH_HOR_UN = VER_HOR_ARR[1][1],
          pan_y_offset = pan_y_length + pan_dy;
        VER_HOR_ARR = MAKE_PANEL(pan_x, pan_y_offset, mp, OFFSET_VER_INI, OFFSET_HOR_INI, "Offset:");
        OFFSET_VER = VER_HOR_ARR[0][0],
          OFFSET_VER_UN = VER_HOR_ARR[0][1];
        OFFSET_HOR = VER_HOR_ARR[1][0],
          OFFSET_HOR_UN = VER_HOR_ARR[1][1],
          pan_y_bleed = pan_y_offset + pan_dy;
        VER_HOR_ARR = MAKE_PANEL(pan_x, pan_y_bleed, mp, BLEED_VER_INI, BLEED_HOR_INI, "Bleed:");
        BLEED_VER = VER_HOR_ARR[0][0],
          BLEED_VER_UN = VER_HOR_ARR[0][1];
        BLEED_HOR = VER_HOR_ARR[1][0],
          BLEED_HOR_UN = VER_HOR_ARR[1][1],
          pan_y_units = pan_y_bleed + pan_dy + 1,
          units_w = 35;
        TEXT_XY(pan_x, pan_y_units, units_w, mp, "Units:"),
          un_drop_h = 20,
          un_drop_w = 55,
          un_drop_left = pan_x + units_w + 0,
          un_drop_ini = GET_ACTIVE_UNITS()[1];
        un_drop = MAKE_DROP(mp, un_drop_left, pan_y_units, un_drop_w, un_drop_h, [MM_TEXT, CM_TEXT, PT_TEXT, IN_TEXT], un_drop_ini);

        un_drop.onChange = function() {
          LENGTH_VER_UN.text = LENGTH_HOR_UN.text =
            OFFSET_VER_UN.text = OFFSET_HOR_UN.text =
              BLEED_VER_UN.text = BLEED_HOR_UN.text =
                UNITS_TEXT = un_drop.selection.text;
          return;
        }

        MAKE_BY_CLIP = MAKE_CB_DIAL(mp, un_drop_left + un_drop_w + 3, pan_y_units, 150, un_drop_h, "Consider clipping mask", W_CONT_INI);
        if (!CLIP) {
          MAKE_BY_CLIP.enabled = MAKE_BY_CLIP.value = false
        }
        else {
          MAKE_BY_CLIP.value = CLIP_INI = true;
        }

        var str_w_y = pan_y_units + pan_dy + 1;
        str_w_txt_w = 90;
        TEXT_XY(pan_x, str_w_y + 1, str_w_txt_w, mp, "Stroke weight:");
        str_w_ed_text = mp.add('edittext'),
          str_w_left = x + str_w_txt_w + 3,
          str_w_ed_tex_w = 55,
          str_w_right = str_w_left + str_w_ed_tex_w;
        str_w_ed_text.bounds = [str_w_left, str_w_y, str_w_right, str_w_y + 22];
        str_w_ed_text.text   = SW_NUM_INI;

        str_w_ed_text.onChanging = function() {
          digit_on_Changing(str_w_ed_text, SW_NUM_INI, "0");
          return;
        }

        str_w_ed_text.onChange = function() {
          digit_on_Change(str_w_ed_text);
          return;
        }

        var str_un_drop_left = str_w_right + 5,
            str_un_drop_h    = 20,
            str_un_drop_w    = 60;
        str_un_drop = MAKE_DROP(mp, str_un_drop_left, str_w_y, str_un_drop_w, str_un_drop_h, [MM_TEXT, CM_TEXT, PT_TEXT, IN_TEXT], SW_UN_INI),
          g_t = mp.add('statictext');
        g_t.text = "Group after: ",
          g_m_w = 90,
          g_m_left = pan_x, g_m_top = str_w_y + str_un_drop_h + 5, g_m_right = g_m_left + g_m_w, g_m_bottom = g_m_top + 20;
        g_t.bounds = [g_m_left, g_m_top, g_m_right, g_m_bottom];
        g_m        = mp.add('dropdownlist');

        g_m.add('item', NO_GR_OPTION);

        g_m.add('item', M_ONLY_OPTION);

        if (N_sel > 0) {
          g_m.add('item', M_SEL_OPTION),
            g_m_left_d = g_m_right + 3,
            g_m_right_d = g_m_left_d + 120;
        }
        g_m.bounds = [g_m_left_d, g_m_top, g_m_right_d, g_m_top + 20];

        if (g_m_ini == 2 && N_sel == 0) g_m_ini = 1;
        g_m.selection = g_m_ini,
          w_cont_left = pan_x, w_cont_top = g_m_bottom + 1,
          w_cont_w = 200, w_cont_h = 22;
        w_cont = MAKE_CB_DIAL(mp, w_cont_left, w_cont_top, w_cont_w, w_cont_h, "White contour around mark", W_CONT_INI);
        return;
      }

      MAKE_OPTIONS_PANEL(175, 5)

      function MAKE_LINE_DIAL() {
        var the_line    = dlg.add('panel');
        the_line.bounds = [mp_left, undefined, mp_right, undefined];
        return;
      }

      var OBJ_BOUNDS           = dlg.add('group');
      OBJ_BOUNDS.orientation   = 'row';
      OBJ_BOUNDS.alignChildren = 'center';

      OBJ_GROUP = OBJ_BOUNDS.add('group');
      OBJ_GROUP.orientation = 'row',
        OBJ_GROUP_TEXT = OBJ_GROUP.add('statictext');
      OBJ_GROUP_TEXT.text = "Object(s):",
        OBJ_DROP = OBJ_GROUP.add('dropdownlist');
      OBJ_DROP.minimumSize.width =
        OBJ_DROP.maximumSize.width = DD_WIDTH;
      OBJ_DROP.onChange = OBJ_DROP_ON_CHANGE;

      function OBJ_DROP_ON_CHANGE() {

        if (OBJ_DROP.selection.text == AB_OPTION) {

          DROP_ACTIVE_DEACTIVE(B_DROP, false);

          if (CLIP && MAKE_BY_CLIP.enabled) {

            CLIP_INI = MAKE_BY_CLIP.value;

            MAKE_BY_CLIP.value = MAKE_BY_CLIP.enabled = false;
          }

        }

        else {

          DROP_ACTIVE_DEACTIVE(B_DROP, true);

          if (CLIP && !MAKE_BY_CLIP.enabled) {

            MAKE_BY_CLIP.enabled = true;

            MAKE_BY_CLIP.value = CLIP_INI;
          }

        }

        return;
      }

      function DROP_ACTIVE_DEACTIVE(the_drop, act) {
        var NA;
        if (!act) {
          if (!the_drop.enabled) return;
          NA               = the_drop.add('item', "N/A");
          NA.selected      = true;
          the_drop.enabled = false;
        }
        else {
          try {
            if (the_drop.enabled) return;
            the_drop.remove(the_drop.items[the_drop.items.length - 1]);
            the_drop.items[0].selected = true;
            the_drop.enabled           = true;
          } catch (error) {
          }

        }

        return;
      }

      if (N_sel > 0) {

        B_GROUP             = OBJ_BOUNDS.add('group');
        B_GROUP.orientation = 'row';
        B_DROP_ACTIVE = true,
          B_GROUP_TEXT = B_GROUP.add('statictext');
        B_GROUP_TEXT.text = "Bounds:",
          B_DROP = B_GROUP.add('dropdownlist');
        B_DROP.minimumSize.width =
          B_DROP.maximumSize.width = DD_WIDTH;
        B_DROP.add('item', GEO_OPTION);
        B_DROP.add('item', VIS_OPTION);
        B_DROP.selection = BOUNDS_INI;
      }

      if (AD_LL > 1) {
        var LAY_GROUP = OBJ_BOUNDS.add('group');
        LAY_GROUP.orientation = 'row',
          LAY_GROUP_TEXT = LAY_GROUP.add('statictext');
        LAY_GROUP_TEXT.text = "Layer:",
          LAY_DROP = LAY_GROUP.add('dropdownlist');
        LAY_DROP.minimumSize.width =
          LAY_DROP.maximumSize.width = DD_WIDTH - WM(13, 17);
        for (var i = 0; i < AD_LL; i++) {
          var the_lay = LAY_DROP.add('item', AD.layers[i].name);
          if (AD.layers[i] == AL) the_lay.selected = true;
        }

      }

      if (N_sel > 0) {

        if (N_sel == 1) OBJ_DROP.add('item', SEL_OBJ_OPTION);

        if (N_sel >= 2) {
          OBJ_DROP.add('item', ENTIRE_SEL_OPTION);
          OBJ_DROP.add('item', EACH_OBJ_OPTION);
        }

      }

      OBJ_DROP.add('item', AB_OPTION);

      OBJ_DROP.selection = 0;

      MAKE_LINE_DIAL();

      dlg.okPanel             = dlg.add('group');
      dlg.okPanel.orientation = 'row';
      dlg.okPanel.okBtn       = dlg.okPanel.add('button', undefined, 'OK');
      dlg.okPanel.cancelBtn = dlg.okPanel.add('button', undefined, 'Cancel'),
        DIALOG_BUTTON = dlg.show();

      if (DIALOG_BUTTON == 1) {

        OBJECTS_TO_MAKE = OBJ_DROP.selection.text;

        cb_lt = cb_lt.value;
        cb_lc = cb_lc.value;
        cb_lb = cb_lb.value;
        cb_tl = cb_tl.value;
        cb_tc = cb_tc.value;
        cb_tr = cb_tr.value;
        cb_rt = cb_rt.value;
        cb_rc = cb_rc.value;
        cb_rb = cb_rb.value;
        cb_bl = cb_bl.value;
        cb_bc = cb_bc.value;
        cb_br = cb_br.value;

        LENGTH_VER_INI = LENGTH_VER.text;
        LENGTH_VER     = TEXT_TO_POINTS(LENGTH_VER_INI, UNITS_TEXT);

        LENGTH_HOR_INI = LENGTH_HOR.text;
        LENGTH_HOR     = TEXT_TO_POINTS(LENGTH_HOR_INI, UNITS_TEXT);

        OFFSET_VER_INI = OFFSET_VER.text;
        OFFSET_VER     = TEXT_TO_POINTS(OFFSET_VER_INI, UNITS_TEXT);

        OFFSET_HOR_INI = OFFSET_HOR.text;
        OFFSET_HOR     = TEXT_TO_POINTS(OFFSET_HOR_INI, UNITS_TEXT);

        BLEED_VER_INI = BLEED_VER.text;
        BLEED_VER     = TEXT_TO_POINTS(BLEED_VER_INI, UNITS_TEXT);

        BLEED_HOR_INI = BLEED_HOR.text;
        BLEED_HOR     = TEXT_TO_POINTS(BLEED_HOR_INI, UNITS_TEXT);

        SW_UN_INI = str_un_drop.selection.index;
        SW_NUM    = TEXT_TO_POINTS(str_w_ed_text.text, GET_UNITS_DROP(SW_UN_INI));

        if (LE_ZERO(LENGTH_VER) || LE_ZERO(LENGTH_HOR)) {
          BAD_VAL_L    = true;
          BAD_VAL_TEXT = BAD_VAL_TEXT + "Crop mark length" + CAN_NOT_BE + "\n";
        }

        if (LE_ZERO(SW_NUM)) {
          BAD_SW       = true;
          BAD_VAL_TEXT = BAD_VAL_TEXT + "Stroke weight" + CAN_NOT_BE + "\n";
        }

        if (BAD_VAL_L || BAD_SW) {
          alert(BAD_VAL_TEXT);
          return;
        }

        w_cont = w_cont.value;

        g_m_ini = g_m.selection.index;
        g_m     = g_m.selection.text;

        if (N_sel > 0) {
          BOUNDS_TO_MAKE = B_DROP.selection.text
        } else {
          BOUNDS_TO_MAKE = GEO_OPTION;
        }

        if (AD_LL > 1) {

          SL = AD.layers[LAY_DROP.selection.index];
        }

        if (CLIP) MAKE_BY_CLIP = MAKE_BY_CLIP.value;

        OPERATION();

        INI_WRITE();
      }

    }

    return;
  }

  function OPERATION() {

    var the_dir = cb_lt + cb_lc + cb_lb +
      cb_tl + cb_tc + cb_tr +
      cb_rt + cb_rc + cb_rb +
      cb_bl + cb_bc + cb_br;
    if (the_dir == 0) {
      alert("No directions were chosen!");
      return;
    }

    function GET_REG_BY_NAME(the_name) {
      REG   = AD.swatches.getByName(the_name).color;
      WHITE = AD.swatches.getByName(the_name).color;
      return;
    }

    var REG_NAME_ENGLISH = "[Registration]";

    try {
      GET_REG_BY_NAME(REG_NAME_ENGLISH);
    }

    catch (error) {

      var REG_FOUND = false;
      try {

        for (var i = 0; i < AD.spots.length; i++) {

          var the_spot      = AD.spots[i],
              the_spot_name = the_spot.name,
              the_type      = the_spot.colorType;

          if (the_type == ColorModel.REGISTRATION) {

            if (the_spot_name[0] == "[" && the_spot_name[the_spot_name.length - 1] == "]") {

              GET_REG_BY_NAME(the_spot_name);
              REG_FOUND = true;
            }
          }
        }
      }
      catch (error) {
      }

      if (!REG_FOUND) {
        var NEW_REG       = AD.spots.add();
        NEW_REG.colorType = ColorModel.REGISTRATION;
        NEW_REG.name = REG_NAME_ENGLISH,
          NEW_REG_NAME = NEW_REG.name;
        GET_REG_BY_NAME(NEW_REG_NAME);
      }
    }

    REG.tint = 100;

    WHITE.tint = 0;

    if (!SL.visible) SL.visible = true;
    if (SL.locked) SL.locked = false;

    if (OBJECTS_TO_MAKE == AB_OPTION) {

      AD_rulerOrigin = AD.rulerOrigin;

      AD.rulerOrigin = [0., 0.];

      MARKS(0., AD.height, 0., AD.width);

      AD.rulerOrigin = AD_rulerOrigin;
    }

    if (OBJECTS_TO_MAKE == ENTIRE_SEL_OPTION ||
      OBJECTS_TO_MAKE == EACH_OBJ_OPTION ||
      OBJECTS_TO_MAKE == SEL_OBJ_OPTION) {

      var top_arr    = [],
          left_arr   = [],
          bottom_arr = [],
          right_arr  = new Array();

      if (BOUNDS_TO_MAKE == GEO_OPTION) {

        if (MAKE_BY_CLIP) {
          top_arr    = NC_g_top;
          left_arr   = NC_g_left;
          bottom_arr = NC_g_bottom;
          right_arr  = NC_g_right
        }

        else {
          top_arr    = g_sel_top;
          left_arr   = g_sel_left;
          bottom_arr = g_sel_bottom;
          right_arr  = g_sel_right
        }

      }

      else {

        if (MAKE_BY_CLIP) {
          top_arr    = NC_v_top;
          left_arr   = NC_v_left;
          bottom_arr = NC_v_bottom;
          right_arr  = NC_v_right
        }

        else {
          top_arr    = v_sel_top;
          left_arr   = v_sel_left;
          bottom_arr = v_sel_bottom;
          right_arr  = v_sel_right
        }
      }
    }

    if (OBJECTS_TO_MAKE == ENTIRE_SEL_OPTION || OBJECTS_TO_MAKE == SEL_OBJ_OPTION) {
      var the_top    = MAX_IN_ARRAY(top_arr),
          the_left   = MIN_IN_ARRAY(left_arr),
          the_bottom = MIN_IN_ARRAY(bottom_arr),
          the_right  = MAX_IN_ARRAY(right_arr);
      MARKS(the_left, the_top, the_bottom, the_right);
    }

    if (OBJECTS_TO_MAKE == EACH_OBJ_OPTION) {

      for (var i = 0; i < N_sel; i++) {
        MARKS(left_arr[i], top_arr[i], bottom_arr[i], right_arr[i]);
      }
    }

    var g_err = false;

    if (g_m == M_ONLY_OPTION || g_m == M_SEL_OPTION) {

      try {

        if (ALL_MARKS.length > 1) {

          var G_M = SL.groupItems.add();

          for (var i = 0; i < ALL_MARKS.length; i++) {

            ALL_MARKS[i].move(G_M, ElementPlacement.INSIDE);
          }
        }

        else {

          var G_M = ALL_MARKS[0];
        }
      }
      catch (error) {
        g_err = true
      }
    }

    if (g_m == M_SEL_OPTION) {

      app.selection = null;

      try {

        if (N_sel == 1) {

          var G_S = the_sel[0];
        }

        else {

          var G_S = SL.groupItems.add();

          for (var i = 0; i < N_sel; i++) {

            the_sel[i].move(G_S, ElementPlacement.INSIDE);
          }
        }
      } catch (error) {
        g_err = true
      }

      try {
        var G = SL.groupItems.add();
        G_S.move(G, ElementPlacement.INSIDE);
        G_M.move(G, ElementPlacement.INSIDE);
      } catch (error) {
        g_err = true
      }

      try {
        G.selected = true;
      } catch (error) {
        g_err = true
      }

    }

    if (g_err) {
      try {
        alert("Can not group!");

        app.selection = the_sel;
      } catch (error) {
      }
    }

    return;
  }

  function CHECK_SELECTION() {

    N_doc = app.documents.length;
    if (N_doc < 1) {
      alert("There are no open documents!");
      NO_DOC = true;
      return false;
    }

    AD = app.activeDocument;

    AL = AD.activeLayer;

    the_sel = AD.selection;

    N_sel = the_sel.length;

    SL = AL;

    AD_LL = AD.layers.length;

    if (GUIDES_IN_SELECTION()) {
      alert("There are some selected guides!" + "\n" + "Can not process that!");
      exit_if_bad_sel = true;
      return false;
    }

    var WHITE_ARROW = false;
    for (var i = 0; i < N_sel; i++) {
      if (SELECTED_IN_GROUP(the_sel[i])) {
        WHITE_ARROW = true;
      }
    }
    if (WHITE_ARROW) {
      if (!confirm("Most likely White arrow (Direct selection tool)\nwas used to select the object(s)." +
          " Black arrow (Selection tool)\nin this case is recommended.\n\nContinue anyway?")) {
        return false;
      }
    }

    SELECTION_DIM();

    if (exit_if_bad_sel) {
      alert("Can not process the selection!");
      return false;
    }

    UNITS_TEXT = GET_ACTIVE_UNITS()[0];

    EACH_OBJ_OPTION = EACH_OBJ_OPTION + " (" + N_sel + " objects)";

    try {

      if (AD.hasOwnProperty("artboards")) {

        if (AD.artboards.length > 1) {

          var AB_NAME = unescape(AD.artboards[AD.artboards.getActiveArtboardIndex()].name);

          AB_OPTION = AB_OPTION + " (" + AB_NAME + ")";
        }

      }
    } catch (error) {
    }
    return true;
  }

  function SELECTED_IN_GROUP(the_obj) {
    try {
      var the_parent = the_obj.parent;
      if (the_parent.constructor.name == "GroupItem") return true;
    } catch (error) {
    }
    return false;
  }

  function GUIDES_IN_SELECTION() {

    function GUIDES_INSIDE(the_obj) {
      if (IS_GUIDE(the_obj)) return true;
      try {

        for (var i = 0; i < the_obj.pageItems.length; i++) {
          if (GUIDES_INSIDE(the_obj.pageItems[i])) return true;
        }

      } catch (error) {
      }

      return false;
    }

    for (var i = 0; i < the_sel.length; i++) {
      if (GUIDES_INSIDE(the_sel[i])) return true;
    }

    return false;
  }

  function SELECTION_DIM() {

    for (var i = 0; i < N_sel; i++) {
      var the_obj    = the_sel[i],
          sel_bounds = new Array();
      sel_bounds     = SEL_BOUNDS(the_obj);
      if (sel_bounds == false) {
        exit_if_bad_sel = true;
        return;
      }

      if (IS_GUIDE(the_obj)) return;

      g_sel_left[i]   = sel_bounds[0];
      g_sel_top[i]    = sel_bounds[1];
      g_sel_right[i]  = sel_bounds[2];
      g_sel_bottom[i] = sel_bounds[3];

      v_sel_left[i]  = sel_bounds[4];
      v_sel_top[i]   = sel_bounds[5];
      v_sel_right[i] = sel_bounds[6];
      v_sel_bottom[i] = sel_bounds[7],
        nc_bounds = new Array();
      nc_bounds = NO_CLIP_BOUNDS(the_obj);

      NC_g_left[i]   = nc_bounds[0];
      NC_g_top[i]    = nc_bounds[1];
      NC_g_right[i]  = nc_bounds[2];
      NC_g_bottom[i] = nc_bounds[3];

      NC_v_left[i]   = nc_bounds[4];
      NC_v_top[i]    = nc_bounds[5];
      NC_v_right[i]  = nc_bounds[6];
      NC_v_bottom[i] = nc_bounds[7];

      if ((g_sel_left[i] != NC_g_left[i]) || (g_sel_top[i] != NC_g_top[i]) ||
        (g_sel_right[i] != NC_g_right[i]) || (g_sel_bottom[i] != NC_g_bottom[i]) ||
        (v_sel_left[i] != NC_v_left[i]) || (v_sel_top[i] != NC_v_top[i]) ||
        (v_sel_right[i] != NC_v_right[i]) || (v_sel_bottom[i] != NC_v_bottom[i])) {
        CLIP = true;
      }

    }

    return;
  }

  function SEL_BOUNDS(the_obj) {
    try {
      var g_L = the_obj.geometricBounds[0],
          v_L = the_obj.visibleBounds[0],
          g_T = the_obj.geometricBounds[1],
          v_T = the_obj.visibleBounds[1],
          g_R = the_obj.geometricBounds[2],
          v_R = the_obj.visibleBounds[2],
          g_B = the_obj.geometricBounds[3],
          v_B = the_obj.visibleBounds[3];
    }
    catch (error) {
      return false;
    }

    return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];
  }

  function NO_CLIP_BOUNDS(the_obj) {

    var NO_CLIP_OBJECTS = new Array();

    GET_NO_CLIP_OBJECTS(the_obj),
      v_left = [],
      g_left = [],
      v_top = [],
      g_top = [],
      v_right = [],
      g_right = [],
      v_bottom = [],
      g_bottom = new Array();

    for (var i = 0; i < NO_CLIP_OBJECTS.length; i++) {
      g_left[i]   = NO_CLIP_OBJECTS[i].geometricBounds[0];
      v_left[i]   = NO_CLIP_OBJECTS[i].visibleBounds[0];
      g_top[i]    = NO_CLIP_OBJECTS[i].geometricBounds[1];
      v_top[i]    = NO_CLIP_OBJECTS[i].visibleBounds[1];
      g_right[i]  = NO_CLIP_OBJECTS[i].geometricBounds[2];
      v_right[i]  = NO_CLIP_OBJECTS[i].visibleBounds[2];
      g_bottom[i] = NO_CLIP_OBJECTS[i].geometricBounds[3];
      v_bottom[i] = NO_CLIP_OBJECTS[i].visibleBounds[3];
    }

    var v_L = MIN_IN_ARRAY(v_left),
        g_L = MIN_IN_ARRAY(g_left),
        v_T = MAX_IN_ARRAY(v_top),
        g_T = MAX_IN_ARRAY(g_top),
        v_R = MAX_IN_ARRAY(v_right),
        g_R = MAX_IN_ARRAY(g_right),
        v_B = MIN_IN_ARRAY(v_bottom),
        g_B = MIN_IN_ARRAY(g_bottom);
    return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];

    function GET_NO_CLIP_OBJECTS(the_obj) {

      if (IS_CLIP(the_obj)) {

        try {
          NO_CLIP_OBJECTS.push(the_obj.pathItems[0]);
          NO_CLIP_OBJ_TO_SHOW.push(the_obj.pathItems[0]);
        } catch (error) {
        }

        return;
      }

      if (the_obj.constructor.name == "GroupItem") {
        try {

          var N_sub_obj = the_obj.pageItems.length;
          for (var i = 0; i < N_sub_obj; i++) {
            GET_NO_CLIP_OBJECTS(the_obj.pageItems[i]);
          }
        } catch (error) {
        }

        return;
      }

      NO_CLIP_OBJECTS.push(the_obj);
      NO_CLIP_OBJ_TO_SHOW.push(the_obj);
      return;
    }
  }

  function GET_INI_FILE() {

    SCRIPT_FOLDER = app.path;

    INI_FILE = File(SCRIPT_FOLDER + "/" + the_title + ".ini");
    return;
  }

  function IS_CLIP(the_obj) {
    try {
      if (the_obj.constructor.name == "GroupItem") {
        if (the_obj.clipped) {
          return true;
        }

      }

    } catch (error) {
    }

    return false;
  }

  function INI_READ() {

    GET_INI_FILE();

    INI_EXISTS = INI_FILE.exists;

    if (!INI_EXISTS) {
      SET_INI()
    } else {
      try {

        FILE_IO(false);
      }

      catch (error) {

        SET_INI();
      }

    }

    if (INI_ERR) SET_INI();
    return;
  }

  function INI_WRITE() {

    SW_NUM_INI = (TEXT_TO_DIGIT(str_w_ed_text.text)).toString();

    SW_UN_INI = SW_UN_INI.toString();

    if (w_cont) W_CONT_INI = "1" else W_CONT_INI = "0";

    g_m_ini = g_m_ini.toString();

    if (BOUNDS_TO_MAKE == VIS_OPTION) BOUNDS_INI = "1" else BOUNDS_INI = "0";

    INI_EXISTS = INI_FILE.exists;

    if (!INI_EXISTS) {
      try {

        GET_INI_FILE();
      } catch (error) {
      }

    }

    try {

      FILE_IO(true);
    } catch (error) {
    }

    return;
  }

  function BAD_DATA(x) {
    if (isNaN(parseFloat(x)) || x === undefined) return true;
    return false;
  }

  function FILE_IO(n) {

    INI_ERR = false,
      r = [],
      w = [],
      N_PAR = 11;
    try {

      if (n) {

        w[0] = LENGTH_VER_INI;

        w[1] = LENGTH_HOR_INI;

        w[2] = OFFSET_VER_INI;

        w[3] = OFFSET_HOR_INI;

        w[4] = BLEED_VER_INI;

        w[5] = BLEED_HOR_INI;

        w[6] = SW_NUM_INI;

        w[7] = SW_UN_INI;

        w[8] = W_CONT_INI;

        w[9] = BOUNDS_INI;

        w[10] = g_m_ini;
      }

      if (n) {
        INI_FILE.open("w")
      } else {
        INI_FILE.open("r");
      }

      for (var i = 0; i < N_PAR; i++) {

        if (n) {
          if (BAD_DATA(w[i])) INI_ERR = true;
          INI_FILE.writeln(w[i]);
        }

        else {
          r[i] = INI_FILE.readln();
          if (BAD_DATA(r[i])) INI_ERR = true;
        }

      }

      if (!n) {

        LENGTH_VER_INI = r[0];

        LENGTH_HOR_INI = r[1];

        OFFSET_VER_INI = r[2];

        OFFSET_HOR_INI = r[3];

        BLEED_VER_INI = r[4];

        BLEED_HOR_INI = r[5];

        SW_NUM_INI = r[6];

        SW_UN_INI = r[7];

        W_CONT_INI = r[8];
        if (parseInt(W_CONT_INI) == 1) W_CONT_INI = true else W_CONT_INI = false;

        BOUNDS_INI = r[9];

        g_m_ini = r[10];
      }

      INI_FILE.close();
    }
    catch (error) {
      INI_ERR = true;
    }

    try {
      INI_FILE.close();
    } catch (error) {
    }

    return;
  }

  function TEXT_TO_DIGIT(txt) {
    var s = "";

    if ((txt == "") || (txt == "+") || (txt == "-")) {
      s = "0",
        only_space = true;
    }
    for (var i = 0; i < txt.length; i++) {
      if (txt[i] != " ") only_space = false;
      if (txt[i] == ",") s = s + "." else s = s + txt[i];
    }

    if (only_space || (s == ".") || (s == "-")) {
      s = "0",
        sn = "";
    }

    for (var i = 0; i < s.length; i++) {
      if (s[i] == " ") continue;
      sn = sn + s[i];
    }

    var d = parseFloat(sn);

    return d;
  }

  function NO_DIGIT_SYMBOL(s) {
    try {
      if (s != "0" && s != "1" && s != "2" && s != "3" && s != "4" &&
        s != "5" && s != "6" && s != "7" && s != "8" && s != "9") {
        return true;
      }
    } catch (error) {
    }

    return false;
  }

  function MAX_IN_ARRAY(the_array) {
    var MAX = the_array[0];
    for (var i = 0; i < the_array.length; i++) {
      if (the_array[i] > MAX) MAX = the_array[i];
    }

    return MAX;
  }

  function MIN_IN_ARRAY(the_array) {
    var MIN = the_array[0];
    for (var i = 0; i < the_array.length; i++) {
      if (the_array[i] < MIN) MIN = the_array[i];
    }

    return MIN;
  }

  function SEL_OBJ_BOUNDS(the_obj) {

    var g_L = the_obj.geometricBounds[1],
        v_L = the_obj.visibleBounds[1],
        g_T = the_obj.geometricBounds[0],
        v_T = the_obj.visibleBounds[0],
        g_R = the_obj.geometricBounds[3],
        v_R = the_obj.visibleBounds[3],
        g_B = the_obj.geometricBounds[2],
        v_B = the_obj.visibleBounds[2];
    return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];
  }

  function IS_GUIDE(the_obj) {
    try {
      if (the_obj.guides) {
        return true;
      }
    } catch (error) {
    }

    return false;
  }

  function MARK_RIGHT_BLOCK(right, top, bottom) {

    function MARK_RIGHT(r, y) {
      var the_left  = r + OFFSET_HOR,
          the_right = the_left + LENGTH_HOR;
      MAKE_MARK_HOR(the_left, the_right, y, true, SW_NUM);
      return;
    }

    if (cb_rt) MARK_RIGHT(right, top - BLEED_VER);

    if (cb_rc) MARK_RIGHT(right, ( top + (bottom - top) / 2.));

    if (cb_rb) MARK_RIGHT(right, bottom + BLEED_VER);
    return;
  }

  function MARK_LEFT_BLOCK(left, top, bottom) {

    function MARK_LEFT(l, y) {
      var the_right = l - OFFSET_HOR,
          the_left  = the_right - LENGTH_HOR;
      MAKE_MARK_HOR(the_left, the_right, y, true, SW_NUM);
      return;
    }

    if (cb_lt) MARK_LEFT(left, top - BLEED_VER);

    if (cb_lc) MARK_LEFT(left, ( top + (bottom - top) / 2.));

    if (cb_lb) MARK_LEFT(left, bottom + BLEED_VER);
    return;
  }

  function MARK_TOP_BLOCK(top, left, right) {

    function MARK_TOP(t, x) {
      var the_bottom = t + OFFSET_VER,
          the_top    = the_bottom + LENGTH_VER;
      MAKE_MARK_VER(the_top, the_bottom, x, true, SW_NUM);
      return;
    }

    if (cb_tl) MARK_TOP(top, left + BLEED_HOR);

    if (cb_tc) MARK_TOP(top, ( left + ( right - left) / 2.));

    if (cb_tr) MARK_TOP(top, right - BLEED_HOR);
    return;
  }

  function MARK_BOTTOM_BLOCK(bottom, left, right) {

    function MARK_BOTTOM(b, x) {
      var the_top    = b - OFFSET_VER,
          the_bottom = the_top - LENGTH_VER;
      MAKE_MARK_VER(the_top, the_bottom, x, true, SW_NUM);
      return;
    }

    if (cb_bl) MARK_BOTTOM(bottom, left + BLEED_HOR);

    if (cb_bc) MARK_BOTTOM(bottom, ( left + ( right - left) / 2.));

    if (cb_br) MARK_BOTTOM(bottom, right - BLEED_HOR);
    return;
  }

  function MARKS(left, top, bottom, right) {
    MARK_LEFT_BLOCK(left, top, bottom);
    MARK_TOP_BLOCK(top, left, right);
    MARK_BOTTOM_BLOCK(bottom, left, right);
    MARK_RIGHT_BLOCK(right, top, bottom);
    return;
  }

  function MAKE_MARK_VER(the_top, the_bottom, the_x) {
    var the_obj;
    the_obj = MAKE_MARK(the_top, the_x, the_bottom, the_x);
    if (the_obj === false) return;

    if (g_m) ALL_MARKS.push(the_obj);
    return;
  }

  function MAKE_MARK_HOR(the_left, the_right, the_y) {
    var the_obj;
    the_obj = MAKE_MARK(the_y, the_left, the_y, the_right);
    if (the_obj === false) return;

    if (g_m) ALL_MARKS.push(the_obj);
    return;
  }

  function MAKE_MARK(the_top, the_left, the_bottom, the_right) {
    var the_obj;

    if (w_cont) {

      if (ALREADY_MADE(the_left, the_top, the_right, the_bottom, false)) {
        return false,
          W_L = MAKE_LINE(the_top, the_left, the_bottom, the_right, false, SW_NUM + 1.);
      }
      L_MADE.push(the_left);
      T_MADE.push(the_top);
      R_MADE.push(the_right);
      B_MADE.push(the_bottom);
      C_MADE.push(false);
    }

    if (ALREADY_MADE(the_left, the_top, the_right, the_bottom, true)) {
      return false,
        R_L = MAKE_LINE(the_top, the_left, the_bottom, the_right, true, SW_NUM);
    }
    L_MADE.push(the_left);
    T_MADE.push(the_top);
    R_MADE.push(the_right);
    B_MADE.push(the_bottom);
    C_MADE.push(true);

    if (w_cont) {
      try {
        var G = SL.groupItems.add();
        W_L.move(G, ElementPlacement.INSIDE);
        R_L.move(G, ElementPlacement.INSIDE);
        the_obj = G;
      } catch (error) {
      }
    }
    else {
      the_obj = R_L;
    }
    return the_obj;
  }

  function MAKE_LINE(the_top, the_left, the_bottom, the_right, the_color, the_weight) {
    var the_line = SL.pathItems.add();
    the_line.setEntirePath([[the_left, the_top], [the_right, the_bottom]]);
    the_line.stroked         = true;
    the_line.filled          = false;
    the_line.strokeOverprint = false;
    the_line.strokeCap       = StrokeCap.BUTTENDCAP;
    the_line.opacity         = 100;
    the_line.wrapped         = false;
    the_line.strokeDashes    = new Array();
    if (the_color) {
      the_line.strokeColor = REG
    } else {
      the_line.strokeColor = WHITE;
    }
    the_line.strokeWidth = the_weight;
    return the_line;
  }

  function SET_INI() {

    LENGTH_VER_INI = "5";

    LENGTH_HOR_INI = "5";

    OFFSET_VER_INI = "2";

    OFFSET_HOR_INI = "2";

    BLEED_VER_INI = "0";

    BLEED_HOR_INI = "0";

    SW_NUM_INI = "0.25";

    SW_UN_INI = 2;

    W_CONT_INI = false;

    g_m_ini = 0;

    BOUNDS_INI = 0;
    return;
  }

  function TEXT_TO_POINTS(txt, u) {
    var d = txt.toLowerCase(),
        k = 1.;
    if (u == MM_TEXT) k = (72. / 25.4);
    if (u == CM_TEXT) k = ((72. / 25.4) * 10.);
    if (u == PT_TEXT) k = 1.;
    if (u == IN_TEXT) k = 72.;
    d = parseFloat(TEXT_TO_DIGIT(txt)) * k;

    if (isNaN(d)) {
      d                 = 0.;
      exit_if_bad_input = true;
      return;
    }

    return d;
  }

  function GET_UNITS_DROP(N) {
    if (N == 0) return MM_TEXT;
    if (N == 1) return CM_TEXT;
    if (N == 2) return PT_TEXT;
    if (N == 3) return IN_TEXT;
    return PT_TEXT;
  }

  function GET_ACTIVE_UNITS() {
    var AD_units = app.activeDocument.rulerUnits;
    if (AD_units == RulerUnits.Millimeters) return [MM_TEXT, 0];
    if (AD_units == RulerUnits.Centimeters) return [CM_TEXT, 1];
    if (AD_units == RulerUnits.Points) return [PT_TEXT, 2];
    if (AD_units == RulerUnits.Inches) return [IN_TEXT, 3];
    return [MM_TEXT, 0];
  }

  function LE_ZERO(x) {
    try {
      if (x <= 0.) return true;
    } catch (error) {
    }

    return false;
  }

  function ALREADY_MADE(L, T, R, B, C) {
    try {
      for (var i = 0; i < L_MADE.length; i++) {

        var DL = Math.abs(L - L_MADE[i]),
            DT = Math.abs(T - T_MADE[i]),
            DR = Math.abs(R - R_MADE[i]),
            DB = Math.abs(B - B_MADE[i]);
        if
        (

          ( DL <= PREC ) &&
          ( DT <= PREC ) &&
          ( DR <= PREC ) &&
          ( DB <= PREC ) &&

          ( C == C_MADE[i] )
        ) {

          return true;
        }
      }
    } catch (error) {
    }

    return false;
  }

  function WM(W, M) {
    if (WFS) {
      return W
    } else {
      return M;
    }
  }
}())