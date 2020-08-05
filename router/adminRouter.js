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

adminRouter.put("/update-book"
    // , function (req, res, next) {
    //     var check = -1
    //     var bookId = req.query.bookId
    //     userService.checkExistBook().then(function (result) {
    //         for (let i = 0; i < result.idBook.length; i++) {
    //             // console.log(result.idBook[i]);
    //             if (bookId == result.idBook[i]) {
    //                 check = i
    //                 break
    //             }
    //         }
    //         console.log("check: " + check);
    //         if (check == -1) {
    //             res.json({
    //                 error: true,
    //                 message: "Sach nay khong phai cua ban",
    //                 data: result
    //             })
    //         } else {
    //             res.book = result.idBook[check]
    //             // console.log("res.book: "+res.book);
    //             next()
    //         }

    //     })
    // }
    , function (req, res) {
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
    bookService.removeBook(bookId).then(result => {
        console.log("xoa o sach thanh cong");
    })
    userService.adminRemoveBook(username, bookId).then(function (data) {
        return res.json({
            error: false,
            message: "xoa sach thanh cong",
            data: data
        })
    })
})
adminRouter.get("/get-all-user", function (req, res) {
    userService.getAllUser().then(function (data) {
        return res.json({
            error: false,
            message: "Tat ca sach",
            data: data
        })
    })
})
adminRouter.get("/get-all-book", function (req, res) {
    userService.getAllBook().then(function (data) {
        return res.json({
            error: false,
            message: "Tat ca sach",
            data: data
        })
    })
})
adminRouter.delete("/delete-user", async function (req, res) {
    var username = req.query.username
    var user = await userService.findByUsername(username)
    console.log(user.idBook);
    if (user.role == "manager") {
        user.idBook.forEach(i => {
            bookService.removeBook(i)
            console.log(i);
        });
    }
    await userService.deleteUser(user.username)
    console.log("username " + user.username);
    res.json(user)
})

adminRouter.put("/update-user", function (req, res) {
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