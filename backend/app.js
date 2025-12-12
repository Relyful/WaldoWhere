// const { PrismaClient } = require('./generated/prisma/client.ts');
const express = require('express');
const indexRouter = require('./routers/indexRouter');
const gameRouter = require('./routers/gameRouter');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config()

const PORT = process.env.PORT || 8080;
// const prisma = new PrismaClient();
const app = express();

//Set-up url request body parsing
app.use(express.urlencoded({ extended: false }));
//Set-up cors access
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
//Allow json 
app.use(express.json());
//Set-up session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 6}, //6 hours
}));

app.use('/', indexRouter);
app.use('/game', gameRouter)

//Catch all route
app.get("/*splat", (req, res) => {
  res.send("You cannot be here :( .");
});

//Error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    errMessage: err.message
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));