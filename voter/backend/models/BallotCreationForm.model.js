const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  }
});

// Define schema for ballot
const ballotSchema = new mongoose.Schema({
  electionName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  candidates: [candidateSchema] // Embed candidate schema as an array
});

// Create model from schema
const Ballot = mongoose.model('Ballot', ballotSchema);

module.exports = Ballot;
