// arrow functions dont have this in their scope they find this in one level up

const user1 = {
  firstName: "harshit",
  age: 8,
  about: () => {
    console.log(this.firstName, this.age);
  },
};

user1.about(user1);
//undefinded undefined
