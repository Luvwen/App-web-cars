const express = require('express')
const router = express.Router()

const { allCars, selectedCar, selectedCarWithDetails } = require('../controllers/carsControllers')

router.get('/', allCars)

router.get('/:car', selectedCar)

router.get('/:car/:detail?', selectedCarWithDetails)

module.exports = router