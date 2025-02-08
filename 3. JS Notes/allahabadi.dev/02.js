// var length = 20;
// function count() {
//     console.log(this.length); // outputs
// }

// const data = [count, "A", 0, 7];

//data[0]("Hey") // 4 binds to length of array because inside function this value depend on how we call the function ///SHORTRICK CHECK THE VALUE ON THE LEFT OF THE FUNC CALLING TIME

// count() //20

// ********************************************
// [a] = [12, 2, 3, 3];
// console.log(a) //12
// ***********************
// const yt = 'frontend'
// const ig = 'backend'

// const result = ig && yt; //&& will result the last value of the expression
// console.log(result) //frontend


// ************************************
// function switchs(num) {
//     console.log(~~num) //2
// }
// switchs(2.2) //also if rename function to switch s it will work as switch is a reseverd keyword

//*********************** */
// const arr = [1, 13];
// const arr = new Array(2);
// console.log(arr)
// arr.forEach((elm) => {
//     console.log('A') // this will not print as arr contain empty indexs not created which is req for foreach fn
// })


//soln
// [...arr].forEach(elm => {
//     console.log('a')
// })

//******** */

// function cosmic() {
//     return age = 'infinity'
// }
// console.log(cosmic()) //infinity
// console.log(age = 'infinity')//infinity
// // in js variable assignment is a expression
//****** */
// let a = 10;
// let b = a++;
// console.log(a + b) //21


//*/***** */
// let name = 'js';
// name[1] = 'q'
// console.log(name) //js string are immutable

//*** */
// const js = 'love';

// if (0 == 1) {
//     js = 'a'
// }

// console.log(js) //love

// //** */
// var show = 1;
// console.log(show) //1

// function show() {
//     console.log('a')
// }
// console.log(show) //1

//due to hoisting fn get top priority and go to topmost and then variable assign and override happen

//** */
// console.time()
// function calc() {
//     let i = 0;
//     while (i < 2000000000) {
//         i++;
//     }
//     console.log('inside fun')
// }

// calc()
// console.timeEnd()

//*** */
// console.log("2" + 1 + 2) //212
// console.log(2 + 1 + '12'); //312

//****** */
// let n = "20";
// console.log(n + 1); //201
// console.log(++n); //21
// console.log(n++) //21
// console.log(n) //22


//**** */
// let a = NaN
// let b = NaN
// console.log(a == b) //false
// console.log(a === b) //false

// console.log(isNaN(a)) //true
// console.log(Object.is(isNaN, isNaN)) //true

//*** */
// let num = 1;
// const sum = ++num + num++;
// console.log(sum) //4

//pre has more precedence than post


//**** */
// var finalScore = 1 + score;
// score = 88;
// console.log(finalScore) //reference err

//*** */
// const obj = { name: 'js' };
// const arr = ['name'];
// obj[arr] = 'react' //here arr will be converted into string 'name' usign toString()
// console.log(obj.name) //react
//********* */
// async function getLion() {
//     return 'a';
// }

// const lion = getLion();
// console.log(lion === 'a') //false
// console.log(lion) //Promise { <fulfilled> }

//** */
// {
//     function show() {
//         console.log(
//             'inside show'
//         )
//     }
// }

// show() //due to hoisting inside show will print

//** */
// let a = (true + "")[3]
// let aa = (true)[3] //undefined
// console.log(a) //e

//** */
// console.log(null == 0); //false null will be treated as an empty object which will return false if you compare with 0
// console.log(null > 0) //false
// console.log(null >= 0) //true
// console.log(null < 0) //false
// console.log(null == undefined) //true
// console.log(null === undefined) //fasle

//******* */
// let sum = function add() {
//     console.log(typeof add); //function
//     add = 'js'
//     console.log(typeof add); //fn

// }

// sum()

// +, Number and parseInt. these three Number() and Unary Plus(+) works exactly same.

// Below are the major differences between Number constructor function and parseInt.
// 1. Number(x) does type coercion to number, while parseInt(x) does parsing.

// 2.Number works well with Scientific Numbers
// Number(“83e4”); // 830000
// Number(“2e2”); // 200

// parseInt(‘4e3’); // 4

// 3. Empty, Nullish value handling is different.
// Number(“”); // 0
// Number(false); // 0
// Number(null); // 0
// Number([]); // 0

// Number(true); // 1

// parseInt(“”); // NaN
// parseInt(null); // NaN
// parseInt(false); // NaN
// parseInt([]); // NaN

// parseInt(true); // NaN

// parseInt(undefined); // NaN
// parseInt({}); // NaN

// Number({}); // NaN

// 4. Number() can’t differentiate different Number System, but parseInt can with radix argument.
// parseInt(10,8)// Octal conversion - output 8
// parseInt(101,2)// Binary conversion - output 5

// Similarity:
// They both also ignore whitespace:
// const foo = “ 6 “;
// console.log(parseInt(foo)); // 6
// console.log(Number(foo)); // 6

//*** */ default param work for undefined or ""
// function sum(a = 5, b = 7) {
//     console.log(a + b)
// }

// sum(null, 20) //20

//** */
