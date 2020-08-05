var CollectionBook = require("../model/book.model")

// for (let i = 1; i <= 3; i++) {
//     CollectionBook.create({
//      name: "book"+ i
//     }).then(function(data){
//         console.log(data);
//     }).catch(function(err){
//         console.log(err);
//     })
// }
function addBook(bookname) {
    return CollectionBook.create({
        name: bookname
    })
}

function updateBook(idBook,newname){
    return CollectionBook.updateOne({
        _id: idBook
    },{
        name:newname
    })
}
function removeBook(bookId){
    return CollectionBook.deleteOne({
        _id:bookId
    }).then(data=>{
        console.log("xoa het sach thanh cong");
    })
}

// removeBook("5f2443f213f5bb04bcc707a4")
module.exports = {
    addBook,updateBook,removeBook
}