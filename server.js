const http = require("http");

const port = process.env.PORT || 4000;

const server = require("./app");

const app = http.createServer(server);
app.listen(port, () => console.log("running..."));
