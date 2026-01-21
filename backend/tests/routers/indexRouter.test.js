const indexRouter = require('../../routers/indexRouter');
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
//mock session
app.use((req, res, next) => {
  req.session = { timerStart: Date.now() }; 
  next();
});

app.use('/', indexRouter);


test('index route works', done => {
  request(app)
  .get('/')
  .expect("Content-type", /text/)
  .expect(200, done);
});