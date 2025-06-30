# 1. 🔍 What is Node.js and How is it Different from JavaScript?

## ✅ What is Node.js?

- Node.js is an **open-source, cross-platform runtime environment** that allows you to run JavaScript **outside of a browser**.
- Built on the **V8 JavaScript engine** (used by Chrome).
- Used to build **server-side applications**, REST APIs, real-time apps, etc.

### ✅ How is Node.js Different from JavaScript?

| Feature         | JavaScript (Browser) | Node.js                            |
| --------------- | -------------------- | ---------------------------------- |
| Environment     | Runs in browser      | Runs on server (backend)           |
| Access to Files | Limited (no `fs`)    | Full access via `fs`, `http`, etc. |
| Use Case        | DOM manipulation, UI | Server, DB, API, File system       |
| Global Object   | `window`             | `global`                           |

### ✅ Why Do We Need Node.js?

- To build **backend applications** using JavaScript.
- Enables **full-stack development** with one language (JS).
- Handles **asynchronous operations** efficiently using the **event loop**.

---

## Node.js Module System

## What is a Module in Node.js?

A module is a file that contains reusable code.
Every file in Node.js is treated as a separate module.
Node uses the CommonJS module system by default.

<!-- #(function (exports, require, module, __filename, __dirname) {
          your code here
}); -->

This is done internally by Node.js using the module wrapper.
🔹 It provides access to:

Parameter
Description
exports
Shortcut to module.exports
require
To import other modules
module
Info about current module
**filename
Full path of the current file
**dirname
Directory of the current module

## ✅ Quick Summary: Modules & fs.watch

Topic
Summary
Node.js Module
Every file is a module; uses CommonJS system
Wrapper Function
Node wraps code internally with 5 params like exports
module.exports
Used to export code from a file
Import with require()
Used to bring in another file’s exports
Exporting Array
Yes, arrays or any JS type can be exported
fs.watch()
Watches files for rename or change events
