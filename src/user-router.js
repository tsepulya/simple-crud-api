const Router = require("./router");

const router = new Router();

const persons = [
    {id: 1, name: 'Petya', age: 30, hobbies: ['hockey', 'swimming']},
    {id: 2, name: 'Vasya', age: 40, hobbies: ['running', 'regby']}
];

router.get('/person', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.send(persons);
})

router.post('/person', (req, res) => {
    res.writeHead(201, {
        'Content-type': 'application/json'
    })
    const person = req.body;
    persons.push(person);
    res.send(person);
})

module.exports = router;