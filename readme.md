# measure-duration

Simple npm package to measure duration of javascript funcion calls, and log information.

Supports measuring functions returning Promise or measuring an async function

## Installation

npm install measure-duration

## Usage

```
let measure = require("measure-duration");

let duration = measure.measureCall(wait, 500); // calling function wait with parameter 500

//To disable logging to console.log or your custom logger
measure.disableLogging(); //Entries will still be logged to internal logging

measure.enableLogging(); //Reenable logging

measure.logger = (msg) => { console.log(msg); } ; //Setting up a custom logger/reporter

duration = measure.measureCall(wait, 400); // calling function wait with parameter 400

measure.report(); //Write all logged entries to measure.logger function, uses console.log by default

// Constains array of logged call,
measure.results
// each in the format of 
// { name: funcionName, duration: callDuration, when: calledWhen };


```