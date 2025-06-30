const crypto = require("crypto");
const os = require("os");

console.log(os.cpus().length);

process.env.UV_THREADPOOL_SIZE = 16;

let start = Date.now();

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});
