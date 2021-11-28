const http = require("http");
const url = require("url");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const routes = require('./router');
const reqPath = require('./constants/req-path');

module.exports = server = http.createServer(function(req, res) {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  reqPath.id = path;
  let headers = req.headers;
  let method = req.method.toLowerCase();
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", function() {
    if (body) {
        req.body = JSON.parse(body);
    }
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

  server.listen(PORT, "localhost", function(error) {
    if (error) {
      listen(PORT + 1);
    } else {
      console.log(`Server started on PORT ${PORT}`)
    }
  });


  