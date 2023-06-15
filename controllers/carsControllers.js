const fs = require('fs')
const path = require('path')

const carsControllers = {
    allCars: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../data/data.json'), 'utf-8', (err, jsonString) => {
           try {
               const jsonToObject = JSON.parse(jsonString)
               const arrWithAllCars = jsonToObject.map(branch => branch.autos.map(car => car))

               if(arrWithAllCars.length === 0) throw new Error('Sorry it appears that we are out of cars, try again later!')
               res.render('cars', {title: 'Cars', data: arrWithAllCars})
           } catch (error) {
            res.render('errors', {title: 'Error 4', error: 'Cars are not found', detailedError: error.message})
           }
        })
    },
    selectedCar: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../data/data.json'), 'utf-8', (err, jsonString) => {
           try {
               const jsonToObject = JSON.parse(jsonString)
               const brandFromParams = req.params.car
    
               const allCarsInStock = []
    
               jsonToObject.map(branch => branch.autos.map(brand => allCarsInStock.push({branch: brand.marca, photoUrl: brand.photoUrl, model: brand.modelo, year: brand.anio})))
               
               const carsByModel = allCarsInStock.filter(car => car.model === brandFromParams)

                const carModelCapitalize = `${carsByModel[0].branch.charAt(0).toUpperCase()}${carsByModel[0].branch.slice(1)}  ${carsByModel[0].model.charAt(0).toUpperCase()}${carsByModel[0].model.slice(1)}`

               if(carsByModel.length === 0) throw new Error('The model of car requested is not in our stores, sorry')
               res.render('selectedCar', {title: carModelCapitalize, data: carsByModel})
           } catch (error) {
            res.render('errors', {title: 'Error 5', error: 'Car not found', detailedError: error.message})
           }
        })
    },
    selectedCarWithDetails: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../data/data.json'), 'utf-8', (err, jsonString) => {
            try {
                const jsonToObject = JSON.parse(jsonString)
            const {car, detail} = req.params

            const allCarsInStock = []

            jsonToObject.map(branch => branch.autos.map(brand => allCarsInStock.push({branch: brand.marca, photoUrl: brand.photoUrl, model: brand.modelo, year: brand.anio, color: brand.color})))
            
            const carsByModel = allCarsInStock.filter(singleCar => singleCar.model === car)

            const selectedDetailedCar = []
            if(carsByModel.length > 0) {
                carsByModel.filter(singleCar => {
                    console.log(detail)
                    if(singleCar.year == detail){
                        selectedDetailedCar.push(singleCar)
                    } else if (singleCar.color === detail) {
                        selectedDetailedCar.push(singleCar)
                    } else {
                        return ''
                    }
                })
            }
            
            const selectedCarUppercase = `${carsByModel[0].branch.charAt(0).toUpperCase()}${carsByModel[0].branch.slice(1)}  ${carsByModel[0].model.charAt(0).toUpperCase()}${carsByModel[0].model.slice(1)}`

            if(selectedDetailedCar.length === 0) throw new Error(`Cars with brand: ${car} and color/year ${detail} are not found in our stores, try again other day`)
            res.render('selectedCarWithDetails', {title: selectedCarUppercase, data: selectedDetailedCar})
            } catch (error) {
                res.render('errors', {title: 'Error 6', error: 'Car not found', detailedError: error.message})
            }

            
        })
    }
}


module.exports = carsControllers