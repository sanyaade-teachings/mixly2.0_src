import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import Variables from '../python/others/variables';
import Procedures from '../python/others/procedures';
import { Python } from '../python/python_generator';

import pins from './blocks/microbit_profile';

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

import * as ActuatorBlocks from './blocks/actuator';
import * as CommunicateBlocks from './blocks/communicate';
import * as DisplayBlocks from './blocks/display';
import * as FactoryBlocks from './blocks/factory';
import * as InoutBlocks from './blocks/inout';
import * as MithonBlocks from './blocks/mithon';
import * as PinsBlocks from './blocks/pins';
import * as SensorBlocks from './blocks/sensor';
import * as SerialBlocks from './blocks/serial';
import * as SystemBlocks from './blocks/system';

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

import * as ActuatorGenerators from './generators/actuator';
import * as CommunicateGenerators from './generators/communicate';
import * as DisplayGenerators from './generators/display';
import * as FactoryGenerators from './generators/factory';
import * as InoutGenerators from './generators/inout';
import * as MithonGenerators from './generators/mithon';
import * as PinsGenerators from './generators/pins';
import * as SensorGenerators from './generators/sensor';
import * as SerialGenerators from './generators/serial';
import * as SystemGenerators from './generators/system';

import './css/color_mithon.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;

Profile.default = {};
Object.assign(Profile, pins);
Object.assign(Profile.default, pins['microbit']);

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
    ActuatorBlocks,
    CommunicateBlocks,
    DisplayBlocks,
    DisplayBlocks,
    FactoryBlocks,
    InoutBlocks,
    MithonBlocks,
    PinsBlocks,
    SensorBlocks,
    SerialBlocks,
    SystemBlocks
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
    ActuatorGenerators,
    CommunicateGenerators,
    DisplayGenerators,
    DisplayGenerators,
    FactoryGenerators,
    InoutGenerators,
    MithonGenerators,
    PinsGenerators,
    SensorGenerators,
    SerialGenerators,
    SystemGenerators
);