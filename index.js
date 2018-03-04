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
        if (funcToMeasure[Symbol.toStringTag] == "AsyncFunction") {
            //we are delaing with an async function
            let start = Date.now();
            let promise = funcToMeasure(...args);
            promise.then((result) => {
                let stop = Date.now();
                this.report(funcName, (stop - start), Date.now());
                return result;
            });
            return promise;
        }
        else {
            let start = Date.now();
            var result = funcToMeasure(...args);
            let stop = Date.now();
            if (result instanceof Promise) {
                let promise = result;
                promise.then((result) => {
                    let stop = Date.now();
                    this.report(funcName, (stop - start), Date.now());
                    return result;
                });
                return promise;
            }
            else {
                this.report(funcName, (stop - start), Date.now());
                return result;
            }
        }
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