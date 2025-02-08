function deepMerge(obj1, obj2) {
  const result = { ...obj1 }; // Start with a shallow copy of obj1

  for (const [key, value] of Object.entries(obj2)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      // If the value is an object and the key exists in obj1, merge recursively
      result[key] = deepMerge(result[key] || {}, value);
    } else {
      // Otherwise, directly assign the value from obj2
      result[key] = value;
    }
  }

  return result;
}

const obj1 = { a: 1, b: { x: 10, y: 20 }, c: 3 };
const obj2 = { b: { x: 100 }, d: 4 };

const result = deepMerge(obj1, obj2);
console.log(result);
// Output: { a: 1, b: { x: 100, y: 20 }, c: 3, d: 4 }

// qus
const file = { name: 'image.png', content: '...binary data...' };

const fileUrl = handleFileUpload(file);
// fileUrl should return something like: "http://localhost:3000/uploads/image.png"

// qus
countWordOccurrences('The cat and the dog.', 'the'); // should return 2

// qus
const cache = new Cache();
cache.set('user1', { name: 'John' }, 1000); // expires in 1 second
cache.get('user1'); // returns { name: 'John' }
setTimeout(() => cache.get('user1'), 1500); // returns null
