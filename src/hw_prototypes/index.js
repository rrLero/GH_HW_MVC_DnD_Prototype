
import SuperArray from './super-array';
import SuperFunction from './super-function';

const superArray = new SuperArray();
const superFunction = new SuperFunction();
// First Task
// Array.prototype.filterWhere = SuperArray.prototype.filterWhere;
// const users = [{id: 1, name: 'Max', age: 18}, {id: 2, name: 'Bob', age: 22}, {id: 3, name: 'Nick', age: 18}];
// const teenagers = users.filterWhere({age: 18});
// console.log(teenagers); // [{id: 1, name: 'Max', age: 18}, {id: 3, name: 'Nick', age: 18}]
//
// const maxes = users.filterWhere({name: /^max$/i});
// console.log(maxes); // [{id: 1, name: 'Max', age: 18}]

// Second Task
// const users2 = new SuperArray();
// users2.push({id: 1, name: 'Max', age: 18}, {id: 2, name: 'Bob', age: 20}, {id: 3, name: 'Nick', age: 18});
// console.log(users2.filterWhere({age: 20})); // [{id: 1, name: 'Max', age: 18}, {id: 3, name: 'Nick', age: 18}]
// console.log([].filterWhere); // undefined

// Third Task
Function.prototype.extend = SuperFunction.prototype.extend;
const SuperArray3 = Array.extend();
const users3 = new SuperArray3();
users3.push(1,2,3);
console.log(users3, users3.push, users3.filterWhere); // function


const SuperArray4 = Array.extend({
    filterWhere: function (obj: {} = {}) {
        const objKeysArr = Object.keys(obj);
        let val = obj[objKeysArr[0]];
        return this.filter((el)=> {
            const elKeysArr = Object.keys(el);
            return (val instanceof RegExp) ?
                ~elKeysArr.indexOf(objKeysArr[0]) && val.test(el[objKeysArr[0]]) :
                ~elKeysArr.indexOf(objKeysArr[0]) && el[objKeysArr[0]] === val
        });
    }
});
const users4 = new SuperArray4();
users4.push({id: 1, name: 'Max', age: 18}, {id: 2, name: 'Bob', age: 20}, {id: 3, name: 'Nick', age: 18});
console.log(users4, users4.filterWhere({name: 'Bob'}));
