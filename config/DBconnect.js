var mongoose = require("mongoose")
mongoose.connect(process.env.DB_HOST+"://"+process.env.DB_PROTOCOL+"/"+process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("ket noi thanh cong");
});

module.exports = mongoose