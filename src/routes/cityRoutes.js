const express = require('express');
const router = express.Router();
const {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity
} = require('../controllers/cityController');

router.post('/', createCity);
router.get('/', getCities);
router.get('/:id', getCityById);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

module.exports = router;