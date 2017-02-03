"use strict"

const fs = require('fs');
const readline = require('readline');

const inputPath = './../input/';
const outputPath = './../output/';

let startTime;
let endTime;
let duration;

const start = () => {
  startTime = new Date().getTime();
}

const end = () => {
  endTime = new Date().getTime();
  duration = endTime - startTime;
  console.log(`Duration: ${duration}ms`)
}

const read = (fileName) => {
  start();

  const readerStream = fs.createReadStream(inputPath + fileName);
  readerStream.setEncoding('UTF8');
  readerStream.on('data', function(chunk) {});

  readerStream.on('end', function() {
    console.log('reading finished');
    end();
  });

  readerStream.on('error', function(err){
    console.log(err.stack);
  });
}

const pipe = (fileName) => {
  start();

  const readerStream = fs.createReadStream(inputPath + fileName);
  const writerStream = fs.createWriteStream(outputPath + fileName);
  readerStream.setEncoding('UTF8');

  readerStream.pipe(writerStream);

  readerStream.on('end', function() {
    console.log('piping finished');
    end();
  });
}

const modify = (fileName, modifyFn) => {
  start();

  const readerStream = fs.createReadStream(inputPath + fileName);
  const writerStream = fs.createWriteStream(outputPath + fileName);
  readerStream.setEncoding('UTF8');

  const rl = readline.createInterface({
    input: readerStream,
    output: writerStream
  });

  rl.on('line', (data) => {
    writerStream.write(modifyFn(data) + "\n", 'UTF8');
  });

  readerStream.on('end', function() {
    writerStream.end();
  });

  writerStream.on('finish', () => {
    console.log('modyfying finished');
    end();
  });

  writerStream.on('error', function(err){
    console.log(err.stack);
  });
}

const transformData = (row) => {
  const data = row.split(',');
  const fullName = `${data[1]} ${data[2]}`; 
  const gender = data[4].charAt(0).toUpperCase();

  const out = [data[0], fullName, data[3], gender];

  return out.join(';');
}

const doNotTransformData = (row) => {
  return row;
}

switch(process.argv[2]) {
  case 'read':
    console.log('Nodejs reading: ' + process.argv[3]);
    read(process.argv[3]);
    break;
  case 'pipe':
    console.log('Nodejs piping: ' + process.argv[3]);
    //pipe(process.argv[3]);
    modify(process.argv[3], doNotTransformData);
    break;
  case 'modify':
    console.log('Nodejs modifying: ' + process.argv[3]);
    modify(process.argv[3], transformData);
    break;
}
