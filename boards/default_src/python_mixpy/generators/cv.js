import Python from '../../python/python_generator';

export const cv_read_image = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "cv2.imread(" + file + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const cv_show_image = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "cv2.imshow(" + data + ',' + file + ")\n";
    return code;
}

export const cv_write_image = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "cv2.imwrite(" + data + ',' + file + ")\n";
    return code;
}

export const cv_waitkey = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var code = "cv2.waitKey(" + data + ")\n";
    return code;
}

export const cv_destroy_all = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var code = "cv2.destroyAllWindows()\n";
    return code;
}

export const cv_line_rect = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var x1 = Python.valueToCode(this, 'x1', Python.ORDER_ATOMIC);
    var y1 = Python.valueToCode(this, 'y1', Python.ORDER_ATOMIC);
    var x2 = Python.valueToCode(this, 'x2', Python.ORDER_ATOMIC);
    var y2 = Python.valueToCode(this, 'y2', Python.ORDER_ATOMIC);
    var thick = Python.valueToCode(this, 'thick', Python.ORDER_ATOMIC);
    var color = this.getFieldValue('FIELDNAME');
    var color1 = eval('0x' + color[1] + color[2])
    var color2 = eval('0x' + color[3] + color[4])
    var color3 = eval('0x' + color[5] + color[6])
    var direction = this.getFieldValue('DIR');
    var code = "cv2." + direction + "(" + file + ',(' + x1 + ',' + y1 + '),(' + x2 + ',' + y2 + '),(' + color3 + ',' + color2 + ',' + color1 + '),' + thick + ")\n";
    return code;
}

export const cv_text = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var x1 = Python.valueToCode(this, 'x1', Python.ORDER_ATOMIC);
    var y1 = Python.valueToCode(this, 'y1', Python.ORDER_ATOMIC);
    var data = Python.valueToCode(this, 'data', Python.ORDER_ATOMIC);
    var size = Python.valueToCode(this, 'size', Python.ORDER_ATOMIC);
    var thick = Python.valueToCode(this, 'thick', Python.ORDER_ATOMIC);
    var color = this.getFieldValue('FIELDNAME');
    var color1 = eval('0x' + color[1] + color[2])
    var color2 = eval('0x' + color[3] + color[4])
    var color3 = eval('0x' + color[5] + color[6])
    var font = this.getFieldValue('font');
    var code = "cv2.putText(" + file + ',' + data + ',(' + x1 + ',' + y1 + '),cv2.FONT_HERSHEY_' + font + ',' + size + ',(' + color3 + ',' + color2 + ',' + color1 + '),' + thick + ")\n";
    return code;
}

export const cv_face_classifier = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var code = "cv2.CascadeClassifier(" + file + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const cv_face_detect = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var face = Python.valueToCode(this, 'FACE', Python.ORDER_ATOMIC);
    var scale = Python.valueToCode(this, 'SCALE', Python.ORDER_ATOMIC);
    var neighbor = Python.valueToCode(this, 'NEIGHBOR', Python.ORDER_ATOMIC);
    var code = face + ".detectMultiScale(" + file + ',scaleFactor=' + scale + ',minNeighbors=' + neighbor + ")";
    return [code, Python.ORDER_ATOMIC];
};

export const cv_face_detect_all = function () {
    Python.definitions_['import_cv2'] = 'import cv2';
    var file = Python.valueToCode(this, 'FILE', Python.ORDER_ATOMIC);
    var face = Python.valueToCode(this, 'FACE', Python.ORDER_ATOMIC);
    var scale = Python.valueToCode(this, 'SCALE', Python.ORDER_ATOMIC);
    var neighbor = Python.valueToCode(this, 'NEIGHBOR', Python.ORDER_ATOMIC);
    var x1 = Python.valueToCode(this, 'x1', Python.ORDER_ATOMIC);
    var y1 = Python.valueToCode(this, 'y1', Python.ORDER_ATOMIC);
    var x2 = Python.valueToCode(this, 'x2', Python.ORDER_ATOMIC);
    var y2 = Python.valueToCode(this, 'y2', Python.ORDER_ATOMIC);
    var code = face + ".detectMultiScale(" + file + ',scaleFactor=' + scale + ',minNeighbors=' + neighbor + ',minSize=(' + x1 + ',' + y1 + '),maxSize=(' + x2 + ',' + y2 + "))";
    return [code, Python.ORDER_ATOMIC];
};