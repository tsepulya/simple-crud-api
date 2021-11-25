const reqPath = require('./constants/req-path');
const persons = require('./persons-db');
const checkPerson = require('./utils/checkPerson');
const setId = require('./utils/setId');
const getPersonId = require('./utils/getPersonId');
const findPersonWithId = require('./utils/find-person-with-id');
const changePerson = require('./utils/change-person');

module.exports =  routes = {
    "/person": function(data, res) {
        if (data.method === 'get') {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.write(JSON.stringify(persons));
            res.end("\n");
        } else if (data.method === 'post') {
            res.setHeader("Content-Type", "application/json");
            const [status, message] = checkPerson(data.body);
            if (message) {
                res.writeHead(status);
                res.write(JSON.stringify(message));
                res.end("\n");
            } else {
                let person = data.body;
                person.id = setId();
                persons.push(person);
                res.writeHead(201);
                res.write(JSON.stringify(person));
                res.end("\n");
            }

        }
        // обработать вариант - ошибку, если другие методы на этот путь 
    },
    notFound: function(data, res) {
        if (!data.path.toString().startsWith("/person")) {
            res.writeHead(404);
            res.write('This resourse doesn`t exist');
            res.end("\n");
        } else if (Array.isArray(getPersonId(data.path))) {
            res.writeHead(404);
            res.write('This resourse doesn`t exist (extra path)');
            res.end("\n");
        } else {
            const idFromPath = getPersonId(data.path);
            res.setHeader("Content-Type", "application/json");
            if (!findPersonWithId(idFromPath)) {
                res.writeHead(404);
                res.write('Person with such id doesn`t exist');
                res.end("\n");
            } else {
                const personWithId = findPersonWithId(idFromPath);
                if (data.method === 'get') {
                    res.writeHead(200);
                    res.write(JSON.stringify(personWithId));
                    res.end("\n");
                } else if (data.method === 'put') {
                    const changedPerson = changePerson(personWithId, data.body);
                    const [status, message] = checkPerson(changedPerson);
                    if (message) {
                        res.writeHead(status);
                        res.write(JSON.stringify(message));
                        res.end("\n");
                    } else {
                        res.writeHead(200);
                        res.write(JSON.stringify(changedPerson));
                        res.end("\n");
                    }

                } else if (data.method === 'delete') {
                    const index = persons.indexOf(personWithId);
                    persons.splice(index, 1);
                    res.writeHead(204);
                    res.end("\n");
                }
            }
        }

    }
  
};