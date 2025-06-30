import fs from "fs";
// fs.readFile("file.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data); // Output is readable  : hey there this is day 1
// });
// fs.readFile("file.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data); // Output is not readable  : <Buffer 68 65 79 20 74 68 65 72 65 20 74 68 69 73 20 69 73 20 64 61 79 20 31 0a>
// });

// // UTF-8 is a character encoding that represents
// //  Unicode characters using 8-bit units (bytes).
// // It's a widely used encoding, particularly on the internet, and is backward-compatible with ASCII
// fs.writeFile("file.txt", "Hello World!", (err) => {
//   if (err) throw err;
// });

// // Sync
// fs.writeFileSync("file.txt", "Hello Worldinblocking!");
// // Async
// fs.appendFile("file.txt", "\nAppended Line", (err) => {
//   if (err) throw err;
// });

// // Sync
// fs.appendFileSync("file.txt", "\nAppended Line");
// //In Node.js's fs (file system) module, link and unlink are used for managing file links. fs.link() creates a hard link between two files, while fs.unlink() removes a file or a symbolic link. 
// // fs.link(existingPath, newPath, callback):
// // This method creates a hard link. A hard link is essentially another name for the same file; changes to one file are reflected in the other.
// // existingPath is the path to the existing file.
// // newPath is the path where the new hard link will be created.
// // callback is a function that's executed after the link is created or if an error occurs. 
// // fs.unlink(path, callback):
// // This method removes a file or symbolic link from the file system. 
// // path is the path to the file or symbolic link that needs to be removed. 
// // callback is a function that's executed after the file is removed or if an error occurs. 
// // Async
// fs.rename("file.txt", "new.txt", (err) => {
//   if (err) throw err;
// });
// fs.copyFile("file.txt", "b.txt", (err) => {
//   if (err) throw err;
// });
// // Sync
//  fs.renameSync( "new.txt" , "file.txt");

 // Async
fs.mkdir("myFolder", { recursive: true }, (err) => {
  if (err) throw err;
});

// Sync
// fs.mkdirSync("myFolder", { recursive: true });
