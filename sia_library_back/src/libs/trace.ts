const bunyan = require("bunyan");

const log = bunyan.createLogger({
    name: "sia_library",
    streams: process.stdout,
});

export default log