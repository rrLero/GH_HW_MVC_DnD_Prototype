// @flow


export default class SuperFunction extends Function {

    constructor() {
        super()
    }

    extend(args: {}) {
        if (args) {
            Object.entries(args).forEach(([key, val]: [string, any]) => {
                if (this.prototype instanceof Object) {
                    this.prototype[key] = val;
                }
            })
        }
        return this
    }
}