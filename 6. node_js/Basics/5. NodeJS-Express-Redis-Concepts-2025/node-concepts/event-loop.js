// timers -> pending callbacks -> idle, prepare -> poll -> check -> close callback

// Node.js Event Loop Phases
// timers: setTimeout, setInterval
// pending callbacks: execute I/O callbacks deferred to the next loop iteration
// idle, prepare: only used internally
// poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate); node will block here when appropriate
// check: setImmediate callbacks are invoked here
// close callbacks: some close callbacks, e.g. socket.on('close', ...)
// process.nextTick: allow users to schedule a callback to be invoked in the next iteration of the event loop

// output
/*
1. script start [synchronus task]
9. script ends [synchronus task]
6. process.nexttick callback (microtask)
5. Promise resolved (microtask)
2. settimeout 0s callback (macrotask)
3. settimeout 0s callback (macrotask)
4. setImmediate callback (check)
7. file read operation (I/O callback)
8. pbkdf2 operation completed (CPU intensive task)
*/



const fs = require("fs");
const crypto = require("crypto");

console.log("1. script start [synchronus task]");

setTimeout(() => {
  console.log("2. settimeout 0s callback (macrotask)");
}, 0);

setTimeout(() => {
  console.log("3. settimeout 0s callback (macrotask)");
}, 0);

setImmediate(() => {
  console.log("4. setImmediate callback (check)");
});

Promise.resolve().then(() => {
  console.log("5. Promise resolved (microtask)");
});

process.nextTick(() => {
  console.log("6. process.nexttick callback (microtask)");
});

fs.readFile(__filename, () => {
  console.log("7. file read operation (I/O callback)");
});

crypto.pbkdf2("secret", "salt", 10000, 64, "sha512", (err, key) => {
  if (err) throw err;
  console.log("8. pbkdf2 operation completed (CPU intensive task)");
});

console.log("9. script ends [synchronus task]");
