if (process.env.NODE_ENV !== "production") {
   require("dotenv").config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mybrary', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("connected to MongoDB"))
   .catch(err => console.log(err))

app.use('/', indexRouter);
app.use('/authors', authorRouter);

app.listen(process.env.PORT || 3000);