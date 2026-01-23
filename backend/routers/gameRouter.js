const { Router } = require('express');
const gameController = require('../controllers/gameController');
const sessionMiddleware = require('../middleware/sessionMiddleware');

const gameRouter = Router();

gameRouter.post('/stop', gameController.postTimerStop);
gameRouter.post('/start', sessionMiddleware.regenSession, gameController.postTimerStart);
gameRouter.post("/guess", gameController.getGuess);
gameRouter.post('/savegame', gameController.saveToLeaderBoard);
gameRouter.get('/leaderboard', gameController.showLeaderboard);

module.exports = gameRouter;
