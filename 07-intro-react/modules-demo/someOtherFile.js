import Message from './message.js';

let m = new Message('Leo', 'Matt', 'Howdy! 🤠');
m.read();               // using our getter function
console.log(m.content);
m.content = 'new val';  // using our setter function
console.log(m.content);

function logFunc(f) {
    console.log('we were passed: ' + f);
    f();
}

// this won't throw an error!
console.log('Running with bound function');
let boundFunc = m.read.bind(m);
logFunc(boundFunc);

// ...but this will.
console.log('Running without bound function. This will throw an error');
logFunc(m.read);