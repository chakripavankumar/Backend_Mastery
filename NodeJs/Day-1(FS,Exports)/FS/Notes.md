# 📁 Node.js `fs` Module — **Async vs Sync Methods**

## 🧠 Quick Concept

- **Async methods**: Non-blocking, use **callback** or **Promise (`fs.promises`)**
- **Sync methods**: Blocking, execute sequentially. Use with care in production.

---

## 📜 FILE OPERATIONS

### ✅ `readFile` vs `readFileSync`

```js
// Async
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Sync
const data = fs.readFileSync("file.txt", "utf8");
console.log(data);
```

---

### ✅ `writeFile` vs `writeFileSync`

```js
// Async
fs.writeFile("file.txt", "Hello World!", (err) => {
  if (err) throw err;
});

// Sync
fs.writeFileSync("file.txt", "Hello World!");
```

---

### ✅ `appendFile` vs `appendFileSync`

```js
// Async
fs.appendFile("file.txt", "\nAppended Line", (err) => {
  if (err) throw err;
});

// Sync
fs.appendFileSync("file.txt", "\nAppended Line");
```

---

### ✅ `unlink` vs `unlinkSync` (Delete File)

```js
// Async
fs.unlink("file.txt", (err) => {
  if (err) throw err;
});

// Sync
fs.unlinkSync("file.txt");
```

---

### ✅ `rename` vs `renameSync`

```js
// Async
fs.rename("old.txt", "new.txt", (err) => {
  if (err) throw err;
});

// Sync
fs.renameSync("old.txt", "new.txt");
```

---

### ✅ `copyFile` vs `copyFileSync`

```js
// Async
fs.copyFile("a.txt", "b.txt", (err) => {
  if (err) throw err;
});

// Sync
fs.copyFileSync("a.txt", "b.txt");
```

---

## 📁 DIRECTORY OPERATIONS

### ✅ `mkdir` vs `mkdirSync`

```js
// Async
fs.mkdir("myFolder", { recursive: true }, (err) => {
  if (err) throw err;
});

// Sync
fs.mkdirSync("myFolder", { recursive: true });
```

---

### ✅ `readdir` vs `readdirSync`

```js
// Async
fs.readdir(".", (err, files) => {
  if (err) throw err;
  console.log(files);
});

// Sync
const files = fs.readdirSync(".");
console.log(files);
```

---

### ✅ `rm` / `rmdir` vs `rmSync` / `rmdirSync`

```js
// Async (modern)
fs.rm("myFolder", { recursive: true, force: true }, (err) => {
  if (err) throw err;
});

// Sync
fs.rmSync("myFolder", { recursive: true, force: true });
```

---

## 📊 FILE INFO (STATISTICS)

### ✅ `stat` vs `statSync`

```js
// Async
fs.stat("file.txt", (err, stats) => {
  if (err) throw err;
  console.log(stats.isFile(), stats.size);
});

// Sync
const stats = fs.statSync("file.txt");
console.log(stats.isFile(), stats.size);
```

---

## 👀 WATCHING FILES

### ✅ `fs.watch` (No Sync Version)

```js
fs.watch("file.txt", (eventType, filename) => {
  console.log(`Event: ${eventType} on file: ${filename}`);
});
```

---

## 📦 `fs.promises` (Async/Await Style)

Modern and cleaner async usage:

```js
const fsPromises = require("fs").promises;

async function read() {
  const data = await fsPromises.readFile("file.txt", "utf8");
  console.log(data);
}
read();
```

---

## 📌 Summary Table

| Purpose     | Async Method    | Sync Method         |
| ----------- | --------------- | ------------------- |
| Read File   | `fs.readFile`   | `fs.readFileSync`   |
| Write File  | `fs.writeFile`  | `fs.writeFileSync`  |
| Append File | `fs.appendFile` | `fs.appendFileSync` |
| Delete File | `fs.unlink`     | `fs.unlinkSync`     |
| Rename File | `fs.rename`     | `fs.renameSync`     |
| Copy File   | `fs.copyFile`   | `fs.copyFileSync`   |
| Create Dir  | `fs.mkdir`      | `fs.mkdirSync`      |
| Read Dir    | `fs.readdir`    | `fs.readdirSync`    |
| Remove Dir  | `fs.rm`         | `fs.rmSync`         |
| File Info   | `fs.stat`       | `fs.statSync`       |

## 5. 🏗️ Architecture of Node.js

### ✅ Key Components

1. **V8 Engine** – Executes JavaScript code.
2. **Event Loop** – Handles asynchronous tasks (non-blocking).
3. **Libuv** – C++ library for handling OS-level operations (like file and network I/O).
4. **Callbacks/Promises** – Mechanism to deal with async code.
5. **Single Threaded** – But handles multiple connections using **non-blocking I/O**.

## ✅ Diagram Overview

            ┌────────────────────────────┐
            │   JavaScript Application   │
            └────────────┬───────────────┘
                         │
              ┌──────────▼─────────┐
              │     Node.js        │
              └──────────┬─────────┘
                         │
        ┌────────────────┴────────────────┐
        │       Event Loop (libuv)        │
        └────────────┬────────────┬───────┘
                     │            │
         ┌───────────▼───┐    ┌───▼─────────┐
         │ Non-blocking  │    │ Worker Pool │
         │ Operations    │    │ (for heavy  │
         │ (Timers, I/O) │    │  tasks)     │
         └───────────────┘    └─────────────┘
