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

import * as Esp32ActuatorBlocks from './blocks/actuator';
import * as Esp32CommunicateBlocks from './blocks/communicate';
import * as Esp32ControlBlocks from './blocks/control';
import * as Esp32EthernetBlocks from './blocks/ethernet';
import * as Esp32HandbitBlocks from './blocks/Handbit';
import * as Esp32InoutBlocks from './blocks/inout';
import * as Esp32MixePiBlocks from './blocks/MixePi';
import * as Esp32MixGoBlocks from './blocks/MixGo';
import * as Esp32PinsBlocks from './blocks/pins';
import * as Esp32PocketCardBlocks from './blocks/PocketCard';
import * as Esp32SensorBlocks from './blocks/sensor';
import * as Esp32SerialBlocks from './blocks/serial';
import * as Esp32SidanBlocks from './blocks/sidan';
import * as Esp32StorageBlocks from './blocks/storage';
import * as Esp32Tools from './blocks/tools';

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

import * as Esp32ActuatorGenerators from './generators/actuator';
import * as Esp32CommunicateGenerators from './generators/communicate';
import * as Esp32ControlGenerators from './generators/control';
import * as Esp32EthernetGenerators from './generators/ethernet';
import * as Esp32HandbitGenerators from './generators/Handbit';
import * as Esp32InoutGenerators from './generators/inout';
import * as Esp32MixePiGenerators from './generators/MixePi';
import * as Esp32MixGoGenerators from './generators/MixGo';
import * as Esp32PinsGenerators from './generators/pins';
import * as Esp32PocketCardGenerators from './generators/PocketCard';
import * as Esp32SensorGenerators from './generators/sensor';
import * as Esp32SerialGenerators from './generators/serial';
import * as Esp32SidanGenerators from './generators/sidan';
import * as Esp32StorageGenerators from './generators/storage';

import Esp32ZhHans from './language/zh-hans';
import Esp32ZhHant from './language/zh-hant';
import Esp32En from './language/en';

import './css/color_esp32_arduino.css';

Profile.default = {};
Object.assign(Profile, pins);
Object.assign(Profile.default, pins.arduino_esp32);

Object.assign(Blockly.Lang.ZhHans, Esp32ZhHans);
Object.assign(Blockly.Lang.ZhHant, Esp32ZhHant);
Object.assign(Blockly.Lang.En, Esp32En);

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
    Esp32ActuatorBlocks,
    Esp32CommunicateBlocks,
    Esp32ControlBlocks,
    Esp32EthernetBlocks,
    Esp32HandbitBlocks,
    Esp32InoutBlocks,
    Esp32MixePiBlocks,
    Esp32MixGoBlocks,
    Esp32PinsBlocks,
    Esp32PocketCardBlocks,
    Esp32SensorBlocks,
    Esp32SerialBlocks,
    Esp32SidanBlocks,
    Esp32StorageBlocks,
    Esp32Tools.blocks
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
    Esp32ActuatorGenerators,
    Esp32CommunicateGenerators,
    Esp32ControlGenerators,
    Esp32EthernetGenerators,
    Esp32HandbitGenerators,
    Esp32InoutGenerators,
    Esp32MixePiGenerators,
    Esp32MixGoGenerators,
    Esp32PinsGenerators,
    Esp32PocketCardGenerators,
    Esp32SensorGenerators,
    Esp32SerialGenerators,
    Esp32SidanGenerators,
    Esp32StorageGenerators,
    Esp32Tools.generators
);