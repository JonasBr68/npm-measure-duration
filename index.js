//The module code will go here

module.exports = {
    _usedLogger: console.log,
    logger: console.log,
    disableLogging(){
        this._usedLogger = this.logger;
        this.logger = undefined;
    },
    enableLogging()
    {
        this.logger = this._usedLogger;
    },
    measureCall(funcToMeasure, ...args) {
        let funcName = funcToMeasure.name;
        let start = Date.now();
        var result = funcToMeasure(...args);
        let stop = Date.now();

        this.report(funcName, (stop - start), Date.now());
        return result;
    },
    report(funcName, callDuration, calledWhen) {
        if (arguments.length == 0) {
            this.results.forEach(({name, duration, when}) => {
                this.reportItem(name, duration, when, this.logger);
            });
        }
        else {
            let item = { name: funcName, duration: callDuration, when: calledWhen };
            this.results.push(item);
            let {name, duration, when} = item;
            this.reportItem(name, duration, when, this.logger);
        }
    },
    reportItem(name, duration, when, logger)
    {
        if (logger) {
            let funcName = "Function '" + name + "'";
            logger(when + ": " + funcName + " took: " + duration + "ms");
        }

    },
    results: []
}