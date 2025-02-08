function handleFileUpload(file) {
  const baseUrl = "http://localhost:3000/uploads/";
  return baseUrl + file.name; // Construct the file URL using the file name
}

const file = { name: "image.png", content: "...binary data..." };
const fileUrl = handleFileUpload(file);
console.log(fileUrl); // Output: "http://localhost:3000/uploads/image.png"
