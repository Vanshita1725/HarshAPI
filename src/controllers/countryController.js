const Country = require('../models/countryModel');

exports.createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort('name');
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    res.json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });
    if (!country) return res.status(404).json({ error: 'Country not found' });
    res.json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};