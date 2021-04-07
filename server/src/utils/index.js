const dateObject = new Date();
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();
const timeStamp = `${hours}:${minutes}:${seconds}`;

module.exports = timeStamp;
