const express = require('express');
const router = express.Router();
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

router.post('/add', addIncome);
router.get('/list', getIncomes);
router.delete('/delete/:id', deleteIncome);

module.exports = router;
