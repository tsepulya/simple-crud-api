const { v4: uuidv4 } = require('uuid');

const setId = () => {
    return uuidv4();
}

module.exports = setId;