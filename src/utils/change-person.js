module.exports = changePerson = (person, changedPerson) => {
    Object.keys(changedPerson).forEach(key => {
      if (key !== 'id') {
        person[key] = changedPerson[key];
      }
  
    })
    return person;
  }

  // предусмотреть ошибку если вводят id