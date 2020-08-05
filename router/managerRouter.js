var userService = require("../service/user")
var bookService = require("../service/book")
var express = require("express")
var managerRouter = express.Router()
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
var jwt = require('jsonwebtoken');
module.exports = managerRouter

managerRouter.post("/add-book", function (req, res) {
    var username = req.query.username
    var namebook = req.body.namebook
    console.log(req.body);
    bookService.addBook(namebook).then(data => {
        userService.managerAddBook(username, data._id)
        return res.json({
            error: false,
            message: "them sach thanh cong",
            data: data
        })
    })

})

managerRouter.delete("/book", function (req, res, next) {
    var check = -1
    var bookId = req.query.bookId
    var username = req.query.username
    userService.managerCheckExistBook(username).then(function (result) {
        for (let i = 0; i < result.idBook.length; i++) {
            if (bookId == result.idBook[i]) {
                check = i
                break
            }
        }
        console.log("check: " + check);
        if (check == -1) {
            res.json({
                error: true,
                message: "Sach nay khong phai cua ban",
                data: result
            })
        } else {
            res.book = result.idBook[check]
            res.username = username
            // console.log("res.book: "+res.book);
            next()
        }
        console.log(res.book);
    })
}, function (req, res) {
    bookService.removeBook(res.book)
    userService.managerRemoveBook(res.username, res.book).then(function (data) {
        return res.json({
            error: false,
            message: "xoa sach thanh cong",
            data: data
        })
    })
})

managerRouter.put("/book", function (req, res, next) {
    var check = -1
    var bookId = req.query.bookId
    var username = req.body.username
    userService.managerCheckExistBook(username).then(function (result) {
        for (let i = 0; i < result.idBook.length; i++) {
            if (bookId == result.idBook[i]) {
                check = i
                break
            }
        }
        console.log(check);
        console.log("check: " + check);
        if (check == -1) {
            res.json({
                error: true,
                message: "Sach nay khong phai cua ban",
                data: result
            })
        } else {
            res.book = result.idBook[check]
            // console.log("res.book: "+res.book);
            next()
        }
    })
}, function (req, res) {
    var newName = req.body.newName
    bookService.updateBook(res.book, newName).then(function (data) {
        return res.json({
            error: false,
            data: data,
            message: "Sua sach thanh cong"
        })
    })
})


managerRouter.get("/all-book", async function (req, res) {
    var token = req.cookies.token
    var decodeUser = jwt.verify(token, "UserIdRole")
    // console.log(decodeUser);
    var user = await userService.getById(decodeUser._id)
    // console.log(user._id, "usereeeeeee");
    req.query.userId=user._id
    userService.getAllBookByiD(req.query.userId).then(function (data) {
        return res.json({
            error: false,
            message: "Tat ca sach cua ban",
            data: data
        })
    })
})
managerRouter.get("/book",  function (req, res) {
    req.query.userId
    userService.getAllBookByiD(req.query.userId).then(function (data) {
        return res.json({
            error: false,
            message: "Tat ca sach cua ban",
            data: data
        })
    })
})