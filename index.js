require("dotenv").config();
//POST
const methodOverride = require("method-override");
//POST

const path = require("path");

//Parse-body
const bodyParser = require("body-parser");
//Parse-body

//thong bao
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//thong bao

// database
const database = require("./config/database");
database.connect();
// database

// biến toàn cục
const systemConfig = require("./config/system");

// express
const express = require("express");
const app = express();

//thong bao
app.use(cookieParser("fdsfsdfsd"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//thong bao

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// End TinyMCE

//POST
app.use(methodOverride("_method"));
//POST

// parse application/x-www-form-urlencoded, lấy ra cái req.body
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

// express

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// pug
app.set("views", "./views");
app.set("view engine", "pug");
// pug

// app locals variable biến toàn cục(chỉ dùng dc trong file pug, nêu muốn dùng nơi khác phải import )
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// app locals variable

app.use(express.static("public"));

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
