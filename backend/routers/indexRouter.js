const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.use((req, res, next) => {
  const start = req.session.timerStart;
  const end = Date.now();
  const intermediate = end - start;
  console.log(`inter Time ${intermediate}`);
  next();
});

indexRouter.get("/", indexController.getIndex);
indexRouter.post("/guess", indexController.getGuess);

module.exports = indexRouter;
