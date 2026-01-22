const gameRouter = require('../../routers/gameRouter');
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
//mock session
app.use((req, res, next) => {
  req.session = { timerStart: Date.now() }; 
  next();
});

app.use('/', gameRouter);

test('stop timer route works', done => {
  request(app)
    .post('/stop')
    .expect(200, done);
})