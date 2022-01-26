const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const limiter = require("./middleware/api-limiter");
const helmet = require("helmet");
const userRoutes = require('./routes/user')
const messagesRoutes = require('./routes/message');
const { Sequelize } = require('sequelize');
const path = require('path');


app.use(helmet())


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
  res.setHeader ( 'Cross-Origin-Resource-Policy' ,  'same-site' ) 
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public',express.static(path.join(__dirname,'image')));

app.use('/api/user', limiter, userRoutes);

app.use('/api/message',  limiter, messagesRoutes);

module.exports = app;
