function countWordOccurrences(text, word) {
  const regex = new RegExp(`\\b${word}\\b`, "gi"); // Match whole word, case-insensitive
  const matches = text.match(regex);
  return matches ? matches.length : 0; // Return the count or 0 if no matches
}

console.log(countWordOccurrences("The cat and the dog.", "the")); // Output: 2
