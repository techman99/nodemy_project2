var userService = require("../service/user")
var bookService = require("../service/book")
var express = require("express")
var userRouter = express.Router()
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
var jwt = require('jsonwebtoken');
module.exports = userRouter

userRouter.get("/all-book", async function (req, res, next) {
    try {
        var token = req.cookies.token
        var decodeUser = jwt.verify(token, "UserIdRole")
        // console.log(decodeUser);
        var user = await userService.getById(decodeUser._id)
        if (!user) {
            return res.json({
                error: true,
                message: "User khong ton tai"
            })
        } else {
            res.user = user
            next()
        }
    } catch (error) {
        if (error.message === "jwt must be provided") {
            return res.json({
                error: true,
                message: "Ma token khong duoc cung cap"
            })
        }
        if (error.message === "invalid signature") {
            return res.json({
                error: true,
                message: "Token sai hoac het han"
            })
        }
        if (error.message === "jwt malformed") {
            return res.json({
                error: true,
                message: "Token sai hoac het han"
            })
        }
        if (error.message === "jwt expired") {
            return res.json({
                error: true,
                message: "Token sai hoac het han"
            })
        }
        if (error.message === "jwt token") {
            return res.json({
                error: true,
                message: "Token sai hoac het han"
            })
        }
        return res.json({
            error: true,
            message: "loi he thong"
        })

    }

}, function (req, res) {
    userService.getAllBook().then(function (data) {
        res.json({
            role: res.user.role,
            userId: res.user._id,
            data: data
        })
    })

})

userRouter.post("/sign-up", function (req, res, next) {
    var username = req.body.username;
    userService.checkExsitUsername(username).then((result) => {
        if (!result) {
            console.log(result);
            next()
        } else {
            return res.json({
                error: true,
                message: "Tai Khoan da ton tai",
            })
        }
    })
}, function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            password = hash
            userService.dangki(username, password, email).then(function (data) {
                return res.json({
                    error: false,
                    message: "Them Du lieu thanh cong",
                    data: data
                })
            })
        });
    });
})

userRouter.post("/login", function (req, res, next) {
    userService.checkExsitUsername(req.body.username).then(function (result) {
        if (result) {
            res.user = result;
            next()
        } else {
            return res.json({
                error: true,
                message: "Tai khoan khong ton tai",
                data: result
            })
        }
    })
}, function (req, res) {
    var password = req.body.password
    bcrypt.compare(password, res.user.password, function (err, value) {
        if (value == true) {
            userService.checkLogin(res.user._id, true).then((result) => {
                let token = jwt.sign({ _id: res.user._id, role: res.user.role }, "UserIdRole", { expiresIn: "2d" })
                // console.log(token);
                res.cookie("token", token, { maxAge: 60 * 60 * 1000 * 24 })
                return res.json({
                    error: false,
                    message: " dang nhap thanh cong ",
                    token: token

                })
            }).catch((err) => {
                console.log(err);
            });;
        } else {
            return res.json({
                error: true,
                message: " sai tai khoan hoac mat khau"
            })
        }
    });
})
