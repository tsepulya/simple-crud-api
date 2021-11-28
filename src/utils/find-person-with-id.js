const persons = require('../persons-db');

module.exports = findPersonWithId = (id) => {
    let person = persons.find(elem => elem.id === id);
    if (person === -1) {
        return null;
    } else {
        return person;
    }
}