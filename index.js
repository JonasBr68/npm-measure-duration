//The module code will go here

module.exports = function measureFunction(funcToMeasure, ...args) {
    let funcName = "Function '" + funcToMeasure.name + "'";
    let start = Date.now();
    var result = funcToMeasure(...args);
    let stop = Date.now();

    console.log(funcName + " took: " + (stop - start));
    if (result == undefined) {
        console.log(funcName + " did not return a value");
    }
    else {
        console.log(funcName + " returned " + result);
    }
    return stop - start;
}