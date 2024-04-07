'use strict';

goog.provide('Blockly.Python.me_go');
goog.require('Blockly.Python');


Blockly.Python.forBlock['ce_go_light_number'] = function () {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var code = 'car.' + this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['ce_go_led_bright'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "car.setonoff(" + op + ","+ bright+")\n";
    return code;
};

Blockly.Python.forBlock['ce_go_get_led_bright'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var code = "car.getrightness(" +op +")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['ce_go_get_led_state'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var code = "car.getonoff(" +op +")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.forBlock['ce_go_led_brightness'] = function() {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = "car.setbrightness(" + op + ","+ flag+")\n";
    return code;
};

Blockly.Python.forBlock['ce_go_stepper_keep'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var v = this.getFieldValue('VAR');
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'car.move("'+ v + '",' + speed +")\n";
    return code;
};

Blockly.Python.forBlock['ce_go_stepper_stop'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var v = this.getFieldValue('VAR');
    var code = 'car.move("'+ v + '")\n';
    return code;
};

Blockly.Python.forBlock['ce_go_dc_motor'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_car'] = 'from me_go import car';    
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_car'] = 'from ce_go import car';    
    };
    var wheel = this.getFieldValue('wheel');
    var v = this.getFieldValue('direction');
    if(wheel==0){
        if(v=='CW'){v='CCW'}
        else if(v=='CCW'){v='CW'}    
    }
    var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = "car.motor(car.MOTO["+wheel+'],"'+ v + '",' + speed+")\n";
    return code;
};

Blockly.Python.forBlock['ce_go_hall_attachInterrupt'] = function () {
    var dropdown_mode = this.getFieldValue('mode');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_hall_'+dropdown_mode] = 'from me_go import hall_'+dropdown_mode; 
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_hall_'+dropdown_mode] = 'from ce_go import hall_'+dropdown_mode;
    };
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code = 'hall_' + dropdown_mode + '.irq_cb(' + atta +  ')\n'
    return code;
};

Blockly.Python.forBlock['ce_go_hall_initialize'] = function () {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_hall_'+dropdown_mode] = 'from me_go import hall_'+dropdown_mode; 
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_hall_'+dropdown_mode] = 'from ce_go import hall_'+dropdown_mode;
    };
    var num = Blockly.Python.valueToCode(this,'num', Blockly.Python.ORDER_ATOMIC);
    if(args=='all'){
    var code = 'hall_' + dropdown_mode + '.initial(' + 'turns' + '=' + num + ',distance=' + num + ')\n'
    return code;
    }
    else{
    var code = 'hall_' + dropdown_mode + '.initial(' + args + '=' + num +  ')\n'
    return code;
    }
};

Blockly.Python.forBlock['ce_go_hall_data'] = function() {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_hall_'+dropdown_mode] = 'from me_go import hall_'+dropdown_mode; 
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_hall_'+dropdown_mode] = 'from ce_go import hall_'+dropdown_mode;
    };
    var code = 'hall_' + dropdown_mode + '.' + args + '';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['ce_go_pin_near_line'] = function(){
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    };
    var code = 'car.patrol()'+key+'';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['ce_go_pin_near'] = function(){
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    };
    var code = 'car.obstacle()'+key+'';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['ce_go_pin_near_state_change'] = function(){
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    };
    var code = 'car.ir_mode(car.' + key + ')\n';       
    return code;
};


Blockly.Python.forBlock['sensor_mixgome_eulerangles'] = function(){
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_mixgo_me_onboard_mxc6655xa'] = "from mixgo_me import onboard_mxc6655xa";
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_mixgo_ce_onboard_mxc6655xa'] = "from mixgo_ce import onboard_mxc6655xa";
    };
    var angle = this.getFieldValue('angle');
    var code = 'onboard_mxc6655xa.eulerangles(upright=True)'+angle;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['ce_go_pin_light'] = function(){
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if(version == "mixgo_me" || version == "mixgo_cc"){
        Blockly.Python.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if(version == "mixgo_ce"){
        Blockly.Python.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    };
    var code = 'car.light()'+key+'';
    return [code, Blockly.Python.ORDER_ATOMIC];
};