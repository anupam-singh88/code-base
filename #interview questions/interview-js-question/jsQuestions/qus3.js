function generateToken() {
  const length = 16; // Length of the token
  const characters = "0123456789abcdef"; // Hexadecimal characters
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

console.log(generateToken()); // Example output: "a7c8f29b01de34f5"

function generateAlphabets() {
  const alphabets = [];
  for (let i = 65; i <= 90; i++) {
    // ASCII codes for A-Z
    alphabets.push(String.fromCharCode(i));
  }
  return alphabets;
}

const allAlphabets = generateAlphabets();
console.log(allAlphabets); // Output: ["A", "B", "C", ..., "Z"]
