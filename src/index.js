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

  // server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  server.listen(PORT, "localhost", function(error) {
    if (error) {
      // console.error("Unable to listen on port", PORT, error);
      listen(PORT + 1);
      // return;
    } else {
      console.log(`Server started on PORT ${PORT}`)
    }
  });

  // npm run start:dev
  // npm run start:prod

  // ToDo:

  // 1. В репозитории с приложением имеется файл Readme.md, содержащий подробные инструкции по установке, запуску и использованию приложения плюс 10 баллов
  // 2. Ошибки, возникающие при обработке запроса на /person корректно обрабатываются и в случае их возникновения API возвращает статус код 500 с соответствующим сообщением плюс 10 баллов
  // 5. Убрать консоль логи, комментарии
  // 6. Перепроверить все запросы, статусы, сообщения
  // 7. Перепроверить тесты


  