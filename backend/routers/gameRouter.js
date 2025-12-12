const { Router } = require('express');
const gameController = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.post('/stop', gameController.postTimerStop);
gameRouter.post('/start', gameController.postTimerStart);

module.exports = gameRouter;
