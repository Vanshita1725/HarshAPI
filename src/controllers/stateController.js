const State = require('../models/stateModel');
const Country = require('../models/countryModel');

exports.createState = async (req, res) => {
  try {
    // Verify country exists
    const country = await Country.findById(req.body.country);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStates = async (req, res) => {
  try {
    const states = await State.find().populate('country').sort('name');
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id).populate('country');
    if (!state) return res.status(404).json({ error: 'State not found' });
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });
    if (!state) return res.status(404).json({ error: 'State not found' });
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ error: 'State not found' });
    res.json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};