import core from '@actions/core';
import yaml from 'yaml';
import fs from 'fs';
import process from 'process';
import crypto from 'crypto';

let taskDefinition = {};
let containers = [];

const family = core.getInput('family');
if(family) {
  taskDefinition.family = family;
}

const cpu = core.getInput('cpu');
if(cpu) {
  taskDefinition.cpu = cpu;
}

const memory = core.getInput('memory');
if(memory) {
  taskDefinition.memory = memory;
}

const executionRoleArn = core.getInput('executionRoleArn');
if(executionRoleArn) {
  taskDefinition.executionRoleArn = executionRoleArn;
}

const taskRoleArn = core.getInput('taskRoleArn');
if(taskRoleArn) {
  taskDefinition.taskRoleArn = taskRoleArn;
}

const networkMode = core.getInput('networkMode');
if(networkMode) {
  taskDefinition.networkMode = networkMode;
}

const requiresCompatibilities = core.getInput('requiresCompatibilities');
if(requiresCompatibilities) {
  taskDefinition.requiresCompatibilities = requiresCompatibilities.split(',').map( item => item.trim() );
}

const containerDefinitionFiles = core.getInput('containerDefinitionFiles');
if(containerDefinitionFiles) {
  const paths = yaml.parse(containerDefinitionFiles);
  for (const path of paths) {
    const fileContents = fs.readFileSync(path, 'utf8');
    containers.push(yaml.parse(fileContents));
  }
}

const containerDefinitions = core.getInput('containerDefinitions');
if(containerDefinitions) {
  const definitions = yaml.parse(containerDefinitions);
  for (const definition of definitions) {
    containers.push(definition);
  }
}

if(containers.length > 0){
  taskDefinition.containerDefinitions = containers;
}

console.log("Task Definition: ", JSON.stringify(taskDefinition, null, 2));

core.setOutput('task_definition_raw', JSON.stringify(taskDefinition));

const tempDirectory = process.env['RUNNER_TEMP'];
const hash = crypto.createHash('sha256').update(JSON.stringify(taskDefinition)).digest('hex');
const filename = `task-definition-${hash}.json`;
const filepath = `${tempDirectory}/${filename}`;

fs.writeFileSync(filepath, JSON.stringify(taskDefinition, null, 2));

core.setOutput('task_definition', filepath);
