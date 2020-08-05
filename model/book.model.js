var mongoose= require("../config/DBconnect")
var Schema = mongoose.Schema;
var bookSchema = new Schema({
   name:String
},{
   collection:"books"
})
var CollectionBook = mongoose.model("book", bookSchema)
console.log();
module.exports = CollectionBook