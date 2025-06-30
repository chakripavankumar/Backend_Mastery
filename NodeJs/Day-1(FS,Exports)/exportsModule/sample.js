// Exporting the entire array as default
export default ["apple", "banana", "mango"];

//Named Exports  (destructuring)
export const avakado = "avakado";

// The fs.watch() method watches for changes in a file or directory.
const fs = require("fs");

fs.watch("example_file.txt", (eventType, filename) => {
  console.log(`The file ${filename} was modified!`);
  console.log("Event type:", eventType);
});
