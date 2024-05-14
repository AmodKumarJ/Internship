const express = require('express');
const router = express.Router();
const Ballot = require('../models/BallotCreationForm.model');
const { verifyToken } = require('../middleware/auth');

// GET all ballots
router.get('/ballots', verifyToken, async (req, res) => {
  try {
    const ballots = await Ballot.find();
    res.json(ballots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific ballot
router.get('/ballots/:id',verifyToken, async (req, res) => {
  try {
    const ballot = await Ballot.findById(req.params.id);
    if (ballot == null) {
      return res.status(404).json({ message: 'Ballot not found' });
    }
    res.json(ballot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new ballot
router.post('/ballots',verifyToken, async (req, res) => {
  const ballot = new Ballot({
    electionName: req.body.electionName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    candidates: req.body.candidates
  });

  try {
    const newBallot = await ballot.save();
    res.status(201).json(newBallot);
    console.log("BallotCreated")
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a ballot
router.patch('/ballots/:id',verifyToken, async (req, res) => {
  try {
    const ballot = await Ballot.findById(req.params.id);
    if (ballot == null) {
      return res.status(404).json({ message: 'Ballot not found' });
    }
    if (req.body.electionName != null) {
      ballot.electionName = req.body.electionName;
    }
    if (req.body.startDate != null) {
      ballot.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      ballot.endDate = req.body.endDate;
    }
    if (req.body.candidates != null) {
      ballot.candidates = req.body.candidates;
    }
    const updatedBallot = await ballot.save();
    res.json(updatedBallot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a ballot
router.delete('/ballots/:id',verifyToken, async (req, res) => {
  try {
    const ballot = await Ballot.findById(req.params.id);
    if (ballot == null) {
      return res.status(404).json({ message: 'Ballot not found' });
    }
    await ballot.deleteOne();
    res.json({ message: 'Ballot deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
