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

import * as MixPyAlgorithmBlocks from '../python_mixpy/blocks/algorithm';
import * as MixPyFactoryBlocks from '../python_mixpy/blocks/factory';

import * as DataBlocks from './blocks/data';
import * as InoutBlocks from './blocks/inout';
import * as IotBlocks from './blocks/iot';
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

import * as MixPyAlgorithmGenerators from '../python_mixpy/generators/algorithm';
import * as MixPyFactoryGenerators from '../python_mixpy/generators/factory';

import * as DataGenerators from './generators/data';
import * as InoutGenerators from './generators/inout';
import * as IotGenerators from './generators/iot';
import * as SystemGenerators from './generators/system';
import * as TurtleGenerators from './generators/turtle';

import './css/color_mixpy_python_skulpt.css';

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
    MixPyAlgorithmBlocks,
    MixPyFactoryBlocks,
    DataBlocks,
    InoutBlocks,
    IotBlocks,
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
    MixPyAlgorithmGenerators,
    MixPyFactoryGenerators,
    DataGenerators,
    InoutGenerators,
    IotGenerators,
    SystemGenerators,
    TurtleGenerators
);