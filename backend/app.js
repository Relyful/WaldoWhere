// const { PrismaClient } = require('./generated/prisma/client.ts');
const express = require('express');
const indexRouter = require('./routers/indexRouter');
const cors = require('cors');

require('dotenv').config()

const PORT = process.env.PORT || 8080;
// const prisma = new PrismaClient();
const app = express();

//Set-up url request body parsing
app.use(express.urlencoded({ extended: false }));
//Set-up cors access
app.use(cors({origin: ["http://localhost:5173"]}));
//Allow json 
app.use(express.json());

app.use('/', indexRouter);

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