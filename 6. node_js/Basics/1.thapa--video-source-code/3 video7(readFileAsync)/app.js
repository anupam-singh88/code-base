const fs = require('fs');

//? asynchronous way non blocking nature of javascript
//err is always first in calling callback function
//* fs.writeFile('read.txt', 'today is awesome day', (err) => {
//* 	console.log('file is created');
//* 	console.log(err);
//* })

/*
when we try to write into a file asynchronously we have to pass a callback -> callback is just a function which passed as an argument
the callback must take an error 
// */
// fs.appendFile('read.txt', 'plz like and share and subs to my channel', (err) => {
// 	console.log("task complete");

// })

fs.readFile('read.txt', 'utf8', (err, data) => {
	console.log(data);
	console.log("this world is fake")
})