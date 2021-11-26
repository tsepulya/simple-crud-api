const http = require("http");
const url = require("url");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const routes = require('./router');
const reqPath = require('./constants/req-path');

module.exports = server = http.createServer(function(req, res) {
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

  // npm run start:dev
  // npm run start:prod

  // ToDo:

  // 1. В репозитории с приложением имеется файл Readme.md, содержащий подробные инструкции по установке, запуску и использованию приложения плюс 10 баллов
  // 2. Ошибки, возникающие при обработке запроса на /person корректно обрабатываются и в случае их возникновения API возвращает статус код 500 с соответствующим сообщением плюс 10 баллов
  // 4. Имеются E2E тесты, покрывающие логику приложения (не меньше 3 различных сценариев) плюс 30 баллов
  // 5. Поменять patch на put (просмотреть разницу)
  // 5. Убрать консоль логи, комментарии
  // 6. Перепроверить все запросы, статусы, сообщения


  