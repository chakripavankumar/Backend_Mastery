# 🔄 UNDER THE HOOD: Event Loop in Node.js

## ✅ What is the Event Loop?

The **Event Loop** is the core mechanism in Node.js that enables **non-blocking asynchronous I/O** while running on a **single-threaded architecture**.

It ensures:

- Callbacks are executed **in phases**.
- Heavy tasks are offloaded to a **thread pool**.
- JavaScript remains **non-blocking**, even for I/O-heavy apps.

---

## 🧱 Node.js Internal Architecture

```txt
 Source Code
     ↓
 ┌─────────────┐
 │ Node.js CLI │ → initializes Node.js process
 └─────────────┘
     ↓
┌───────────────┐
│ Wrapper Fn    │ → (exports, require, module, __filename, __dirname)
├───────────────┤
│ INIT          │
│ TLC           │ → Top-Level Code (runs immediately)
│ REQUIRE       │
└───────────────┘
     ↓
 Main Thread → Event Loop Starts
```

---

## ▶️ Example Code from Diagram

```js
console.log("Hello world - 1");

setTimeout(() => {
  console.log("Hello from timer - 1");
}, 0);

console.log("Hello world - 2");
```

### ✅ What Happens Internally?

| Step | Phase               | Explanation                                                               |
| ---- | ------------------- | ------------------------------------------------------------------------- |
| 1    | Top-Level Execution | `console.log("Hello world - 1")` runs first.                              |
| 2    | Timers Registered   | `setTimeout` is registered in the Timers Phase queue.                     |
| 3    | Continue Execution  | `console.log("Hello world - 2")` runs after.                              |
| 4    | Event Loop Starts   | After all top-level code executes, event loop begins checking the queues. |
| 5    | Timers Phase        | The 0ms timer callback (`"Hello from timer - 1"`) is executed.            |

### 🧠 Important

Even with `setTimeout(..., 0)`, it runs **after** the top-level code because it's **queued**, not run immediately.

---

## 🌀 Phases of the Event Loop (as seen in the second diagram)

| Phase               | What Happens Here                                          |
| ------------------- | ---------------------------------------------------------- |
| **Timers Phase**    | Executes callbacks from `setTimeout()` and `setInterval()` |
| **I/O Polling**     | Handles finished I/O operations (like `fs.readFile()`)     |
| **Check Phase**     | Executes `setImmediate()` callbacks                        |
| **Close Callbacks** | Executes `close` events (like on sockets/files)            |

---

## 🔃 Thread Pool Offloading (via libuv)

```txt
                          ┌──────────────┐
                          │  Thread Pool │ ← CPU/IO Heavy Tasks
                          └──────┬───────┘
                                 ↓
                          crypto, fs, dns, zlib, etc.
```

Some functions like `fs.readFile()` or `crypto.pbkdf2()` are **offloaded** to the **libuv thread pool**, so they don’t block the event loop.

---

## 📦 Priority Queue Summary

| Queue Name       | Example Function                     | Phase                   |
| ---------------- | ------------------------------------ | ----------------------- |
| Timer Queue      | `setTimeout()`                       | Timers Phase            |
| Poll Queue       | `fs.readFile()`                      | I/O Polling             |
| Check Queue      | `setImmediate()`                     | Check Phase             |
| Close Callbacks  | Stream close events                  | Close Callbacks Phase   |
| Microtasks Queue | `Promise.then()`, `queueMicrotask()` | Executes between phases |

---

## 📜 Typical Output Order from Example

```js
console.log("Hello world - 1");

setTimeout(() => {
  console.log("Hello from timer - 1");
}, 0);

console.log("Hello world - 2");
```

### 🧾 Expected Output

```txt
Hello world - 1
Hello world - 2
Hello from timer - 1
```

---

## ✅ Final Notes

- Node.js runs JavaScript in a **single thread**, but handles I/O concurrently using the **event loop + thread pool**.
- Top-level code always executes **first**.
- Timer callbacks and `setImmediate()` callbacks run in **different phases**.
- Use this flow to **debug async behavior** in real-world Node.js applications.
