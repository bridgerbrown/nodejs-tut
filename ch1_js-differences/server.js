console.log('test'); // 'node server'
console.log(global); // global object instead of window object

// CommonJS modules instead of ES6 modules
const os = require('os');
const path = require('path');

/*
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));
*/

const { add, subtract, multiply, divide } = require('./math');

console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));
