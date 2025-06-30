const os = require("os");

console.log(os.type());

const freeMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
console.log(freeMem);
console.log(os.cpus().length);
console.log(os.platform());
console.log(os.arch());

const uptime = os.uptime();
console.log(`System Uptime: ${Math.floor(uptime / 3600)} hours`);
console.log(os.userInfo());
const network = os.networkInterfaces();
console.log("Network Interfaces:", network);
Object.values(os.networkInterfaces()).forEach((net) => {
  net.forEach((interface) => {
    if (interface.family === "IPv4" && !interface.internal) {
      console.log("IP Address:", interface.address);
    }
  });
});
