const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const userRoutes = require('./routes/user')
const messagesRoutes = require('./routes/mess');
const { Sequelize } = require('sequelize');
const path = require('path');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/images',express.static(path.join(__dirname,'images')));

app.use('/api/auth', userRoutes);

app.use('/api/mess', messagesRoutes);

module.exports = app;
