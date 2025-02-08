/*Events module
node js has a inbuilt module called events where you can create ,-fire and listen for your events
ex1- registering for the event to be fired only one time using once
ex2- create an event emitter instance and register a couple of callbacks
ex3- registering for the event with callback parameters
*/
const EventEmitter = require("events");
// //or
// const events = require('events');
// const EventEmitter= new event.EventEmitter()

const event = new EventEmitter();
event.on("checkPage", (sc, msg) => {
  console.log(`status code is ${sc} and the page is ${msg}`);
});
event.emit("checkPage", 200, "ok");

// myName(200, "ok");
event.on("sayName", ({ firstName, lastName }) => {
  console.log("Your name is " + firstName + " " + lastName);
});
// event.on("sayName", () => {
//   console.log("Your name is vinod");
// });

//how to listen for events

event.emit("sayName", { firstName: "vinod", lastName: "thapa" });
event.emit("checkPage");
