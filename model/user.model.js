var mongoose = require("../config/DBconnect");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    isLogin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    idBook:[{
        type: String,
        ref: "book",
        default:""
    }]
}, {
    collection: "users"
})
var CollectionUser = mongoose.model("user", userSchema)
module.exports = CollectionUser