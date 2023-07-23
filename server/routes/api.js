var express = require('express');
var router = express.Router();
const levelsController = require('../controllers/levelsController');
const { body } = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'Welcome to the Wherely API' });
});

router.get('/levels', levelsController.getLevelsData);
router.get('/leaderboards', levelsController.getLeaderboardsData);
router.patch(
  '/leaderboards/:leaderboardName',
  body('winnerName').trim().notEmpty(),
  levelsController.patchLeaderboardData
);

module.exports = router;
