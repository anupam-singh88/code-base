function about(hobby, favMusician) {
  console.log(this.firstName, this.age, hobby, favMusician);
}
const user1 = {
  firstName: "harshit",
  age: 8,
  //   about: about,
};
const user2 = {
  firstName: "mohit",
  age: 9,
};
// user1.about("singing", "buppyLehri");

// apply
// about.apply(user1, ["guitar", "bach"]);

// about.call(user2,'guitar2','moazrt');

// const func = about.bind(user2, "guitar", "bach");
// func();
