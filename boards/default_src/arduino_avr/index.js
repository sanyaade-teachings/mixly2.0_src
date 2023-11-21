import * as Blockly from 'blockly/core';
import * as profile from 'profile';

import * as CommonEthernetBlocks from '../arduino_common/blocks/ethernet';
import * as CommonTextBlocks from '../arduino_common/blocks/text';

import * as AvrActuatorBlocks from './blocks/actuator';
import * as AvrBlynkBlocks from './blocks/blynk';
import * as AvrCommunicateBlocks from './blocks/communicate';
import * as AvrControlBlocks from './blocks/control';
import * as AvrDisplayBlocks from './blocks/display';
import * as AvrEthernetBlocks from './blocks/ethernet';
import * as AvrFactoryBlocks from './blocks/factory';
import * as AvrInoutBlocks from './blocks/inout';
import * as AvrListsBlocks from './blocks/lists';
import * as AvrLogicBlocks from './blocks/logic';
import * as AvrMathBlocks from './blocks/math';
import * as AvrPinsBlocks from './blocks/pins';
import * as AvrProceduresBlocks from './blocks/procedures';
import * as AvrScoopBlocks from './blocks/scoop';
import * as AvrSensorBlocks from './blocks/sensor';
import * as AvrSerialBlocks from './blocks/serial';
import * as AvrStorageBlocks from './blocks/storage';
import * as AvrTextBlocks from './blocks/text';
import * as AvrToolsBlocks from './blocks/tools';
import * as AvrVariablesBlocks from './blocks/variables';

import * as CommonEthernetGenerators from '../arduino_common/generators/ethernet';
import * as CommonTextGenerators from '../arduino_common/generators/text';

import * as AvrActuatorGenerators from './generators/actuator';
import * as AvrBlynkGenerators from './generators/blynk';
import * as AvrCommunicateGenerators from './generators/communicate';
import * as AvrControlGenerators from './generators/control';
import * as AvrDisplayGenerators from './generators/display';
import * as AvrEthernetGenerators from './generators/ethernet';
import * as AvrFactoryGenerators from './generators/factory';
import * as AvrInoutGenerators from './generators/inout';
import * as AvrListsGenerators from './generators/lists';
import * as AvrLogicGenerators from './generators/logic';
import * as AvrMathGenerators from './generators/math';
import * as AvrPinsGenerators from './generators/pins';
import * as AvrProceduresGenerators from './generators/procedures';
import * as AvrScoopGenerators from './generators/scoop';
import * as AvrSensorGenerators from './generators/sensor';
import * as AvrSerialGenerators from './generators/serial';
import * as AvrStorageGenerators from './generators/storage';
import * as AvrTextGenerators from './generators/text';
import * as AvrToolsGenerators from './generators/tools';
import * as AvrVariablesGenerators from './generators/variables';

import './css/color.css';

Object.assign(profile.default, profile['Arduino/Genuino Uno']);

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
    AvrScoopBlocks,
    AvrSensorBlocks,
    AvrSerialBlocks,
    AvrStorageBlocks,
    AvrTextBlocks,
    AvrToolsBlocks,
    AvrVariablesBlocks
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
    AvrScoopGenerators,
    AvrSensorGenerators,
    AvrSerialGenerators,
    AvrStorageGenerators,
    AvrTextGenerators,
    AvrToolsGenerators,
    AvrVariablesGenerators
);