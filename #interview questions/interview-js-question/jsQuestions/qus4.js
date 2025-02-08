function filterObjectKeys(obj, condition) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (condition(key)) {
      result[key] = value;
    }
  }

  return result;
}

const user = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  isAdmin: false,
};

const condition = (key) => key.startsWith("e");

const filteredResult = filterObjectKeys(user, condition);
console.log("🚀 ~ filteredResult:", filteredResult);
