var userService = require("../service/user")
var bookService = require("../service/book")
var express = require("express")
var adminRouter = express.Router()
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
var jwt = require('jsonwebtoken');
const CollectionUser = require("../model/user.model");
module.exports = adminRouter

adminRouter.post("/add-book", function (req, res) {
    bookService.addBook(req.body.nameBook).then(function (data) {
        userService.adminAddBookID(data._id)
        return res.json({
            error: false,
            data: data,
            message: "them sach thanh cong"
        })
    })
})

adminRouter.put("/book", function (req, res) {
    var bookId = req.query.bookId
    var newName = req.body.newName
    bookService.updateBook(bookId, newName).then(function (data) {
        return res.json({
            error: false,
            data: data,
            message: "Sua sach thanh cong"
        })
    })
})

adminRouter.delete("/book", function (req, res) {
    var username = req.query.username
    var bookId = req.query.bookId
    var token = req.cookies.token
    var decodeUser = jwt.verify(token, "UserIdRole")

    console.log("rollllllle "+decodeUser.role);

    if (decodeUser.role == "admin") {
        bookService.removeBook(bookId).then(result => {
        })
        userService.adminRemoveBook(username, bookId).then(function (data) {
            return res.json({
                error: false,
                message: "xoa sach thanh cong",
                data: data
            })
        })
    } else {
        res.json("ban khong phai admin")
    }

})
adminRouter.get("/all-user", function (req, res) {
    userService.getAllUser().then(function (data) {
        return res.json({
            error: false,
            message: "Tat ca sach",
            data: data
        })
    })
})
adminRouter.get("/all-book", function (req, res) {
    userService.getAllBook().then(function (data) {
        return res.json({
            error: false,
            message: "Tat ca sach",
            data: data
        })
    })
})
adminRouter.delete("/user", async function (req, res) {
    var username = req.query.username
    var user = await userService.findByUsername(username)
    console.log(user.idBook);

    await userService.deleteUser(user.username)
    console.log("username " + user.username);
    res.json(user)
})

adminRouter.put("/user", function (req, res) {
    var id = req.query.id
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            password = hash
            userService.editUser(id, username, password, email).then(function (data) {
                return res.json({
                    error: false,
                    message: "sua du lieu thanh cong",
                    data: data
                })
            })
        })
    });
})