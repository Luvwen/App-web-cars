const fs = require('fs')
const path = require('path')

const brandsControllers = {
    brandsList: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../data/data.json'),'utf-8', (err, jsonString) => {
            try {
                const jsonToObject = JSON.parse(jsonString)
    
                let brands = []
                let uniqueBrands = []
                let photos = []
                let uniquePhotos = []
                jsonToObject.map(branch => branch.autos.map(brand => {
                    brands.push(brand.marca)
                    photos.push(brand.brandPhoto)
                }))
    
                brands.map(brand => { 
                    if(!uniqueBrands.includes(brand)) {
                        uniqueBrands.push(brand)
                    }
                })
                photos.map(photo => { 
                    if(!uniquePhotos.includes(photo)) {
                        uniquePhotos.push(photo)
                    }
                })

                const combinedArr = uniqueBrands.map((brand, i) => {
                    return { brand: brand, photo: uniquePhotos[i] };
                  });

                res.render('brands', {title: 'Brands', data: combinedArr})
            } catch (error) {
                res.render('errors', {title: 'Error 2', error: 'Brands not found', detailedError: error.message})
            }
        })
    },
    selectedBrand: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../data/data.json'),'utf-8', (err, jsonString) => {
            try {
                const jsonToObject = JSON.parse(jsonString)
                const brandFromParams = req.params.brand   
                const brandTitle = brandFromParams.charAt(0).toUpperCase() + brandFromParams.slice(1)
    
                const brandsInfo = []
    
                jsonToObject.map(branch => branch.autos.map(brand => brandsInfo.push({branch: brand.marca, photo: brand.photoUrl, model: brand.modelo, year: brand.anio})))
    
                const carsFilteredBySelectedBranch = brandsInfo.filter(brand => brand.branch === brandFromParams)
    
                const uniqueCars = []
    
                 carsFilteredBySelectedBranch.filter(car => {if (!uniqueCars.some(car2 => car2.model == car.model && car2.year == car.year)) {uniqueCars.push(car)}})

                 if(uniqueCars.length === 0) throw new Error('Please, insert a new brand and try again')
                 res.render('selectedBrand', {title: brandTitle, data: uniqueCars})
            } catch (error) {
                res.render('errors', {title: 'Error 3', error: 'The model of car requested was not found', detailedError: error.message})
            }
        })
    }
}

module.exports = brandsControllers