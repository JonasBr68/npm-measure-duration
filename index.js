//The module code will go here

module.exports = function measureFunction(funcToMeasure, ...args) {
    let funcName = "Function '" + funcToMeasure.name + "'";
    let start = Date.now();
    var result = funcToMeasure(...args);
    let stop = Date.now();

    console.log(funcName + " took: " + (stop - start) + "ms");
    return result;
}