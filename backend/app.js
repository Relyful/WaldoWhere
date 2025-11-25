// const { PrismaClient } = require('./generated/prisma/client.ts');
const express = require('express');

require('dotenv').config()

const PORT = process.env.PORT || 8080;
// const prisma = new PrismaClient();
const app = express();

//Set-up url request body parsing
app.use(express.urlencoded({ extended: false }));
//Set-up cors access
// app.use(cors({origin: ["https://relys-blog.vercel.app", "https://relys-blog-admin.vercel.app", "http://localhost:5173", "http://localhost:5174"]}));
//Allow json 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

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