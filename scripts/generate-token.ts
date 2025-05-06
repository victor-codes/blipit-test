const { randomBytes } = require("crypto");
const token = randomBytes(32);

console.log(token.toString("hex"));
