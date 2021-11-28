# simple-crud-api
RS School NodeJS Course (Task 3) https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/simple-crud-api.md

# Simple CRUD API
Inplementation of simple CRUD API using in-memory database underneath

# How to install
1. Clone this repository
2. Go to folder "simple-crud-api"
2. Change branch to "simple-crud-api"
3. To install all dependencies use 'npm install'

# How to use

You can use:
* "npm run start:dev" - to start server
* "npm run start:prod" - to build a file and open it
* "npm test" - to test scenarios for server

After starting the server, you can choose any programme for testing API (for example, Postman).

# API rules
* GET "/person" - should return all persons (at first time it will be an empty array)
* GET "/person/${personId}" - should return person with corresponding personId
* POST "/person" - is used to create record about new person and store it in database
* PUT "/person/${personId}" - is used to update record about existing person
* DELETE "/person/${personId}" is used to delete record about existing person from database

# Rules for POST and PUT
* name — person's name (string, required)
* age — person's age (number, required)
* hobbies — person's hobbies (array of strings or empty array, required)