const http = require("http");
const url = require("url");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const routes = require('./router');
const reqPath = require('./constants/req-path');

const server = http.createServer(function(req, res) {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  reqPath.id = path;
  console.log(path);
  let headers = req.headers;
  let method = req.method.toLowerCase();
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
    console.log("got some data");
  });
  req.on("end", function() {
    if (body) {
        req.body = JSON.parse(body);
    }
    console.log("send a response");
    let route =
    typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    let data = {
      path: path,
      headers: headers,
      method: method,
      body: req.body
    };
    route(data, res);
  });
});

  server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

  // npm run start:prod