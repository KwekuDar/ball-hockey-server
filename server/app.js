const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const db = require('./configs/db.config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tournamentsRouter = require('./routes/tournaments');
const teamsRouter = require('./routes/teams');
const matchesRouter = require('./routes/matches');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
// const matchesRouter = require('./routes/matches');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Mounting the routes
app.use('/', indexRouter);
app.use('/api', usersRouter(db));
app.use('/api', tournamentsRouter(db));
app.use('/api', teamsRouter(db));
app.use('/api', loginRouter(db));
app.use('/api', registerRouter(db));
app.use('/api', matchesRouter(db));
// app.use('/matches', matchesRouter(db));


module.exports = app;
