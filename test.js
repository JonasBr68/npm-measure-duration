let measure = require("./index");

let duration = measure(wait, 500);

if(500 * 1.01 < duration || 500 * 0.99 > duration)
    throw "Measurement off by more than 1%";

function wait(millis)
{
    var now = Date.now();
    const limit = now + (millis);
    while(now < limit)
    {
        now = Date.now();
    }
}