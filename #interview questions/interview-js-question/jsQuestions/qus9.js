module.exports = {
  solution: function (firstDate, secondDate) {
    const diffTime = Math.abs(secondDate - firstDate); // Get the absolute difference in milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return diffDays; // Return the number of days
  },
  solution2: (first, second) => {
    // Merge the objects and return the resulting object
    const newObj = { ...first, ...second };
    return newObj;
  },
  solution3: (array) => {
    let grouped = {};

    // Loop through the array and group by the first letter
    array.forEach((str) => {
      const firstLetter = str[0].toUpperCase(); // Get the first letter and convert it to uppercase
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = []; // Create an array if it doesn't exist
      }
      grouped[firstLetter].push(str); // Push the string to the corresponding group
    });

    return grouped; // Return the grouped object
  },
  solution4: function (array) {
    let newArray = [];

    // Recursive function to flatten the array
    function flatTheArray(arr) {
      arr.forEach((elm) => {
        if (Array.isArray(elm)) {
          flatTheArray(elm); // If it's an array, recurse
        } else {
          newArray.push(elm); // Otherwise, add the element to the flattened array
        }
      });
    }

    flatTheArray(array); // Call the recursive function
    return newArray; // Return the flattened array
  },
};
