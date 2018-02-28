let measure = require("./index");

let log = [];
function myLogger(msg) {
    if (arguments.length == 0)
        throw "msg missing!";
    log.push(msg);
    console.log(msg);
}
measure.logger = myLogger;

measure.logger = (msg) => { console.log(msg); } ;

measure.disableLogging();

let duration = measure.measureCall(wait, 400);

if (log.length != 0)
    throw "Nothing should have been logged";

measure.enableLogging();

duration = measure.measureCall(wait, 500);

if (log.length != 1)
    throw "One item should have been logged";


if (500 * 1.01 < duration || 500 * 0.99 > duration)
    throw "Measurement off by more than 1%";

measure.report();

function wait(millis) {
    var now = Date.now();
    const limit = now + (millis);
    while (now < limit) {
        now = Date.now();
    }
}