const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.getIndex);
indexRouter.post("/guess", indexController.getGuess);

module.exports = indexRouter;