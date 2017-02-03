<?php

$inputDir = __DIR__ . '/../input/';
$outputDir = __DIR__ . '/../output/';

function startProfiler() {
  return round(microtime(true) * 1000);
}

function endProfiler($start) {
  $end = round(microtime(true) * 1000);
  $duration = $end - $start;
  echo 'Duration: ' . $duration . 'ms' . "\n";
}

function transformData($line) {
  $data = explode(",", $line);
  $fullName = $data[1] . ' ' . $data[2]; 
  $gender = strtoupper(substr($data[4], 0, 1));

  $out = [$data[0], $fullName, $data[3], $gender];

  return implode(";", $out) . "\n";
}

function read($filename, $inputDir) {
  $start = startProfiler();

  $input = $inputDir . $filename;
  $reader = fopen($input, "r");
  if ($reader) {
      while (($line = fgets($reader)) !== false) {
          // process the line read.
      }

      fclose($reader);
  } else {
    echo 'Cannot open file: ' . $input . "\n";
  }

  endProfiler($start);
}

function modify($filename, $inputDir, $outputDir, $transform = false) {
  $start = startProfiler();

  $input = $inputDir . $filename;
  $output = $outputDir . $filename;
  $reader = fopen($input, "r");
  $writer = fopen($output, "w");

  if (!$reader) {
    echo 'Cannot open file: ' . $input . "\n";
    return;
  }

  if (!$writer) {
    echo 'Cannot open file: ' . $output . "\n";
    return;
  }

  while (($line = fgets($reader)) !== false) {
    if ($transform) {
      $line = transformData($line);
    }

    fwrite($writer, $line);
  }

  fclose($reader);
  fclose($writer);

  echo "Process finished \n";
  endProfiler($start);
}

switch($argv[1]) {
  case 'read':
    echo 'PHP Reading: ' . $argv[2] . "\n";
    read($argv[2], $inputDir);
    break;
  case 'pipe':
    echo 'PHP Piping: ' . $argv[2] . "\n";
    modify($argv[2], $inputDir, $outputDir. false);
    break;
  case 'modify':
    echo 'PHP Modifying: ' . $argv[2] . "\n";
    modify($argv[2], $inputDir, $outputDir, true);
    break;
}