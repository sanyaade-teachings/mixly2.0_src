import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

import Variables from '../python/others/variables';
import Procedures from '../python/others/procedures';
import Python from '../python/python_generator';

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

import * as AIBlocks from './blocks/ai';
import * as AlgorithmBlocks from './blocks/algorithm';
import * as CommunicateBlocks from './blocks/communicate';
import * as CVBlocks from './blocks/cv';
import * as DataBlocks from './blocks/data';
import * as DatastructureBlocks from './blocks/datastructure';
import * as FactoryBlocks from './blocks/factory';
import * as HardwareBlocks from './blocks/hardware';
import * as InoutBlocks from './blocks/inout';
import * as IOTBlocks from './blocks/iot';
import * as PinsBlocks from './blocks/pins';
import * as SerialBlocks from './blocks/serial';
import * as SKLearnBlocks from './blocks/sklearn';
import * as SystemBlocks from './blocks/system';
import * as TurtleBlocks from './blocks/turtle';

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

import * as AIGenerators from './generators/ai';
import * as AlgorithmGenerators from './generators/algorithm';
import * as CommunicateGenerators from './generators/communicate';
import * as CVGenerators from './generators/cv';
import * as DataGenerators from './generators/data';
import * as DatastructureGenerators from './generators/datastructure';
import * as FactoryGenerators from './generators/factory';
import * as HardwareGenerators from './generators/hardware';
import * as InoutGenerators from './generators/inout';
import * as IOTGenerators from './generators/iot';
import * as PinsGenerators from './generators/pins';
import * as SerialGenerators from './generators/serial';
import * as SKLearnGenerators from './generators/sklearn';
import * as SystemGenerators from './generators/system';
import * as TurtleGenerators from './generators/turtle';

import './css/color_mixpy_python_advance.css';

Object.assign(Blockly.Variables, Variables);
Object.assign(Blockly.Procedures, Procedures);
Blockly.Python = Python;

Profile.default = {};

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
    AIBlocks,
    AlgorithmBlocks,
    CommunicateBlocks,
    CVBlocks,
    DataBlocks,
    DatastructureBlocks,
    FactoryBlocks,
    HardwareBlocks,
    InoutBlocks,
    IOTBlocks,
    PinsBlocks,
    SerialBlocks,
    SKLearnBlocks,
    SystemBlocks,
    TurtleBlocks
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
    AIGenerators,
    AlgorithmGenerators,
    CommunicateGenerators,
    CVGenerators,
    DataGenerators,
    DatastructureGenerators,
    FactoryGenerators,
    HardwareGenerators,
    InoutGenerators,
    IOTGenerators,
    PinsGenerators,
    SerialGenerators,
    SKLearnGenerators,
    SystemGenerators,
    TurtleGenerators
);