const setId = require('./setId');
const persons = require('../persons-db');

module.exports = checkPerson = (person) => {
    let statusMessage = [];
    if (!person.name || !person.age || !person.hobbies) {
        statusMessage.push(400);
        statusMessage.push("Not full data: name, age and hobbies are required");
        // res.writeHead(400, { 'Content-Type': 'text/plain' });
        // res.end("Not full data: name, age and hobbies are required");
    } else if (typeof(person.name) !== 'string') {
        statusMessage.push(400);
        statusMessage.push("name must be a string");
        // res.writeHead(400, { 'Content-Type': 'text/plain' });
        // res.end("name must be a string");
    } else if (typeof(person.age) !== 'number') {
        statusMessage.push(400);
        statusMessage.push("nage must be a number");
        // res.writeHead(400, { 'Content-Type': 'text/plain' });
        // res.end("age must be a number");
    } else if (!Array.isArray(person.hobbies)) {
        statusMessage.push(400);
        statusMessage.push("hobbies must be an array");
        // res.writeHead(400, { 'Content-Type': 'text/plain' });
        // res.end("hobbies must be an array");
    } else {
        return statusMessage;
    }
    return statusMessage;
}