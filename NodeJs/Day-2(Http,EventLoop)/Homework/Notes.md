# How Promise is executed in the Event Loop in Node.js

In Node.js, Promise.then() callbacks are microtasks.
They are not part of the main phases of the Event Loop like setTimeout, setImmediate, or fs.readFile.

Instead, they go into a special microtask queue, which is executed immediately after the current phase ends, before the Event Loop moves on.
┌────────────────────────────┐
│ Timers Phase │ ← setTimeout(), setInterval()
├────────────────────────────┤
│ I/O Polling Phase │ ← fs.readFile(), net requests
├────────────────────────────┤
│ setImmediate Phase │ ← setImmediate()
├────────────────────────────┤
│ Close Callbacks │ ← socket.on('close')
└────────────────────────────┘
↑
│
Microtasks Queue ← ← ← ← ← ← ←
└── Promises (.then / .catch / .finally)

- Microtasks are processed **after** the current operation and **before** moving to the next event loop phase.

## Difference between setTimeout and setImmediate

Both `setTimeout()` and `setImmediate()` are used to schedule asynchronous code execution, but they behave differently in the **Node.js Event Loop**.

| Feature               | `setTimeout()`                                  | `setImmediate()`                                |
| --------------------- | ----------------------------------------------- | ----------------------------------------------- |
| **When it executes**  | After a _minimum delay_ in the **Timers Phase** | After the **Poll Phase** in the **Check Phase** |
| **Delay guaranteed?** | No. Even `setTimeout(fn, 0)` has no guarantee.  | Yes. Executes **after I/O events** complete     |
| **Use case**          | Schedule code after a delay (non-blocking)      | Schedule callback to run **after current I/O**  |
| **Phase**             | 🕒 Timers Phase                                 | ✅ Check Phase                                  |

If no I/O is involved, the order of setTimeout(fn, 0) and setImmediate() is not predictable — it depends on internal timing and system.

| Feature      | `setTimeout()`         | `setImmediate()`           |
| ------------ | ---------------------- | -------------------------- |
| Executes in  | Timers Phase           | Check Phase                |
| Delay needed | Optional (0ms allowed) | No delay                   |
| I/O Behavior | May run after I/O      | Runs immediately after I/O |
| Use Case     | General scheduling     | Post-I/O callback priority |

## Is req or res an Object or Array in Node.js?

Both req (request) and res (response) are Objects, not Arrays.

## Difference between IP, Port, and Domain

| Concept    | What It Is                     | Example            |
| ---------- | ------------------------------ | ------------------ |
| **IP**     | Address of a device            | `192.168.0.1`      |
| **Port**   | Specific service on the device | `:3000` (Node app) |
| **Domain** | Human-readable name for the IP | `google.com`       |

- IP = Internet Protocol Address.
- It’s the unique address assigned to each device on a network (like your laptop or a server).
- Think of it like a **house address**.
- IPv4: `192.168.1.10`
- IPv6: `2001:0db8:85a3::8a2e:0370:7334`

- Ports let a computer run multiple networked apps.
- It tells your system **which application to send the data to**.
- Think of it like an **apartment number** in a building.

|------|---------------|
| 80 | HTTP (Web) |
| 443 | HTTPS (Secure)|

A **Domain Name** is a human-friendly nickname for an IP address.

- DNS (Domain Name System) translates it into the correct IP.

A[google.com] --> B[DNS Lookup]
B --> C[IP Address: 142.250.190.78]
C --> D[Port 80 (HTTP Service)]

| Concept | Role                             | Analogy          | Example       |
| ------- | -------------------------------- | ---------------- | ------------- |
| IP      | Identifies the device            | House address    | `192.168.1.1` |
| Port    | Identifies app/service on device | Apartment number | `:3000`       |
| Domain  | Human-readable name for IP       | Signboard name   | `example.com` |
