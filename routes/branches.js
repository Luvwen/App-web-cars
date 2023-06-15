var express = require('express');
var router = express.Router();

const { branchesList, selectedBranch } = require('../controllers/branchesControllers')

router.get('/', branchesList);

router.get('/:branch', selectedBranch)
module.exports = router;
