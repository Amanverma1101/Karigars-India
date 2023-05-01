const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;

const pages = require('./routes/pages');
const auth = require('./routes/auth');
const forms = require('./routes/forms');
const user = require('./routes/users');

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "application/json" }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const mw = require('./middleware');

app.use('/',mw);
app.use('/',pages);
app.use('/',auth);
app.use('/',forms);
app.use('/',user);

app.listen(PORT, () => {
    console.log(`port is running successfully at server ${PORT} !`);
});
