import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import Variables from '../python/others/variables';
import Procedures from '../python/others/procedures';
import { Python } from '../python/python_generator';

import pins from './blocks/k210_profile';

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

import * as MicroPythonIotBlocks from '../micropython_common/blocks/iot';
import * as MicroPythonDisplayBlocks from '../micropython_common/blocks/display';
import * as MicroPythonBlynkBlocks from '../micropython_common/blocks/blynk';
import * as MicroPythonActuatorBlocks from '../micropython_common/blocks/actuator';

import * as ActuatorBlocks from './blocks/actuator';
import * as AiBlocks from './blocks/ai';
import * as AvBlocks from './blocks/av';
import * as CameraBlocks from './blocks/camera';
import * as CommunicateBlocks from './blocks/communicate';
import * as DisplayBlocks from './blocks/display';
import * as FactoryBlocks from './blocks/factory';
import * as HearBlocks from './blocks/hear';
import * as ImageBlocks from './blocks/image';
import * as InoutBlocks from './blocks/inout';
import * as IotBlocks from './blocks/iot';
import * as MathBlocks from './blocks/math';
import * as NesBlocks from './blocks/nes';
import * as NetworkBlocks from './blocks/network';
import * as PinsBlocks from './blocks/pins';
import * as SensorBlocks from './blocks/sensor';
import * as SerialBlocks from './blocks/serial';
import * as SystemBlocks from './blocks/system';
import * as UpdataBlocks from './blocks/updata';

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

import * as MicroPythonIotGenerators from '../micropython_common/generators/iot';
import * as MicroPythonDisplayGenerators from '../micropython_common/generators/display';
import * as MicroPythonBlynkGenerators from '../micropython_common/generators/blynk';
import * as MicroPythonActuatorGenerators from '../micropython_common/generators/actuator';

import * as ActuatorGenerators from './generators/actuator';
import * as AiGenerators from './generators/ai';
import * as AvGenerators from './generators/av';
import * as CameraGenerators from './generators/camera';
import * as CommunicateGenerators from './generators/communicate';
import * as DisplayGenerators from './generators/display';
import * as FactoryGenerators from './generators/factory';
import * as HearGenerators from './generators/hear';
import * as ImageGenerators from './generators/image';
import * as InoutGenerators from './generators/inout';
import * as IotGenerators from './generators/iot';
import * as MathGenerators from './generators/math';
import * as NesGenerators from './generators/nes';
import * as NetworkGenerators from './generators/network';
import * as PinsGenerators from './generators/pins';
import * as SensorGenerators from './generators/sensor';
import * as SerialGenerators from './generators/serial';
import * as SystemGenerators from './generators/system';
import * as UpdataGenerators from './generators/updata';

import './css/color_k210_mixgoai.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;

Profile.default = {};
Object.assign(Profile, pins);
Object.assign(Profile.default, pins['k210']);

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
    MicroPythonIotBlocks,
    MicroPythonDisplayBlocks,
    MicroPythonBlynkBlocks,
    MicroPythonActuatorBlocks,
    ActuatorBlocks,
    AiBlocks,
    AvBlocks,
    CameraBlocks,
    CommunicateBlocks,
    DisplayBlocks,
    DisplayBlocks,
    FactoryBlocks,
    HearBlocks,
    ImageBlocks,
    InoutBlocks,
    IotBlocks,
    MathBlocks,
    NesBlocks,
    NetworkBlocks,
    PinsBlocks,
    SensorBlocks,
    SerialBlocks,
    SystemBlocks,
    UpdataBlocks
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
    MicroPythonIotGenerators,
    MicroPythonDisplayGenerators,
    MicroPythonBlynkGenerators,
    MicroPythonActuatorGenerators,
    ActuatorGenerators,
    AiGenerators,
    AvGenerators,
    CameraGenerators,
    CommunicateGenerators,
    DisplayGenerators,
    DisplayGenerators,
    FactoryGenerators,
    HearGenerators,
    ImageGenerators,
    InoutGenerators,
    IotGenerators,
    MathGenerators,
    NesGenerators,
    NetworkGenerators,
    PinsGenerators,
    SensorGenerators,
    SerialGenerators,
    SystemGenerators,
    UpdataGenerators
);