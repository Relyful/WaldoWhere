const request = require('supertest');
const express = require('express');

const mockFindFirst = jest.fn();

jest.mock('../../generated/prisma/client.ts', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    waldoGame: {
      findFirst: mockFindFirst,
    },
  })),
}));

const { PrismaClient } = require('../../generated/prisma/client.ts');
const prisma = new PrismaClient();

const gameRouter = require('../../routers/gameRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
//mock session
app.use((req, res, next) => {
  req.session = { 
    timerStart: Date.now(),
    regenerate: (callback) => {
      callback(null);
    }, 
  }
  next();
});

app.use('/', gameRouter);


test('stop timer route works', done => {
  request(app)
    .post('/stop')
    .expect(200, done);
})

test('start timer route works', done => {
  request(app)
    .post('/start')
    .expect(200, done);
})

test('guess route works', done => {
  prisma.waldoGame.findFirst.mockResolvedValue({
    xStart: 0, xEnd: 10, yStart: 0, yEnd: 10
  });
  request(app)
    .post('/guess')
    .send({ x: 5, y: 5, character: 'Waldo' })
    .expect("Content-type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.hit).toEqual(true)
      return done();
    })
    })