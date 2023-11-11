const mongoose = require('mongoose');
exports.connectMongoose = () => {
    mongoose.connect("mongodb://localhost:27017/WoW")
    .then((e) => console.log(`Connected to Mongodb: ${e.connection.host}`))
    .catch((e) => console.log(e));
};