const express = require('express');
const router = express.Router();
const {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState
} = require('../controllers/stateController');

router.post('/', createState);
router.get('/', getStates);
router.get('/:id', getStateById);
router.put('/:id', updateState);
router.delete('/:id', deleteState);

module.exports = router;