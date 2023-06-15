const fs = require('fs')
const path = require('path')
const indexControllers = {
    indexHome: function(req, res, next) {
        fs.readFile(path.resolve(__dirname, '../data/data.json'), 'utf-8', (err,jsonString) => {
            try {
                const dataToObject = JSON.parse(jsonString)
                res.render('home', {title: 'Home', data: dataToObject})
            } catch (error) {
                res.render('errors', {title: 'Error 1', error: 'Data not found',detailedError: error.message})
            }  
        })
    }
}

module.exports = indexControllers