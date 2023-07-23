const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
  'level-name': { type: String, required: true },
  scores: { type: Array, required: true },
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
