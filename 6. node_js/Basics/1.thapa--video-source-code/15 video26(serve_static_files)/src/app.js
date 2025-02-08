const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

// console.log(path.join(__dirname, "../public")); result --> E: \#Coding playground\3.web dev\5. node js\Thapa Technical\folder\video26\src; E: \#Coding playground\3.web dev\5. node js\Thapa Technical\folder\video26:E: \#Coding playground\3.web dev\5. node js\Thapa Technical\folder\video26\public

//dirname will give the current directory path
// console.log(__dirname); --> E: \#Coding playground\3.web dev\5. node js\Thapa Technical\folder\video26\src

const staticPath = path.join(__dirname, "../public");
// there are 2 types of path one is relative(../,./) and other is static
//built in middleware
//* this will allow all the files of the public folder accessible from anywhere even from the url
app.use(express.static(staticPath))

app.get("/", (req, res) => {
	res.write("<h1>dummy page</h1>");
	res.end();
	// res.send("<h1>dummy page</h1>");
})

// app.static("/static", (req, res) => {
// 	res.send("welcome to my about page");
// })
app.get("/home", (req, res) => {
	res.send("welcome to my home page");
})
app.get("/json", (req, res) => {
	// res.send({
	// 	id: 1,
	// 	name: 'binod'
	// });
	// res.send([{
	// 	id: 1,
	// 	name: 'binod'
	// }, {
	// 	id: 2, name: 'vinod'
	// }]);
	res.json([{
		id: 1,
		name: 'binod'
	}, {
		id: 2, name: 'vinod'
	}]);
	//res.send([{}]) or res.json() these two methods are identical when an object or array is passed but res.json() will also convert non-objects, such as null and undefined, which are not valid json
})
app.get("/error", (req, res) => {
	res.status(404).send("welcome to my error page");
})

app.listen(port, () => {
	console.log(`listening to ${port}`);

})