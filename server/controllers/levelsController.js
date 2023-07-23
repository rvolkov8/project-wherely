const Asset = require('../models/asset');
const Leaderboard = require('../models/leaderboard');
const { validationResult } = require('express-validator');

// GET levels data
exports.getLevelsData = async (req, res) => {
  try {
    const data = await Asset.find().exec();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error while fetching levels data:', err);
    res.sendStatus(500);
  }
};

// GET leaderboards data
exports.getLeaderboardsData = async (req, res) => {
  try {
    const data = await Leaderboard.find().exec();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error while fetching leaderboards data:', err);
    res.sendStatus(500);
  }
};

// PATCH a particular leaderboard data
exports.patchLeaderboardData = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.sendStatus(400);
  }
  try {
    const doc = await Leaderboard.findOne({
      'level-name': req.params.leaderboardName,
    }).exec();

    if (!doc) {
      return res.sendStatus(404); // Leaderboard not found
    }

    doc.scores.push({
      name: req.body.winnerName,
      score: req.body.score,
    });
    await doc.save();
    res.sendStatus(204);
  } catch (err) {
    console.error('Error while patching leaderboard data:', err);
    res.sendStatus(500);
  }
};
