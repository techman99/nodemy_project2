var CollectionUser = require("../model/user.model");
const { collection } = require("../model/user.model");
require("../model/book.model")

// for (let i = 1; i <=3; i++) {
//     CollectionUser.create({
//     email: "manager"+ i + "@gmail.com",
//     username: "manager"+i, 
//     password: "1",
//     isLogin: false,
//     role: "manager",
//     idBook:""
// }).then(function (data) {
//     console.log(data);
// }).catch(function (err) {
//     console.log(err);
// })
// }

function getAllBook() {
    return CollectionUser.find({
        $or: [{
            role: /admin/i,
        }, {
            role: /manager/i
        },]
    }, {
        username: 1
    }).populate("idBook")

}
function getById(id) {
    return CollectionUser.findOne({
        _id: id
    })
}
function checkExsitUsername(username) {
    return CollectionUser.findOne({
        username: username
    })
}
// checkExsitUsername("dat").then(data=>{
//     console.log(data);
// })
function dangki(username, password, email, role) {
    return CollectionUser.create({
        email: email,
        username: username,
        password: password,
    })
}
function checkLogin(idUser, isLogin) {
    return CollectionUser.updateOne({ _id: idUser }, { isLogin })
}
// =======admin=============
function getAllUser() {
    return CollectionUser.find({
        $or: [{
            role: /manager/i,
        }, {
            role: /user/i
        },]
    }).populate("idBook")
}
function findByUsername(username) {
    return CollectionUser.findOne({
        username: username
    })
}
function deleteUser(username) {
    return CollectionUser.deleteOne({
        username: username
    })
}

function editUser(id, username, password, email) {
     return CollectionUser.updateOne({
        _id: id
    }, {
        username: username,
        password: password,
        email: email
    })
}

// editUser("5f296e58bd0bb60be8129246","hoangdat4","2","hoangdat@").then(data=>{
//     console.log("sua thanh cong");
// })
function adminAddBookID(idBook) {
    return CollectionUser.update({
        role: "admin"
    }, {
        $push: {
            idBook: idBook
        }
    }, { new: true }).then(function (data) {
        console.log(data);
    })
}
function adminRemoveBook(username, idBook) {
    return CollectionUser.update({
        username: username
    }, {
        $pull: {
            idBook: idBook
        }
    }, { new: true }).then(function (data) {
        console.log(data);
    })
}

function checkExistBook() {
    return CollectionUser.findOne({
        role: "admin"
    })
}
// checkExistBook()

// =======manager======
function managerAddBook(username, idBook) {
    return CollectionUser.updateOne({
        username: username
    }, {
        $push: {
            idBook: idBook
        }
    }, { new: true }).then(function (data) {
    })
}

function managerRemoveBook(managername, idBook) {
    return CollectionUser.update({
        $and: [{
            role: /manager/i,
        }, {
            username: managername
        },]
    }, {
        $pull: {
            idBook: idBook
        }
    }, { new: true }).then(function (data) {
        console.log(data);
    })
}
function managerCheckExistBook(managername) {
    return CollectionUser.findOne({
        $and: [{
            role: /manager/i,
        }, {
            username: managername
        },]
    })
}
function managerGetAllBook(managername) {
    return CollectionUser.findOne({
        $and: [{
            role: /manager/i,
        }, {
            username: managername
        },]
    }, {
        username: 1
    }).populate("idBook")

}

function getAllBookByiD(id) {
    return CollectionUser.findOne({
        _id: id
    }, {
        idBook: 1, _id: 0, username: 1
    }).populate("idBook")

}
module.exports = {
    adminAddBookID, checkExistBook, adminRemoveBook, getAllBookByiD, getAllUser, deleteUser, findByUsername,editUser
    ,managerAddBook, getAllBook, managerRemoveBook, managerCheckExistBook, managerGetAllBook,
    checkExsitUsername, dangki, checkLogin, getById,

}