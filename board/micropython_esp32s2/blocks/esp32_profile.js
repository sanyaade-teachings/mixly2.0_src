var profile = {
    parse: function (range) {
        let pinList = [];
        for (let i of range) {
            const pinInfo = i.split('-');
            switch (pinInfo.length) {
                case 1:
                    const pinNumStr = pinInfo[0].toString();
                    if (!isNaN(pinNumStr)) {
                        const pinNum = parseInt(pinNumStr);
                        pinList.push(pinNum);
                    }
                    break;
                case 2:
                    const pinNumStr0 = pinInfo[0].toString(),
                    pinNumStr1 = pinInfo[1].toString();
                    if (!isNaN(pinNumStr0) && !isNaN(pinNumStr1)) {
                        let pinNum0 = parseInt(pinNumStr0);
                        let pinNum1 = parseInt(pinNumStr1);
                        if (pinNum0 < 0 || pinNum1 < 0) break;
                        if (pinNum0 > pinNum1)
                            [ pinNum0, pinNum1 ] = [ pinNum1, pinNum0 ];
                        for (let j = pinNum0; j <= pinNum1; j++)
                            if (!pinList.includes(j))
                                pinList.push(j);
                    }
                    break;
            }
        }
        return pinList;
    },
    generate: function (pinMap, add1 = '', add2 = '') {
        const getPins = (list) => {
            let pins = [];
            let add1L, add1R, add2L, add2R;
            if (typeof add1 === 'object') {
                [ add1L, add1R ] = add1;
            } else {
                add1L = add1;
                add1R = '';
            }
            if (typeof add2 === 'object') {
                [ add2L, add2R ] = add2;
            } else {
                add2L = add1;
                add2R = '';
            }
            for (let i of list) {
                const pin = [ add1L + i + add1R, add2L + i + add2R ];
                pins.push(pin);
            }
            return pins;
        }
        const pinList = this.parse(pinMap);
        return getPins(pinList);
    }
};

profile["MixGo CE"] = {
    description: "MicroPython[ESP32C3 MixGo CE]",
    digital_pin: profile.generate([ '0-18','21-46']),
    input_pin: profile.generate(['0-18','21-46']),
    output_pin: profile.generate(['0-18','21-45']),
    pwm_input: profile.generate(['0-18','21-46'], 'pwm', 'pwm'),
    analog_input: profile.generate(['0-18','21-46'], 'adc', 'adc'),
    pwm_output: profile.generate(['0-18','21-45'], 'pwm', 'pwm'),
    analog_output: profile.generate(['0-18','21-45'], 'adc', 'adc'),
    espnow_channel: profile.generate([ '0-13']),
    haskylens_model: profile.generate([ '0-4']),    
    digital: profile.generate([ '0-18','21-45'], 'pin', 'pin'),
    pwm_pin: profile.generate(['0-18','21-45']),
    pwm: profile.generate([ '0-18','21-45' ], 'pwm', 'pwm'),
    analog_pin: profile.generate([ '1-18' ]),
    analog: profile.generate([ '1-18' ], 'adc', 'adc'),
    dac_pin: profile.generate([ '17-18' ]),
    dac: profile.generate([ '17-18' ], 'dac', 'dac'),
    touch: profile.generate([ '1-14' ], 'tc', 'tc'),
    touch_pin: profile.generate([ '1-14' ]),
    button: [["B1", "B1key"], ["B2", "B2key"], ["A1", "A1key"], ["A2", "A2key"],["A3", "A3key"],["A4", "A4key"]],
    buttonB: [["B1", "B1key"], ["B2", "B2key"]],
    axis: profile.generate([ '0-4' ]),
    exlcdh: profile.generate([ '0-15' ]),
    exlcdv: profile.generate([ '0-7' ]),    
    brightness: profile.generate([ '0-9' ]),
    tts_voice: profile.generate([ '0-16' ]),
    tts_builtin_music: profile.generate([ '0-47' ]),
    tts_bgmusic: profile.generate([ '0-15' ]),
    builtinimg: [["HEART", "onboard_matrix.HEART"],["HEART_SMALL", "onboard_matrix.HEART_SMALL"],["HAPPY", "onboard_matrix.HAPPY"],["SAD", "onboard_matrix.SAD"],["SMILE", "onboard_matrix.SMILE"],["SILLY", "onboard_matrix.SILLY"],["FABULOUS", "onboard_matrix.FABULOUS"],["SURPRISED", "onboard_matrix.SURPRISED"],["ASLEEP", "onboard_matrix.ASLEEP"],["ANGRY", "onboard_matrix.ANGRY"],["CONFUSED", "onboard_matrix.CONFUSED"],["NO", "onboard_matrix.NO"],["YES", "onboard_matrix.YES"],["LEFT_ARROW", "onboard_matrix.LEFT_ARROW"],["RIGHT_ARROW", "onboard_matrix.RIGHT_ARROW"],["DRESS", "onboard_matrix.DRESS"],["TRANSFORMERS", "onboard_matrix.TRANSFORMERS"],["SCISSORS", "onboard_matrix.SCISSORS"],["EXIT", "onboard_matrix.EXIT"],["TREE", "onboard_matrix.TREE"],["PACMAN", "onboard_matrix.PACMAN"],["TARGET", "onboard_matrix.TARGET"],["TSHIRT", "onboard_matrix.TSHIRT"],["ROLLERSKATE", "onboard_matrix.ROLLERSKATE"],["DUCK", "onboard_matrix.DUCK"],["HOUSE", "onboard_matrix.HOUSE"],["TORTOISE", "onboard_matrix.TORTOISE"],["BUTTERFLY", "onboard_matrix.BUTTERFLY"],["STICKFIGURE", "onboard_matrix.STICKFIGURE"],["GHOST", "onboard_matrix.GHOST"],["PITCHFORK", "onboard_matrix.PITCHFORK"],["MUSIC_QUAVERS", "onboard_matrix.MUSIC_QUAVERS"],["MUSIC_QUAVER", "onboard_matrix.MUSIC_QUAVER"],["MUSIC_CROTCHET", "onboard_matrix.MUSIC_CROTCHET"],["COW", "onboard_matrix.COW"],["RABBIT", "onboard_matrix.RABBIT"],["SQUARE_SMALL", "onboard_matrix.SQUARE_SMALL"],["SQUARE", "onboard_matrix.SQUARE"],["DIAMOND_SMALL", "onboard_matrix.DIAMOND_SMALL"],["DIAMOND", "onboard_matrix.DIAMOND"],["CHESSBOARD", "onboard_matrix.CHESSBOARD"],["TRIANGLE_LEFT", "onboard_matrix.TRIANGLE_LEFT"],["TRIANGLE", "onboard_matrix.TRIANGLE"],["SNAKE", "onboard_matrix.SNAKE"],["UMBRELLA", "onboard_matrix.UMBRELLA"],["SKULL", "onboard_matrix.SKULL"],["GIRAFFE", "onboard_matrix.GIRAFFE"],["SWORD", "onboard_matrix.SWORD"]],
    //builtinimg: [["HEART", "onboard_matrix.HEART"],["HEART_SMALL", "onboard_matrix.HEART_SMALL"],["HAPPY", "onboard_matrix.HAPPY"],["SAD", "onboard_matrix.SAD"],["SMILE", "onboard_matrix.SMILE"],["SILLY", "onboard_matrix.SILLY"],["FABULOUS", "onboard_matrix.FABULOUS"],["SURPRISED", "onboard_matrix.SURPRISED"],["ASLEEP", "onboard_matrix.ASLEEP"],["ANGRY", "onboard_matrix.ANGRY"],["CONFUSED", "onboard_matrix.CONFUSED"],["NO", "onboard_matrix.NO"],["YES", "onboard_matrix.YES"]],
    builtinimg_extern: [["HEART", "matrix32x12.Matrix.HEART"],["HEART_SMALL", "matrix32x12.Matrix.HEART_SMALL"],["HAPPY", "matrix32x12.Matrix.HAPPY"],["SAD", "matrix32x12.Matrix.SAD"],["SMILE", "matrix32x12.Matrix.SMILE"],["SILLY", "matrix32x12.Matrix.SILLY"],["FABULOUS", "matrix32x12.Matrix.FABULOUS"],["SURPRISED", "matrix32x12.Matrix.SURPRISED"],["ASLEEP", "matrix32x12.Matrix.ASLEEP"],["ANGRY", "matrix32x12.Matrix.ANGRY"],["CONFUSED", "matrix32x12.Matrix.CONFUSED"],["NO", "matrix32x12.Matrix.NO"],["YES", "matrix32x12.Matrix.YES"],["LEFT_ARROW", "matrix32x12.Matrix.LEFT_ARROW"],["RIGHT_ARROW", "matrix32x12.Matrix.RIGHT_ARROW"],["DRESS", "matrix32x12.Matrix.DRESS"],["TRANSFORMERS", "matrix32x12.Matrix.TRANSFORMERS"],["SCISSORS", "matrix32x12.Matrix.SCISSORS"],["EXIT", "matrix32x12.Matrix.EXIT"],["TREE", "matrix32x12.Matrix.TREE"],["PACMAN", "matrix32x12.Matrix.PACMAN"],["TARGET", "matrix32x12.Matrix.TARGET"],["TSHIRT", "matrix32x12.Matrix.TSHIRT"],["ROLLERSKATE", "matrix32x12.Matrix.ROLLERSKATE"],["DUCK", "matrix32x12.Matrix.DUCK"],["HOUSE", "matrix32x12.Matrix.HOUSE"],["TORTOISE", "matrix32x12.Matrix.TORTOISE"],["BUTTERFLY", "matrix32x12.Matrix.BUTTERFLY"],["STICKFIGURE", "matrix32x12.Matrix.STICKFIGURE"],["GHOST", "matrix32x12.Matrix.GHOST"],["PITCHFORK", "matrix32x12.Matrix.PITCHFORK"],["onboard_music_QUAVERS", "matrix32x12.Matrix.onboard_music_QUAVERS"],["onboard_music_QUAVER", "matrix32x12.Matrix.onboard_music_QUAVER"],["onboard_music_CROTCHET", "matrix32x12.Matrix.onboard_music_CROTCHET"],["COW", "matrix32x12.Matrix.COW"],["RABBIT", "matrix32x12.Matrix.RABBIT"],["SQUARE_SMALL", "matrix32x12.Matrix.SQUARE_SMALL"],["SQUARE", "matrix32x12.Matrix.SQUARE"],["DIAMOND_SMALL", "matrix32x12.Matrix.DIAMOND_SMALL"],["DIAMOND", "matrix32x12.Matrix.DIAMOND"],["CHESSBOARD", "matrix32x12.Matrix.CHESSBOARD"],["TRIANGLE_LEFT", "matrix32x12.Matrix.TRIANGLE_LEFT"],["TRIANGLE", "matrix32x12.Matrix.TRIANGLE"],["SNAKE", "matrix32x12.Matrix.SNAKE"],["UMBRELLA", "matrix32x12.Matrix.UMBRELLA"],["SKULL", "matrix32x12.Matrix.SKULL"],["GIRAFFE", "matrix32x12.Matrix.GIRAFFE"],["SWORD", "matrix32x12.Matrix.SWORD"]],
    imglist: [["ALL_CLOCKS", "matrix.Image.ALL_CLOCKS"], ["ALL_ARROWS", "matrix.Image.ALL_ARROWS"]],
    playlist: [["DADADADUM", "onboard_music.DADADADUM"], ["ENTERTAINER", "onboard_music.ENTERTAINER"], ["PRELUDE", "onboard_music.PRELUDE"], ["ODE", "onboard_music.ODE"], ["NYAN", "onboard_music.NYAN"], ["RINGTONE", "onboard_music.RINGTONE"], ["FUNK", "onboard_music.FUNK"], ["BLUES", "onboard_music.BLUES"], ["BIRTHDAY", "onboard_music.BIRTHDAY"], ["WEDDING", "onboard_music.WEDDING"], ["FUNERAL", "onboard_music.FUNERAL"], ["PUNCHLINE", "onboard_music.PUNCHLINE"], ["PYTHON", "onboard_music.PYTHON"], ["BADDY", "onboard_music.BADDY"], ["CHASE", "onboard_music.CHASE"], ["BA_DING", "onboard_music.BA_DING"], ["WAWAWAWAA", "onboard_music.WAWAWAWAA"], ["JUMP_UP", "onboard_music.JUMP_UP"], ["JUMP_DOWN", "onboard_music.JUMP_DOWN"], ["POWER_UP", "onboard_music.POWER_UP"], ["POWER_DOWN", "onboard_music.POWER_DOWN"]],
    playlist_extern: [["DADADADUM", "DADADADUM"], ["ENTERTAINER", "ENTERTAINER"], ["PRELUDE", "PRELUDE"], ["ODE", "ODE"], ["NYAN", "NYAN"], ["RINGTONE", "RINGTONE"], ["FUNK", "FUNK"], ["BLUES", "BLUES"], ["BIRTHDAY", "BIRTHDAY"], ["WEDDING", "WEDDING"], ["FUNERAL", "FUNERAL"], ["PUNCHLINE", "PUNCHLINE"], ["PYTHON", "PYTHON"], ["BADDY", "BADDY"], ["CHASE", "CHASE"], ["BA_DING", "BA_DING"], ["WAWAWAWAA", "WAWAWAWAA"], ["JUMP_UP", "JUMP_UP"], ["JUMP_DOWN", "JUMP_DOWN"], ["POWER_UP", "POWER_UP"], ["POWER_DOWN", "POWER_DOWN"]],
    tone_notes: [["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],
       ["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],
       ["NOTE_C5", "523"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]],
    serial_pin: [["pin0", "0"], ["pin1", "1"], ["pin2", "2"], ["pin8", "8"], ["pin12", "12"], ["pin13", "13"], ["pin14", "14"], ["pin15", "15"], ["pin16", "16"]],
    radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
    radio_datarate:[["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
    one_more:[["ONE_SHOT", "ONE_SHOT"], ["PERIODIC", "PERIODIC"]],
    digital_dot:[["0", "0"], ["1", "1"], ["2", "2"]],
};

profile["ESP32S2 Generic"] = {
    description: "MicroPython[ESP32C3 MixGo CC]",
    digital_pin: profile.generate([ '0-42','45']),
    input_pin: profile.generate(['0-42','45-46']),
    output_pin: profile.generate(['0-42','45']),
    pwm_input: profile.generate(['0-42','45-46'], 'pwm', 'pwm'),
    analog_input: profile.generate(['0-18','21-46'], 'adc', 'adc'),
    pwm_output: profile.generate(['0-42','45'], 'pwm', 'pwm'),
    analog_output: profile.generate(['0-42','45'], 'adc', 'adc'),
    espnow_channel: profile.generate([ '0-13']),
    haskylens_model: profile.generate([ '0-4']),
    digital: profile.generate([ '0-42','45'], 'pin', 'pin'),
    pwm_pin: profile.generate(['0-42','45']),
    pwm: profile.generate([ '0-42','45' ], 'pwm', 'pwm'),
    analog_pin: profile.generate([ '1-20' ]),
    analog: profile.generate([ '1-20' ], 'adc', 'adc'),
    dac_pin: profile.generate([ '17-18' ]),
    dac: profile.generate([ '17-18' ], 'dac', 'dac'),
    touch: profile.generate([ '1-14' ], 'tc', 'tc'),
    touch_pin: profile.generate([ '1-14' ]),
    button: [["B1", "B1key"], ["B2", "B2key"], ["A1", "A1key"], ["A2", "A2key"],["A3", "A3key"],["A4", "A4key"]],
    buttonB: [["B1", "B1key"], ["B2", "B2key"]],
    axis: profile.generate([ '0-4' ]),
    exlcdh: profile.generate([ '0-15' ]),
    exlcdv: profile.generate([ '0-7' ]),    
    brightness: profile.generate([ '0-9' ]),
    tts_voice: profile.generate([ '0-16' ]),
    tts_builtin_music: profile.generate([ '0-47' ]),
    tts_bgmusic: profile.generate([ '0-15' ]),
    builtinimg: [["HEART", "onboard_matrix.HEART"],["HEART_SMALL", "onboard_matrix.HEART_SMALL"],["HAPPY", "onboard_matrix.HAPPY"],["SAD", "onboard_matrix.SAD"],["SMILE", "onboard_matrix.SMILE"],["SILLY", "onboard_matrix.SILLY"],["FABULOUS", "onboard_matrix.FABULOUS"],["SURPRISED", "onboard_matrix.SURPRISED"],["ASLEEP", "onboard_matrix.ASLEEP"],["ANGRY", "onboard_matrix.ANGRY"],["CONFUSED", "onboard_matrix.CONFUSED"],["NO", "onboard_matrix.NO"],["YES", "onboard_matrix.YES"],["LEFT_ARROW", "onboard_matrix.LEFT_ARROW"],["RIGHT_ARROW", "onboard_matrix.RIGHT_ARROW"],["DRESS", "onboard_matrix.DRESS"],["TRANSFORMERS", "onboard_matrix.TRANSFORMERS"],["SCISSORS", "onboard_matrix.SCISSORS"],["EXIT", "onboard_matrix.EXIT"],["TREE", "onboard_matrix.TREE"],["PACMAN", "onboard_matrix.PACMAN"],["TARGET", "onboard_matrix.TARGET"],["TSHIRT", "onboard_matrix.TSHIRT"],["ROLLERSKATE", "onboard_matrix.ROLLERSKATE"],["DUCK", "onboard_matrix.DUCK"],["HOUSE", "onboard_matrix.HOUSE"],["TORTOISE", "onboard_matrix.TORTOISE"],["BUTTERFLY", "onboard_matrix.BUTTERFLY"],["STICKFIGURE", "onboard_matrix.STICKFIGURE"],["GHOST", "onboard_matrix.GHOST"],["PITCHFORK", "onboard_matrix.PITCHFORK"],["MUSIC_QUAVERS", "onboard_matrix.MUSIC_QUAVERS"],["MUSIC_QUAVER", "onboard_matrix.MUSIC_QUAVER"],["MUSIC_CROTCHET", "onboard_matrix.MUSIC_CROTCHET"],["COW", "onboard_matrix.COW"],["RABBIT", "onboard_matrix.RABBIT"],["SQUARE_SMALL", "onboard_matrix.SQUARE_SMALL"],["SQUARE", "onboard_matrix.SQUARE"],["DIAMOND_SMALL", "onboard_matrix.DIAMOND_SMALL"],["DIAMOND", "onboard_matrix.DIAMOND"],["CHESSBOARD", "onboard_matrix.CHESSBOARD"],["TRIANGLE_LEFT", "onboard_matrix.TRIANGLE_LEFT"],["TRIANGLE", "onboard_matrix.TRIANGLE"],["SNAKE", "onboard_matrix.SNAKE"],["UMBRELLA", "onboard_matrix.UMBRELLA"],["SKULL", "onboard_matrix.SKULL"],["GIRAFFE", "onboard_matrix.GIRAFFE"],["SWORD", "onboard_matrix.SWORD"]],
    //builtinimg: [["HEART", "onboard_matrix.HEART"],["HEART_SMALL", "onboard_matrix.HEART_SMALL"],["HAPPY", "onboard_matrix.HAPPY"],["SAD", "onboard_matrix.SAD"],["SMILE", "onboard_matrix.SMILE"],["SILLY", "onboard_matrix.SILLY"],["FABULOUS", "onboard_matrix.FABULOUS"],["SURPRISED", "onboard_matrix.SURPRISED"],["ASLEEP", "onboard_matrix.ASLEEP"],["ANGRY", "onboard_matrix.ANGRY"],["CONFUSED", "onboard_matrix.CONFUSED"],["NO", "onboard_matrix.NO"],["YES", "onboard_matrix.YES"]],
    builtinimg_extern: [["HEART", "matrix32x12.Matrix.HEART"],["HEART_SMALL", "matrix32x12.Matrix.HEART_SMALL"],["HAPPY", "matrix32x12.Matrix.HAPPY"],["SAD", "matrix32x12.Matrix.SAD"],["SMILE", "matrix32x12.Matrix.SMILE"],["SILLY", "matrix32x12.Matrix.SILLY"],["FABULOUS", "matrix32x12.Matrix.FABULOUS"],["SURPRISED", "matrix32x12.Matrix.SURPRISED"],["ASLEEP", "matrix32x12.Matrix.ASLEEP"],["ANGRY", "matrix32x12.Matrix.ANGRY"],["CONFUSED", "matrix32x12.Matrix.CONFUSED"],["NO", "matrix32x12.Matrix.NO"],["YES", "matrix32x12.Matrix.YES"],["LEFT_ARROW", "matrix32x12.Matrix.LEFT_ARROW"],["RIGHT_ARROW", "matrix32x12.Matrix.RIGHT_ARROW"],["DRESS", "matrix32x12.Matrix.DRESS"],["TRANSFORMERS", "matrix32x12.Matrix.TRANSFORMERS"],["SCISSORS", "matrix32x12.Matrix.SCISSORS"],["EXIT", "matrix32x12.Matrix.EXIT"],["TREE", "matrix32x12.Matrix.TREE"],["PACMAN", "matrix32x12.Matrix.PACMAN"],["TARGET", "matrix32x12.Matrix.TARGET"],["TSHIRT", "matrix32x12.Matrix.TSHIRT"],["ROLLERSKATE", "matrix32x12.Matrix.ROLLERSKATE"],["DUCK", "matrix32x12.Matrix.DUCK"],["HOUSE", "matrix32x12.Matrix.HOUSE"],["TORTOISE", "matrix32x12.Matrix.TORTOISE"],["BUTTERFLY", "matrix32x12.Matrix.BUTTERFLY"],["STICKFIGURE", "matrix32x12.Matrix.STICKFIGURE"],["GHOST", "matrix32x12.Matrix.GHOST"],["PITCHFORK", "matrix32x12.Matrix.PITCHFORK"],["onboard_music_QUAVERS", "matrix32x12.Matrix.onboard_music_QUAVERS"],["onboard_music_QUAVER", "matrix32x12.Matrix.onboard_music_QUAVER"],["onboard_music_CROTCHET", "matrix32x12.Matrix.onboard_music_CROTCHET"],["COW", "matrix32x12.Matrix.COW"],["RABBIT", "matrix32x12.Matrix.RABBIT"],["SQUARE_SMALL", "matrix32x12.Matrix.SQUARE_SMALL"],["SQUARE", "matrix32x12.Matrix.SQUARE"],["DIAMOND_SMALL", "matrix32x12.Matrix.DIAMOND_SMALL"],["DIAMOND", "matrix32x12.Matrix.DIAMOND"],["CHESSBOARD", "matrix32x12.Matrix.CHESSBOARD"],["TRIANGLE_LEFT", "matrix32x12.Matrix.TRIANGLE_LEFT"],["TRIANGLE", "matrix32x12.Matrix.TRIANGLE"],["SNAKE", "matrix32x12.Matrix.SNAKE"],["UMBRELLA", "matrix32x12.Matrix.UMBRELLA"],["SKULL", "matrix32x12.Matrix.SKULL"],["GIRAFFE", "matrix32x12.Matrix.GIRAFFE"],["SWORD", "matrix32x12.Matrix.SWORD"]],
    imglist: [["ALL_CLOCKS", "matrix.Image.ALL_CLOCKS"], ["ALL_ARROWS", "matrix.Image.ALL_ARROWS"]],
    playlist: [["DADADADUM", "onboard_music.DADADADUM"], ["ENTERTAINER", "onboard_music.ENTERTAINER"], ["PRELUDE", "onboard_music.PRELUDE"], ["ODE", "onboard_music.ODE"], ["NYAN", "onboard_music.NYAN"], ["RINGTONE", "onboard_music.RINGTONE"], ["FUNK", "onboard_music.FUNK"], ["BLUES", "onboard_music.BLUES"], ["BIRTHDAY", "onboard_music.BIRTHDAY"], ["WEDDING", "onboard_music.WEDDING"], ["FUNERAL", "onboard_music.FUNERAL"], ["PUNCHLINE", "onboard_music.PUNCHLINE"], ["PYTHON", "onboard_music.PYTHON"], ["BADDY", "onboard_music.BADDY"], ["CHASE", "onboard_music.CHASE"], ["BA_DING", "onboard_music.BA_DING"], ["WAWAWAWAA", "onboard_music.WAWAWAWAA"], ["JUMP_UP", "onboard_music.JUMP_UP"], ["JUMP_DOWN", "onboard_music.JUMP_DOWN"], ["POWER_UP", "onboard_music.POWER_UP"], ["POWER_DOWN", "onboard_music.POWER_DOWN"]],
    playlist_extern: [["DADADADUM", "DADADADUM"], ["ENTERTAINER", "ENTERTAINER"], ["PRELUDE", "PRELUDE"], ["ODE", "ODE"], ["NYAN", "NYAN"], ["RINGTONE", "RINGTONE"], ["FUNK", "FUNK"], ["BLUES", "BLUES"], ["BIRTHDAY", "BIRTHDAY"], ["WEDDING", "WEDDING"], ["FUNERAL", "FUNERAL"], ["PUNCHLINE", "PUNCHLINE"], ["PYTHON", "PYTHON"], ["BADDY", "BADDY"], ["CHASE", "CHASE"], ["BA_DING", "BA_DING"], ["WAWAWAWAA", "WAWAWAWAA"], ["JUMP_UP", "JUMP_UP"], ["JUMP_DOWN", "JUMP_DOWN"], ["POWER_UP", "POWER_UP"], ["POWER_DOWN", "POWER_DOWN"]],
    tone_notes: [["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],
       ["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],
       ["NOTE_C5", "523"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]],
    serial_pin: [["pin0", "0"], ["pin1", "1"], ["pin2", "2"], ["pin8", "8"], ["pin12", "12"], ["pin13", "13"], ["pin14", "14"], ["pin15", "15"], ["pin16", "16"]],
    radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
    radio_datarate:[["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
    one_more:[["ONE_SHOT", "ONE_SHOT"], ["PERIODIC", "PERIODIC"]],
    digital_dot:[["0", "0"], ["1", "1"], ["2", "2"]],
};