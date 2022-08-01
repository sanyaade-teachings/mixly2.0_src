var profile = {
    esp32: {
        description: "MicroPython[ESP32]",
        digital_pin: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"]],
        digital: [["pin0", "pin0"], ["pin2", "pin2"], ["pin4", "pin4"], ["pin5", "pin5"], ["pin12", "pin12"], ["pin13", "pin13"], ["pin14", "pin14"], ["pin15", "pin15"], ["pin16", "pin16"], ["pin17", "pin17"], ["pin18", "pin18"], ["pin19", "pin19"], ["pin20", "pin20"], ["pin21", "pin21"], ["pin22", "pin22"], ["pin23", "pin23"], ["pin25", "pin25"], ["pin26", "pin26"], ["pin27", "pin27"], ["pin32", "pin32"], ["pin33", "pin33"], ["pin34", "pin34"], ["pin35", "pin35"], ["pin36", "pin36"], ["pin37", "pin37"], ["pin38", "pin38"], ["pin39", "pin39"]],
        pwm_pin: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"]],
        pwm: [["pwm0", "pwm0"], ["pwm2", "pwm2"], ["pwm4", "pwm4"], ["pwm5", "pwm5"], ["pwm12", "pwm12"], ["pwm13", "pwm13"], ["pwm14", "pwm14"], ["pwm15", "pwm15"], ["pwm16", "pwm16"], ["pwm17", "pwm17"], ["pwm18", "pwm18"], ["pwm19", "pwm19"], ["pwm20", "pwm20"], ["pwm21", "pwm21"], ["pwm22", "pwm22"], ["pwm23", "pwm23"], ["pwm25", "pwm25"], ["pwm26", "pwm26"], ["pwm27", "pwm27"], ["pwm32", "pwm32"]],
        analog_pin: [["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"]],
        analog: [["adc32", "adc32"], ["adc33", "adc33"], ["adc34", "adc34"], ["adc35", "adc35"], ["adc36", "adc36"], ["adc37", "adc37"], ["adc38", "adc38"], ["adc39", "adc39"]],
        dac_pin: [["25", "25"], ["26", "26"]],
        dac: [["dac25", "dac25"], ["dac26", "dac26"]],
        touch: [["tc0", "tc0"], ["tc2", "tc2"], ["tc4", "tc4"], ["tc12", "tc12"], ["tc13", "tc13"], ["tc14", "tc14"], ["tc15", "tc15"], ["tc27", "tc27"], ["tc32", "tc32"], ["tc33", "tc33"]],
        touch_pin: [["0", "0"], ["2", "2"], ["4", "4"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["27", "27"], ["32", "32"], ["33", "33"]],
        button:[["A", "button_a"], ["B", "button_b"]],
        axis:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]],
        exlcdh:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"],["10", "10"], ["11", "11"],["12", "12"], ["13", "13"],["14", "14"], ["15", "15"]],
        exlcdv:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]],
        brightness:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]],
        builtinimg: [["HEART", "onboard_matrix.HEART"],["HEART_SMALL", "onboard_matrix.HEART_SMALL"],["HAPPY", "onboard_matrix.HAPPY"],["SAD", "onboard_matrix.SAD"],["SMILE", "onboard_matrix.SMILE"],["SILLY", "onboard_matrix.SILLY"],["FABULOUS", "onboard_matrix.FABULOUS"],["SURPRISED", "onboard_matrix.SURPRISED"],["ASLEEP", "onboard_matrix.ASLEEP"],["ANGRY", "onboard_matrix.ANGRY"],["CONFUSED", "onboard_matrix.CONFUSED"],["NO", "onboard_matrix.NO"],["YES", "onboard_matrix.YES"],["LEFT_ARROW", "onboard_matrix.LEFT_ARROW"],["RIGHT_ARROW", "onboard_matrix.RIGHT_ARROW"],["DRESS", "onboard_matrix.DRESS"],["TRANSFORMERS", "onboard_matrix.TRANSFORMERS"],["SCISSORS", "onboard_matrix.SCISSORS"],["EXIT", "onboard_matrix.EXIT"],["TREE", "onboard_matrix.TREE"],["PACMAN", "onboard_matrix.PACMAN"],["TARGET", "onboard_matrix.TARGET"],["TSHIRT", "onboard_matrix.TSHIRT"],["ROLLERSKATE", "onboard_matrix.ROLLERSKATE"],["DUCK", "onboard_matrix.DUCK"],["HOUSE", "onboard_matrix.HOUSE"],["TORTOISE", "onboard_matrix.TORTOISE"],["BUTTERFLY", "onboard_matrix.BUTTERFLY"],["STICKFIGURE", "onboard_matrix.STICKFIGURE"],["GHOST", "onboard_matrix.GHOST"],["PITCHFORK", "onboard_matrix.PITCHFORK"],["MUSIC_QUAVERS", "onboard_matrix.MUSIC_QUAVERS"],["MUSIC_QUAVER", "onboard_matrix.MUSIC_QUAVER"],["MUSIC_CROTCHET", "onboard_matrix.MUSIC_CROTCHET"],["COW", "onboard_matrix.COW"],["RABBIT", "onboard_matrix.RABBIT"],["SQUARE_SMALL", "onboard_matrix.SQUARE_SMALL"],["SQUARE", "onboard_matrix.SQUARE"],["DIAMOND_SMALL", "onboard_matrix.DIAMOND_SMALL"],["DIAMOND", "onboard_matrix.DIAMOND"],["CHESSBOARD", "onboard_matrix.CHESSBOARD"],["TRIANGLE_LEFT", "onboard_matrix.TRIANGLE_LEFT"],["TRIANGLE", "onboard_matrix.TRIANGLE"],["SNAKE", "onboard_matrix.SNAKE"],["UMBRELLA", "onboard_matrix.UMBRELLA"],["SKULL", "onboard_matrix.SKULL"],["GIRAFFE", "onboard_matrix.GIRAFFE"],["SWORD", "onboard_matrix.SWORD"]],
        imglist: [["ALL_CLOCKS", "onboard_matrix.ALL_CLOCKS"], ["ALL_ARROWS", "onboard_matrix.ALL_ARROWS"]],
        playlist: [["DADADADUM", "music.DADADADUM"], ["ENTERTAINER", "music.ENTERTAINER"], ["PRELUDE", "music.PRELUDE"], ["ODE", "music.ODE"], ["NYAN", "music.NYAN"], ["RINGTONE", "music.RINGTONE"], ["FUNK", "music.FUNK"], ["BLUES", "music.BLUES"], ["BIRTHDAY", "music.BIRTHDAY"], ["WEDDING", "music.WEDDING"], ["FUNERAL", "music.FUNERAL"], ["PUNCHLINE", "music.PUNCHLINE"], ["PYTHON", "music.PYTHON"], ["BADDY", "music.BADDY"], ["CHASE", "music.CHASE"], ["BA_DING", "music.BA_DING"], ["WAWAWAWAA", "music.WAWAWAWAA"], ["JUMP_UP", "music.JUMP_UP"], ["JUMP_DOWN", "music.JUMP_DOWN"], ["POWER_UP", "music.POWER_UP"], ["POWER_DOWN", "music.POWER_DOWN"]],
        tone_notes: [["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],
           ["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],
           ["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]],
        serial_pin: [["pin0", "0"], ["pin1", "1"], ["pin2", "2"], ["pin8", "8"], ["pin12", "12"], ["pin13", "13"], ["pin14", "14"], ["pin15", "15"], ["pin16", "16"]],
	radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
	radio_datarate:[["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
    one_more:[["ONE_SHOT", "ONE_SHOT"], ["PERIODIC", "PERIODIC"]],
    digital_dot:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]],
    }
};


profile["default"] =
profile["MixGo PE"] = 
profile["MixGo(ESP32, 4M)"] =
profile["ESP32 Generic"] =
profile["esp32"];