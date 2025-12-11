const { Router } = require('express');
const gameController = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get('/stop', gameController.getTimerStop);

module.exports = gameRouter;
