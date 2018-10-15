const mongoose = require('mongoose');
//connect to your server here
mongoose.connect('mongodb://paul:Ferrari3394@ds129670.mlab.com:29670/porta');
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', function () {
    console.log('mongoose connection error');
});
db.once('open', function () {
    console.log('mongoose connection successfull');
});

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    //maybe add other things here
});
var User = mongoose.model('User', userSchema);

module.exports.User = User;