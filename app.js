const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const countriesRouter = require("./routes/countries");
const slotsRouter = require("./routes/slots");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/countries", countriesRouter);
app.use("/slots", slotsRouter);

const listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
