import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import pins from './pins/pins';

import * as CommonEthernetBlocks from '../arduino_common/blocks/ethernet';
import * as CommonTextBlocks from '../arduino_common/blocks/text';

import * as AvrActuatorBlocks from '../arduino_avr/blocks/actuator';
import * as AvrBlynkBlocks from '../arduino_avr/blocks/blynk';
import * as AvrCommunicateBlocks from '../arduino_avr/blocks/communicate';
import * as AvrControlBlocks from '../arduino_avr/blocks/control';
import * as AvrDisplayBlocks from '../arduino_avr/blocks/display';
import * as AvrEthernetBlocks from '../arduino_avr/blocks/ethernet';
import * as AvrFactoryBlocks from '../arduino_avr/blocks/factory';
import * as AvrInoutBlocks from '../arduino_avr/blocks/inout';
import * as AvrListsBlocks from '../arduino_avr/blocks/lists';
import * as AvrLogicBlocks from '../arduino_avr/blocks/logic';
import * as AvrMathBlocks from '../arduino_avr/blocks/math';
import * as AvrPinsBlocks from '../arduino_avr/blocks/pins';
import * as AvrProceduresBlocks from '../arduino_avr/blocks/procedures';
import * as AvrSensorBlocks from '../arduino_avr/blocks/sensor';
import * as AvrSerialBlocks from '../arduino_avr/blocks/serial';
import * as AvrStorageBlocks from '../arduino_avr/blocks/storage';
import * as AvrTextBlocks from '../arduino_avr/blocks/text';
import * as AvrToolsBlocks from '../arduino_avr/blocks/tools';
import * as AvrVariablesBlocks from '../arduino_avr/blocks/variables';

import * as Esp8266EthernetBlocks from './blocks/ethernet';

import * as CommonEthernetGenerators from '../arduino_common/generators/ethernet';
import * as CommonTextGenerators from '../arduino_common/generators/text';

import * as AvrActuatorGenerators from '../arduino_avr/generators/actuator';
import * as AvrBlynkGenerators from '../arduino_avr/generators/blynk';
import * as AvrCommunicateGenerators from '../arduino_avr/generators/communicate';
import * as AvrControlGenerators from '../arduino_avr/generators/control';
import * as AvrDisplayGenerators from '../arduino_avr/generators/display';
import * as AvrEthernetGenerators from '../arduino_avr/generators/ethernet';
import * as AvrFactoryGenerators from '../arduino_avr/generators/factory';
import * as AvrInoutGenerators from '../arduino_avr/generators/inout';
import * as AvrListsGenerators from '../arduino_avr/generators/lists';
import * as AvrLogicGenerators from '../arduino_avr/generators/logic';
import * as AvrMathGenerators from '../arduino_avr/generators/math';
import * as AvrPinsGenerators from '../arduino_avr/generators/pins';
import * as AvrProceduresGenerators from '../arduino_avr/generators/procedures';
import * as AvrSensorGenerators from '../arduino_avr/generators/sensor';
import * as AvrSerialGenerators from '../arduino_avr/generators/serial';
import * as AvrStorageGenerators from '../arduino_avr/generators/storage';
import * as AvrTextGenerators from '../arduino_avr/generators/text';
import * as AvrToolsGenerators from '../arduino_avr/generators/tools';
import * as AvrVariablesGenerators from '../arduino_avr/generators/variables';

import * as Esp8266Generators from './generators/ethernet';
import * as Esp8266EthernetGenerators from './generators/ethernet';

import Esp8266ZhHans from './language/zh-hans';
import Esp8266ZhHant from './language/zh-hant';
import Esp8266En from './language/en';

import '../arduino_avr/css/color.css';

Profile.default = {};
Object.assign(Profile, pins);
Object.assign(Profile.default, pins.arduino_esp8266);

Object.assign(Blockly.Lang.ZhHans, Esp8266ZhHans);
Object.assign(Blockly.Lang.ZhHant, Esp8266ZhHant);
Object.assign(Blockly.Lang.En, Esp8266En);

Object.assign(
    Blockly.Blocks,
    CommonEthernetBlocks,
    CommonTextBlocks,
    AvrActuatorBlocks,
    AvrBlynkBlocks,
    AvrCommunicateBlocks,
    AvrControlBlocks,
    AvrDisplayBlocks,
    AvrEthernetBlocks,
    AvrFactoryBlocks,
    AvrInoutBlocks,
    AvrListsBlocks,
    AvrLogicBlocks,
    AvrMathBlocks,
    AvrPinsBlocks,
    AvrProceduresBlocks,
    AvrSensorBlocks,
    AvrSerialBlocks,
    AvrStorageBlocks,
    AvrTextBlocks,
    AvrToolsBlocks,
    AvrVariablesBlocks,
    Esp8266EthernetBlocks
);

Object.assign(
    Blockly.Arduino.forBlock,
    CommonEthernetGenerators,
    CommonTextGenerators,
    AvrActuatorGenerators,
    AvrBlynkGenerators,
    AvrCommunicateGenerators,
    AvrControlGenerators,
    AvrDisplayGenerators,
    AvrEthernetGenerators,
    AvrFactoryGenerators,
    AvrInoutGenerators,
    AvrListsGenerators,
    AvrLogicGenerators,
    AvrMathGenerators,
    AvrPinsGenerators,
    AvrProceduresGenerators,
    AvrSensorGenerators,
    AvrSerialGenerators,
    AvrStorageGenerators,
    AvrTextGenerators,
    AvrToolsGenerators,
    AvrVariablesGenerators,
    Esp8266Generators,
    Esp8266EthernetGenerators
);