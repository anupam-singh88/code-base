const obj = {
  user: {
    id: 1,
    profile: {
      name: "John Doe",
      address: {
        city: "New York",
        zip: "10001",
      },
    },
  },
};

const expectedResult = {
  "user.id": 1,
  "user.profile.name": "John Doe",
  "user.profile.address.city": "New York",
  "user.profile.address.zip": "10001",
};

let newObj = {};

function getResult(myobj, parentKey = "") {
  for (let [key, value] of Object.entries(myobj)) {
    // Build the key path by appending the current key to the parent key
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      // Recursively call the function for nested objects
      getResult(value, fullKey);
    } else {
      // Add the key-value pair to the flattened object
      newObj[fullKey] = value;
    }
  }
}

getResult(obj);
console.log(newObj);
