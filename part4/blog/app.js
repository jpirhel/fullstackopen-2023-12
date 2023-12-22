const express = require('express')
require("express-async-errors");
const mongoose = require('mongoose')
const cors = require('cors')

const middleware = require("./utils/middleware");

const errorHandler = require("./utils/error");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express()

const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(errorHandler);

module.exports = app;
