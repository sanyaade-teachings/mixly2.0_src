'use strict';

goog.provide('Blockly.Python.cv');

goog.require('Blockly.Python');

Blockly.Python.forBlock['cv_read_image'] = function () {
  Blockly.Python.definitions_['import_cv2'] = 'import cv2';
  var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
  var code = "cv2.imread(" + file + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['cv_show_image'] = function () {
    Blockly.Python.definitions_['import_cv2'] = 'import cv2';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "cv2.imshow(" + data + ',' + file + ")\n";
    return code;
}

Blockly.Python.forBlock['cv_write_image'] = function () {
    Blockly.Python.definitions_['import_cv2'] = 'import cv2';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "cv2.imwrite(" + data + ',' + file + ")\n";
    return code;
}

Blockly.Python.forBlock['cv_waitkey'] = function () {
    Blockly.Python.definitions_['import_cv2'] = 'import cv2';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var code = "cv2.waitKey(" + data + ")\n";
    return code;
}

Blockly.Python.forBlock['cv_destroy_all'] = function () {
    Blockly.Python.definitions_['import_cv2'] = 'import cv2';
    var code = "cv2.destroyAllWindows()\n";
    return code;
}

Blockly.Python.forBlock['cv_line_rect'] = function () {
    Blockly.Python.definitions_['import_cv2'] = 'import cv2';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
    var y1 = Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
    var x2 = Blockly.Python.valueToCode(this, 'x2', Blockly.Python.ORDER_ATOMIC);
    var y2 = Blockly.Python.valueToCode(this, 'y2', Blockly.Python.ORDER_ATOMIC);
    var thick = Blockly.Python.valueToCode(this, 'thick', Blockly.Python.ORDER_ATOMIC);
    var color = this.getFieldValue('FIELDNAME');
    var color1 = eval('0x'+color[1]+color[2])
    var color2 = eval('0x'+color[3]+color[4])
    var color3 = eval('0x'+color[5]+color[6])
    var direction = this.getFieldValue('DIR');
    var code = "cv2." + direction + "(" + file + ',(' + x1 + ',' + y1 + '),(' + x2 + ',' + y2 + '),(' + color3 + ',' + color2 + ',' + color1 + '),' + thick + ")\n";
    return code;
}

Blockly.Python.forBlock['cv_text'] = function () {
    Blockly.Python.definitions_['import_cv2'] = 'import cv2';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
    var y1 = Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var size = Blockly.Python.valueToCode(this, 'size', Blockly.Python.ORDER_ATOMIC);
    var thick = Blockly.Python.valueToCode(this, 'thick', Blockly.Python.ORDER_ATOMIC);
    var color = this.getFieldValue('FIELDNAME');
    var color1 = eval('0x'+color[1]+color[2])
    var color2 = eval('0x'+color[3]+color[4])
    var color3 = eval('0x'+color[5]+color[6])
    var font = this.getFieldValue('font');
    var code = "cv2.putText(" + file + ',' + data + ',(' + x1 + ',' + y1 + '),cv2.FONT_HERSHEY_' + font + ',' + size + ',(' + color3 + ',' + color2 + ',' + color1 + '),' + thick + ")\n";
    return code;
}

Blockly.Python.forBlock['cv_face_classifier'] = function () {
  Blockly.Python.definitions_['import_cv2'] = 'import cv2';
  var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
  var code = "cv2.CascadeClassifier(" + file + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['cv_face_detect'] = function () {
  Blockly.Python.definitions_['import_cv2'] = 'import cv2';
  var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
  var face = Blockly.Python.valueToCode(this, 'FACE', Blockly.Python.ORDER_ATOMIC);
  var scale = Blockly.Python.valueToCode(this, 'SCALE', Blockly.Python.ORDER_ATOMIC);
  var neighbor = Blockly.Python.valueToCode(this, 'NEIGHBOR', Blockly.Python.ORDER_ATOMIC);
  var code = face + ".detectMultiScale(" + file + ',scaleFactor=' +  scale + ',minNeighbors=' + neighbor + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['cv_face_detect_all'] = function () {
  Blockly.Python.definitions_['import_cv2'] = 'import cv2';
  var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
  var face = Blockly.Python.valueToCode(this, 'FACE', Blockly.Python.ORDER_ATOMIC);
  var scale = Blockly.Python.valueToCode(this, 'SCALE', Blockly.Python.ORDER_ATOMIC);
  var neighbor = Blockly.Python.valueToCode(this, 'NEIGHBOR', Blockly.Python.ORDER_ATOMIC);
  var x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
  var y1 = Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
  var x2 = Blockly.Python.valueToCode(this, 'x2', Blockly.Python.ORDER_ATOMIC);
  var y2 = Blockly.Python.valueToCode(this, 'y2', Blockly.Python.ORDER_ATOMIC);
  var code = face + ".detectMultiScale(" + file + ',scaleFactor=' +  scale + ',minNeighbors=' + neighbor + ',minSize=(' + x1 + ',' + y1 + '),maxSize=(' + x2 + ',' +y2 + "))";
  return [code, Blockly.Python.ORDER_ATOMIC];
};