const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const blogsRouter = require("./controllers/blogs");

const app = express()

const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app;
