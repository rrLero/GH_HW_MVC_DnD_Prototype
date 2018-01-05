// @flow

export default class SuperArray extends Array<any> {

    constructor() {
        super()
    }

    filterWhere(obj: {} = {}) {
        const objKeysArr = Object.keys(obj);
        let val = obj[objKeysArr[0]];
        return this.filter((el)=> {
            const elKeysArr = Object.keys(el);
            return (val instanceof RegExp) ?
                ~elKeysArr.indexOf(objKeysArr[0]) && val.test(el[objKeysArr[0]]) :
                ~elKeysArr.indexOf(objKeysArr[0]) && el[objKeysArr[0]] === val
        });
    }
}