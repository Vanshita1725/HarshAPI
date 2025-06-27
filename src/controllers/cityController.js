const City = require('../models/cityModel');
const State = require('../models/stateModel');

exports.createCity = async (req, res) => {
  try {
    // Verify state exists
    const state = await State.findById(req.body.state);
    if (!state) return res.status(404).json({ error: 'State not found' });
    
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find()
      .populate({
        path: 'state',
        populate: { path: 'country' }
      })
      .sort('name');
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id)
      .populate({
        path: 'state',
        populate: { path: 'country' }
      });
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json(city);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json(city);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};