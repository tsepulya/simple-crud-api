const request = require('supertest');
const server = require('../index');
const setId = require('../utils/setId');

jest.mock('../utils/setId');
setId.mockImplementation(() => '110ec58a-a0f2-4ac4-8393-c866d813b8d1');

describe('Scenario № 1. Success for create, update, delete person', function () {
    afterAll(done => {
        server.close();
        done();
    });

    it('"GET" for "/person" - should return empty array' , function(done){
     
        request(server)
            .get("/person")
            .expect(200)
            .expect('[{"id":"1","name":"Petya","age":30,"hobbies":["hockey","swimming"]},{"id":"2","name":"Vasya","age":40,"hobbies":["running","regby"]}]\n')
            .end(done);
    });

    it('"POST" for "/person" - should return new person' , function(done){

        request(server)
            .post("/person")
            .send({name: 'Elena', age: 50, hobbies: ['dancing']})
            .expect(201)
            .expect('{"name":"Elena","age":50,"hobbies":["dancing"],"id":"110ec58a-a0f2-4ac4-8393-c866d813b8d1"}\n')
            .end(done);
    });

    it('"GET" for "/person/id" - should return created person' , function(done){

        request(server)
            .get("/person/110ec58a-a0f2-4ac4-8393-c866d813b8d1")
            .expect(200)
            .expect('{"name":"Elena","age":50,"hobbies":["dancing"],"id":"110ec58a-a0f2-4ac4-8393-c866d813b8d1"}\n')
            .end(done);
    });

    it('"PUT" for "/person/id" - should return changed person' , function(done){

        request(server)
            .put("/person/110ec58a-a0f2-4ac4-8393-c866d813b8d1")
            .send({name: 'Max', age: 60, hobbies: ['football']})
            .expect(200)
            .expect('{"name":"Max","age":60,"hobbies":["football"],"id":"110ec58a-a0f2-4ac4-8393-c866d813b8d1"}\n')
            .end(done);
    });

    it('"DELETE" for "/person/id" - should delete person' , function(done){

        request(server)
            .delete("/person/110ec58a-a0f2-4ac4-8393-c866d813b8d1")
            .expect(204)
            .end(done);
    });

    it('"GET" for "deleted person - should return 404 status' , function(done){

        request(server)
            .get("/person/110ec58a-a0f2-4ac4-8393-c866d813b8d1")
            .expect(404)
            .expect('"Person with such id doesn`t exist"\n')
            .end(done);
    });

});

// + GET-запросом получаем все объекты (ожидается пустой массив)
// + POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)
// + GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)
// + PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)
// + DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)
// + GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)