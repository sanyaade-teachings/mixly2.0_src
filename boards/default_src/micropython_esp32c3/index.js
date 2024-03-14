import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import Variables from '../python/others/variables';
import Procedures from '../python/others/procedures';
import Python from '../python/python_generator';

import pins from './blocks/esp32_profile';

import * as PythonVariablesBlocks from '../python/blocks/variables';
import * as PythonControlBlocks from '../python/blocks/control';
import * as PythonMathBlocks from '../python/blocks/math';
import * as PythonTextBlocks from '../python/blocks/text';
import * as PythonListsBlocks from '../python/blocks/lists';
import * as PythonDictsBlocks from '../python/blocks/dicts';
import * as PythonLogicBlocks from '../python/blocks/logic';
import * as PythonStorageBlocks from '../python/blocks/storage';
import * as PythonProceduresBlocks from '../python/blocks/procedures';
import * as PythonTupleBlocks from '../python/blocks/tuple';
import * as PythonSetBlocks from '../python/blocks/set';
import * as PythonHtmlBlocks from '../python/blocks/html';
import * as PythonUtilityBlocks from '../python/blocks/utility';

import * as MicroPythonInputBlocks from '../micropython_common/blocks/inout';
import * as MicroPythonSystemBlocks from '../micropython_common/blocks/system';
import * as MicroPythonSerialBlocks from '../micropython_common/blocks/serial';
import * as MicroPythonCommunicateBlocks from '../micropython_common/blocks/communicate';
import * as MicroPythonIotBlocks from '../micropython_common/blocks/iot';
import * as MicroPythonWeatherBlocks from '../micropython_common/blocks/weather';
import * as MicroPythonAISensorBlocks from '../micropython_common/blocks/ai_sensor';
import * as MicroPythonSensorOnboardBlocks from '../micropython_common/blocks/sensor_onboard';
import * as MicroPythonSensorExternBlocks from '../micropython_common/blocks/sensor_extern';
import * as MicroPythonNetworkBlocks from '../micropython_common/blocks/network';
import * as MicroPythonAIBlocks from '../micropython_common/blocks/ai';
import * as MicroPythonActuatorOnboardBlocks from '../micropython_common/blocks/actuator_onboard';
import * as MicroPythonActuatorExternBlocks from '../micropython_common/blocks/actuator_extern';
import * as MicroPythonDisplayOnboardBlocks from '../micropython_common/blocks/display_onboard';
import * as MicroPythonDisplayExternBlocks from '../micropython_common/blocks/display_extern';
import * as MicroPythonFactoryBlocks from '../micropython_common/blocks/factory';
import * as MicroPythonBlynkBlocks from '../micropython_common/blocks/blynk';
import * as MicroPythonCCG1Blocks from '../micropython_common/blocks/cc_g1';

import * as InoutBlocks from './blocks/inout';
import * as MeG1Blocks from './blocks/me_g1';
import * as MeGoBlocks from './blocks/me_go';
import * as PinsBlocks from './blocks/pins';

import * as PythonVariablesGenerators from '../python/generators/variables';
import * as PythonControlGenerators from '../python/generators/control';
import * as PythonMathGenerators from '../python/generators/math';
import * as PythonTextGenerators from '../python/generators/text';
import * as PythonListsGenerators from '../python/generators/lists';
import * as PythonDictsGenerators from '../python/generators/dicts';
import * as PythonLogicGenerators from '../python/generators/logic';
import * as PythonStorageGenerators from '../python/generators/storage';
import * as PythonProceduresGenerators from '../python/generators/procedures';
import * as PythonTupleGenerators from '../python/generators/tuple';
import * as PythonSetGenerators from '../python/generators/set';
import * as PythonHtmlGenerators from '../python/generators/html';
import * as PythonUtilityGenerators from '../python/generators/utility';

import * as MicroPythonInputGenerators from '../micropython_common/generators/inout';
import * as MicroPythonSystemGenerators from '../micropython_common/generators/system';
import * as MicroPythonSerialGenerators from '../micropython_common/generators/serial';
import * as MicroPythonCommunicateGenerators from '../micropython_common/generators/communicate';
import * as MicroPythonIotGenerators from '../micropython_common/generators/iot';
import * as MicroPythonWeatherGenerators from '../micropython_common/generators/weather';
import * as MicroPythonAISensorGenerators from '../micropython_common/generators/ai_sensor';
import * as MicroPythonSensorOnboardGenerators from '../micropython_common/generators/sensor_onboard';
import * as MicroPythonSensorExternGenerators from '../micropython_common/generators/sensor_extern';
import * as MicroPythonNetworkGenerators from '../micropython_common/generators/network';
import * as MicroPythonAIGenerators from '../micropython_common/generators/ai';
import * as MicroPythonActuatorOnboardGenerators from '../micropython_common/generators/actuator_onboard';
import * as MicroPythonActuatorExternGenerators from '../micropython_common/generators/actuator_extern';
import * as MicroPythonDisplayOnboardGenerators from '../micropython_common/generators/display_onboard';
import * as MicroPythonDisplayExternGenerators from '../micropython_common/generators/display_extern';
import * as MicroPythonFactoryGenerators from '../micropython_common/generators/factory';
import * as MicroPythonBlynkGenerators from '../micropython_common/generators/blynk';
import * as MicroPythonCCG1Generators from '../micropython_common/generators/cc_g1';

import * as InoutGenerators from './generators/inout';
import * as MeG1Generators from './generators/me_g1';
import * as MeGoGenerators from './generators/me_go';
import * as PinsGenerators from './generators/pins';

import './css/color_esp32c3_mixgocc.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;

Profile.default = {};
Object.assign(Profile, pins);
Object.assign(Profile.default, pins['MixGo CC']);

Object.assign(
    Blockly.Blocks,
    PythonVariablesBlocks,
    PythonControlBlocks,
    PythonMathBlocks,
    PythonTextBlocks,
    PythonListsBlocks,
    PythonDictsBlocks,
    PythonLogicBlocks,
    PythonStorageBlocks,
    PythonProceduresBlocks,
    PythonTupleBlocks,
    PythonSetBlocks,
    PythonHtmlBlocks,
    PythonUtilityBlocks,
    MicroPythonInputBlocks,
    MicroPythonSystemBlocks,
    MicroPythonSerialBlocks,
    MicroPythonCommunicateBlocks,
    MicroPythonIotBlocks,
    MicroPythonWeatherBlocks,
    MicroPythonAISensorBlocks,
    MicroPythonSensorOnboardBlocks,
    MicroPythonSensorExternBlocks,
    MicroPythonNetworkBlocks,
    MicroPythonAIBlocks,
    MicroPythonActuatorOnboardBlocks,
    MicroPythonActuatorExternBlocks,
    MicroPythonDisplayOnboardBlocks,
    MicroPythonDisplayExternBlocks,
    MicroPythonFactoryBlocks,
    MicroPythonBlynkBlocks,
    MicroPythonCCG1Blocks,
    InoutBlocks,
    MeG1Blocks,
    MeGoBlocks,
    PinsBlocks
);

Object.assign(
    Blockly.Python.forBlock,
    PythonVariablesGenerators,
    PythonControlGenerators,
    PythonMathGenerators,
    PythonTextGenerators,
    PythonListsGenerators,
    PythonDictsGenerators,
    PythonLogicGenerators,
    PythonStorageGenerators,
    PythonProceduresGenerators,
    PythonTupleGenerators,
    PythonSetGenerators,
    PythonHtmlGenerators,
    PythonUtilityGenerators,
    MicroPythonInputGenerators,
    MicroPythonSystemGenerators,
    MicroPythonSerialGenerators,
    MicroPythonCommunicateGenerators,
    MicroPythonIotGenerators,
    MicroPythonWeatherGenerators,
    MicroPythonAISensorGenerators,
    MicroPythonSensorOnboardGenerators,
    MicroPythonSensorExternGenerators,
    MicroPythonNetworkGenerators,
    MicroPythonAIGenerators,
    MicroPythonActuatorOnboardGenerators,
    MicroPythonActuatorExternGenerators,
    MicroPythonDisplayOnboardGenerators,
    MicroPythonDisplayExternGenerators,
    MicroPythonFactoryGenerators,
    MicroPythonBlynkGenerators,
    MicroPythonCCG1Generators,
    InoutGenerators,
    MeG1Generators,
    MeGoGenerators,
    PinsGenerators
);