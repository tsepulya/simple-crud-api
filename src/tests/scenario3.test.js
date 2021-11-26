const request = require('supertest');
const server = require('../index');

describe('Scenario № 3. Errors in post request', function () {

    afterAll(done => {
        server.close();
        done();
    });

    it('"POST" should return status 400, if there is no name' , function(done){
     
        request(server)
            .post("/person")
            .send({age: 50, hobbies: ['dancing']})
            .expect(400)
            .expect('"Not full data: name, age and hobbies are required"\n')
            .end(done);

    });

    it('"POST" should return status 400, if there is no age' , function(done){
     
        request(server)
            .post("/person")
            .send({name: "Elena", hobbies: ['dancing']})
            .expect(400)
            .expect('"Not full data: name, age and hobbies are required"\n')
            .end(done);

    });

    it('"POST" should return status 400, if there is no hobbies' , function(done){
     
        request(server)
            .post("/person")
            .send({name: "Elena", age: 50})
            .expect(400)
            .expect('"Not full data: name, age and hobbies are required"\n')
            .end(done);

    });

    it('"POST" should return status 400, if name is not a string' , function(done){
     
        request(server)
            .post("/person")
            .send({name: 555, age: 50, hobbies: ['dancing']})
            .expect(400)
            .expect('"name must be a string"\n')
            .end(done);

    });

    it('"POST" should return status 400, if age is not a number' , function(done){
     
        request(server)
            .post("/person")
            .send({name: "Elena", age: 'aaa', hobbies: ['dancing']})
            .expect(400)
            .expect('"age must be a number"\n')
            .end(done);

    });

    it('"POST" should return status 400, if hobbies is not an array' , function(done){
     
        request(server)
            .post("/person")
            .send({name: "Elena", age: 50, hobbies: 'dancing'})
            .expect(400)
            .expect('"hobbies must be an array"\n')
            .end(done);

    });

});