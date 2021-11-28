module.exports = getPersonId = (path) => {
    const pathArray = path.split('/').filter(element => element != '');
    if (pathArray.length === 2) {
        return pathArray[1];
    } else {
        return [404, "This resourse doesn`t exist"]
    }
}