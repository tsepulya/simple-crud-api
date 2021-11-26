const request = require('supertest');
const server = require('../index');

describe('Scenario № 2. Errors: not existing resources, not valid id', function () {

    afterAll(done => {
        server.close();
        done();
    });

    it('"GET" for "/something" - should return status 404' , function(done){
     
        request(server)
            .get("/something")
            .expect(404)
            .expect('"This resourse doesn`t exist"\n')
            .end(done);

    });

    it('"GET" for "/person/id/something" - should return status 404' , function(done){
    

        request(server)
            .get("/person/110ec58a-a0f2-4ac4-8393-c866d813b8d1/something")
            .expect(404)
            .expect('"This resourse doesn`t exist (extra path)"\n')
            .end(done);

    });

    it('"GET" for "/person/id - not uuid" - should return status 400' , function(done){
     
        request(server)
            .get("/person/12345")
            .expect(400)
            .expect('"Person Id is not valid"\n')
            .end(done);

    });

});