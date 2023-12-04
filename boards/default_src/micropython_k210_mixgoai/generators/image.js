import Python from '../../python/python_generator';

export const true_false = function () {
    var code = this.getFieldValue('flag');
    return [code, Python.ORDER_ATOMIC];
};

export const image_RGB = function () {
    var R = Python.valueToCode(this, 'R', Python.ORDER_ATOMIC);
    var G = Python.valueToCode(this, 'G', Python.ORDER_ATOMIC);
    var B = Python.valueToCode(this, 'B', Python.ORDER_ATOMIC);
    var code = '[' + R + ',' + G + ',' + B + ']';
    return [code, Python.ORDER_ATOMIC];
};

export const image_Image = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var code = sub + " = image.Image(" + path + ")\n";
    return code;
};

export const image_Image1 = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'SUB', Python.ORDER_ATOMIC);
    var code = sub + " = image.Image()\n";
    return code;
};

export const image_getinfo = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_save = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var code = sub + ".save(" + path + ")\n";
    return code;
};

//----开始--------------cool.ai-----弃用字体加载，出厂内存加载------------------

export const image_font_free = function () {
    Python.definitions_['import_image'] = 'import image';
    var code = "image.font_free()\n";
    return code;
};

export const image_font_load = function () {
    Python.definitions_['import_image'] = 'import image';
    var path = Python.valueToCode(this, 'path', Python.ORDER_ATOMIC);
    var code = "image.font_load(image.UTF8, 16, 16, " + path + ")\n";
    return code;
};

export const image_draw_string_flash = function () {
    Python.definitions_['import_image'] = 'import image';
    Python.definitions_['font_load'] = 'image.font_load(image.UTF8, 16, 16, 0xA00000)';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var x0 = Python.valueToCode(this, 'x0', Python.ORDER_ATOMIC);
    var y0 = Python.valueToCode(this, 'y0', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'tex', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'scale', Python.ORDER_ATOMIC);
    var x = Python.valueToCode(this, 'x_spacing', Python.ORDER_ATOMIC);
    var code = sub + '.draw_string(' + x0 + ',' + y0 + ',str.encode(' + t + '),color=' + color + ',scale=' + s + ',x_spacing=' + x + ',mono_space=1)';
    return [code, Python.ORDER_ATOMIC];
};

//----结束--------------cool.ai-----弃用字体加载，出厂内存加载------------------


export const image_draw_string_UTF = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var x0 = Python.valueToCode(this, 'x0', Python.ORDER_ATOMIC);
    var y0 = Python.valueToCode(this, 'y0', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'tex', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'scale', Python.ORDER_ATOMIC);
    var x = Python.valueToCode(this, 'x_spacing', Python.ORDER_ATOMIC);
    var code = sub + '.draw_string(' + x0 + ',' + y0 + ',str.encode(' + t + '),color=' + color + ',scale=' + s + ',x_spacing=' + x + ',mono_space=1)';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_string = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var x0 = Python.valueToCode(this, 'x0', Python.ORDER_ATOMIC);
    var y0 = Python.valueToCode(this, 'y0', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'tex', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'scale', Python.ORDER_ATOMIC);
    var code = sub + '.draw_string(' + x0 + ',' + y0 + ',' + t + ',' + color + ',' + s + ',mono_space=0)';
    return [code, Python.ORDER_ATOMIC];
};

export const image_copy = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var code = sub + '.copy(' + LIST + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const image_compress = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var quality = Python.valueToCode(this, 'quality', Python.ORDER_ATOMIC);
    var code = sub + '.compress(' + quality + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_clear = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = sub + ".clear()\n";
    return code;
};

export const image_tonew = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_set_pixel = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var code = sub + '.set_pixel(' + LIST + ',' + color + ')\n';
    return code;
};

export const image_get_pixel = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var code = sub + '.get_pixel(' + LIST + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_line = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'thi', Python.ORDER_ATOMIC);
    var code = sub + '.draw_line(' + list + ',' + color + ',' + t + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_arrow = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'thi', Python.ORDER_ATOMIC);
    var code = sub + '.draw_arrow(' + list + ',' + color + ',' + t + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_cross = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var s = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'thi', Python.ORDER_ATOMIC);
    var code = sub + '.draw_cross(' + list + ',' + color + ',' + s + ',' + t + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_circle = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'thi', Python.ORDER_ATOMIC);
    var f = Python.valueToCode(this, 'fil', Python.ORDER_ATOMIC);
    var code = sub + '.draw_circle(' + list + ',' + color + ',' + t + ',' + f + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_rectangle = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var t = Python.valueToCode(this, 'thi', Python.ORDER_ATOMIC);
    var f = Python.valueToCode(this, 'fil', Python.ORDER_ATOMIC);
    var code = sub + '.draw_rectangle(' + list + ',' + color + ',' + t + ',' + f + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_keypoints = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = Python.valueToCode(this, 'keypoints', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var thi = Python.valueToCode(this, 'thi', Python.ORDER_ATOMIC);
    var fil = Python.valueToCode(this, 'fil', Python.ORDER_ATOMIC);
    var code = sub + '.draw_keypoints(' + key + ',' + color + ',' + size + ',' + thi + ',' + fil + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_draw_image = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var x_scale = Python.valueToCode(this, 'x_scale', Python.ORDER_ATOMIC);
    var y_scale = Python.valueToCode(this, 'y_scale', Python.ORDER_ATOMIC);
    var code = sub + '.draw_image(' + sub + ',' + list + ',' + x_scale + ',' + y_scale + ')';
    return [code, Python.ORDER_ATOMIC];
};

//--形状识别----------------------------------------------//

export const image_find_lines = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var theta_margin = Python.valueToCode(this, 'theta_margin', Python.ORDER_ATOMIC);
    var rho_margin = Python.valueToCode(this, 'rho_margin', Python.ORDER_ATOMIC);
    var code = sub + '.find_lines(' + roi + ',threshold=' + threshold + ',theta_margin=' + theta_margin + ',rho_margin=' + rho_margin + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_find_line_segments = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var distance = Python.valueToCode(this, 'distance', Python.ORDER_ATOMIC);
    var difference = Python.valueToCode(this, 'difference', Python.ORDER_ATOMIC);
    var code = sub + '.find_line_segments(' + roi + ',' + distance + ',' + difference + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const image_find_circles = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var r_min = Python.valueToCode(this, 'r_min', Python.ORDER_ATOMIC);
    var r_max = Python.valueToCode(this, 'r_max', Python.ORDER_ATOMIC);
    var r_step = Python.valueToCode(this, 'r_step', Python.ORDER_ATOMIC);
    var x_margin = Python.valueToCode(this, 'x_margin', Python.ORDER_ATOMIC);
    var y_margin = Python.valueToCode(this, 'y_margin', Python.ORDER_ATOMIC);
    var r_margin = Python.valueToCode(this, 'r_margin', Python.ORDER_ATOMIC);
    var code = sub + '.find_circles(' + roi + ',threshold=' + threshold + ',x_margin=' + x_margin + ',y_margin=' + y_margin + ',r_margin=' + r_margin + ',r_min=' + r_min + ',r_max=' + r_max + ',r_step=' + r_step + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const image_find_rects = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var code = sub + '.find_rects(' + roi + ',threshold=' + threshold + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_get_regression = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var invert = Python.valueToCode(this, 'invert', Python.ORDER_ATOMIC);
    var robust = Python.valueToCode(this, 'robust', Python.ORDER_ATOMIC);
    var code = sub + '.get_regression([' + threshold + '],invert=' + invert + ',roi=' + roi + ',robust=' + robust + ')';
    return [code, Python.ORDER_ATOMIC];
};

//--形状列表解析------------------------------------------//



export const image_line = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_circle = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    if (key == "circle")
        var code = '[' + sub + '.x(),' + sub + '.y(),' + sub + '.r()]';
    else
        var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_rect = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

//--图像滤波------------------------------------------//

export const image_histeq = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var limit = Python.valueToCode(this, 'limit', Python.ORDER_ATOMIC);
    var code = sub + '.histeq(' + key + ',' + limit + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_mean = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var offset = Python.valueToCode(this, 'offset', Python.ORDER_ATOMIC);
    var code = sub + '.mean(' + size + ',' + key + ',' + offset + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_cartoon = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var seed = Python.valueToCode(this, 'seed', Python.ORDER_ATOMIC);
    var floa = Python.valueToCode(this, 'float', Python.ORDER_ATOMIC);
    var code = sub + '.cartoon(seed_threshold=' + seed + ',floating_threshold=' + floa + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_erode = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var code = sub + '.erode(' + size + ',' + threshold + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_dilate = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var code = sub + '.dilate(' + size + ',' + threshold + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_flood_fill = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var list = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var color = Python.valueToCode(this, 'color', Python.ORDER_ATOMIC);
    var seed = Python.valueToCode(this, 'seed', Python.ORDER_ATOMIC);
    var floa = Python.valueToCode(this, 'float', Python.ORDER_ATOMIC);
    var invert = Python.valueToCode(this, 'invert', Python.ORDER_ATOMIC);
    var clear = Python.valueToCode(this, 'clear', Python.ORDER_ATOMIC);
    var code = sub + '.flood_fill(' + list + ',' + seed + ',' + floa + ',' + color + ',' + invert + ',' + clear + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_linpolar = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = sub + '.linpolar(' + key + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_invert = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var code = sub + '.invert()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_lens_corr = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var strength = Python.valueToCode(this, 'strength', Python.ORDER_ATOMIC);
    var zoom = Python.valueToCode(this, 'zoom', Python.ORDER_ATOMIC);
    var code = sub + '.lens_corr(' + strength + ',' + zoom + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_binary = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var invert = Python.valueToCode(this, 'invert', Python.ORDER_ATOMIC);
    var zero = Python.valueToCode(this, 'zero', Python.ORDER_ATOMIC);
    var code = sub + '.binary([' + threshold + '],invert=' + invert + ',zero=' + zero + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_morph = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var kernel = Python.valueToCode(this, 'kernel', Python.ORDER_ATOMIC);
    var code = sub + '.morph(' + size + ',' + kernel + ')';
    return [code, Python.ORDER_ATOMIC];
};

//--条二维码----------------------------------------------//



export const image_find_barcodes = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var code = sub + '.find_barcodes(' + roi + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_find_qrcodes = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var code = sub + '.find_qrcodes(' + roi + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_find_apriltags = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var code = sub + '.find_apriltags(' + roi + ')';
    return [code, Python.ORDER_ATOMIC];
};


//--维码列表解析------------------------------------------//


export const image_barcode = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_qrcode = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};


export const image_apriltag = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};


//--颜色识别----------------------------------------------//

export const image_find_blobs = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var area1 = Python.valueToCode(this, 'area', Python.ORDER_ATOMIC);
    var pixel = Python.valueToCode(this, 'pixel', Python.ORDER_ATOMIC);
    var margin = Python.valueToCode(this, 'margin', Python.ORDER_ATOMIC);
    var merge = Python.valueToCode(this, 'key', Python.ORDER_ATOMIC);
    var code = sub + '.find_blobs([' + LIST + '],roi=' + roi + ',area_threshold=' + area1 + ',pixels_threshold=' + pixel + ',merge=' + merge + ',margin=' + margin + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const image_get_histogram = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var code = sub + '.get_histogram(roi=' + roi + ')';
    return [code, Python.ORDER_ATOMIC];
};

//--颜色列表解析------------------------------------------//


export const image_blob = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_Histogram = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};

export const image_percentile = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var per = Python.valueToCode(this, 'percentile', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.get_percentile(' + per + ').' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};


export const image_threshold = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.get_threhsold.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};


//--颜色格式转换------------------------------------------//

export const image_lab_to_rgb = function () {
    Python.definitions_['import_image_pic'] = 'import image as pic';
    var LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var code = 'pic.lab_to_rgb(' + LIST + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_rgb_to_lab = function () {
    Python.definitions_['import_image_pic'] = 'import image as pic';
    var LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var code = 'pic.rgb_to_lab(' + LIST + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_rgb_to_grayscale = function () {
    Python.definitions_['import_image_pic'] = 'import image as pic';
    var LIST = Python.valueToCode(this, 'LIST', Python.ORDER_ATOMIC);
    var code = 'pic.rgb_to_grayscale(' + LIST + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_grayscale_to_rgb = function () {
    Python.definitions_['import_image_pic'] = 'import image as pic';
    var g_value = Python.valueToCode(this, 'g_value', Python.ORDER_ATOMIC);
    var code = 'pic.grayscale_to_rgb(' + g_value + ')';
    return [code, Python.ORDER_ATOMIC];
};

//--特征识别----------------------------------------------//

export const image_find_hog = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var code = sub + '.find_hog(' + roi + ',' + size + ')';
    return [code, Python.ORDER_ATOMIC];
};


export const image_find_keypoints = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var roi = Python.valueToCode(this, 'roi', Python.ORDER_ATOMIC);
    var key = Python.valueToCode(this, 'max_keypoints', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var scale = Python.valueToCode(this, 'scale_factor', Python.ORDER_ATOMIC);
    var normalized = Python.valueToCode(this, 'normalized', Python.ORDER_ATOMIC);
    var code = sub + '.find_keypoints(roi=' + roi + ',max_keypoints=' + key + ',threshold=' + threshold + ',scale_factor=' + scale + ',normalized=' + normalized + ')';
    return [code, Python.ORDER_ATOMIC];
};

export const image_match_descriptor = function () {
    Python.definitions_['import_image_pic'] = 'import image as pic';
    var sub1 = Python.valueToCode(this, 'VAR1', Python.ORDER_ATOMIC);
    var sub2 = Python.valueToCode(this, 'VAR2', Python.ORDER_ATOMIC);
    var threshold = Python.valueToCode(this, 'threshold', Python.ORDER_ATOMIC);
    var code = 'pic.match_descriptor(' + sub1 + ',' + sub2 + ',threshold=' + threshold + ')';
    return [code, Python.ORDER_ATOMIC];
};



//--颜色列表解析------------------------------------------//


export const image_kptmatch = function () {
    Python.definitions_['import_image'] = 'import image';
    var sub = Python.valueToCode(this, 'VAR', Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, Python.ORDER_ATOMIC];
};













