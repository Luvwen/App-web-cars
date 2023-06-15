const express = require('express')
const router = express.Router()

const { brandsList, selectedBrand } = require('../controllers/brandsControllers')

router.get('/', brandsList)

router.get('/:brand', selectedBrand)

module.exports = router