const express = require('express')
require("express-async-errors");
const mongoose = require('mongoose')
const cors = require('cors')

const errorHandler = require("./utils/error");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const app = express()

const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

app.use(errorHandler);

module.exports = app;
