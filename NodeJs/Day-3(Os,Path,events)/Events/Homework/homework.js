const EventEmitter = require("events");

const emitter = new EventEmitter();
const originalEmit = emitter.emit;
emitter.emit = function (eventname, args) {
  console.log(`📣 Event Emitted: "${eventname}" with data:`, args);
  return originalEmit.apply(this, [eventname, ...args]);
};

emitter.on("userLoggedIn", (username) => {
  console.log(`✅ ${username} has logged in.`);
});

emitter.on("userLoggedOut", (username) => {
  console.log(`🔒 ${username} has logged out.`);
});

emitter.once("welcome", (user) => {
  console.log(`👋 Welcome ${user} (only once)`);
});

emitter.emit("userLoggedIn", "pavan");
emitter.emit("welcome", "pavan");
emitter.emit("userLoggedOut", "pavan");

console.log("Registered Events:", emitter.eventNames());
console.log(
  "Listeners for 'userLoggedIn':",
  emitter.listenerCount("userLoggedIn")
);
console.log("Listeners for 'welcome':", emitter.listenerCount("welcome"));
