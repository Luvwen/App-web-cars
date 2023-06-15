const fs = require('fs')
const path = require('path')

const branchesControllers = {
    branchesList: function(req, res, next) {
        fs.readFile(path.resolve(__dirname, '../data/data.json'), "utf-8",(err, jsonString) => {
          try {
            const dataFromJson = JSON.parse(jsonString)
            if(dataFromJson.length === 0) throw new Error('We dont have any locals, try again in 2 years')
            res.render('branches', {title: 'Branches', data: dataFromJson})
          } catch (error) {
            res.render('errors', {title: 'Error 7', error: 'Locals not found', detailedError: error.message})
          }

        })
      },
      selectedBranch: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../data/data.json'), 'utf-8', (err, jsonString) => {
          try {
            const dataFromJson = JSON.parse(jsonString)
            const titleFromParams = req.params.branch.charAt(0).toUpperCase() + req.params.branch.slice(1)
            
            const filteredBranches = []

            dataFromJson.filter(locals => locals.sucursal.toLowerCase() === titleFromParams.toLowerCase() && filteredBranches.push(locals))
            
            if(filteredBranches.length === 0) throw new Error(`The requested local ${titleFromParams} is inexistent, please try again with other name`)
            console.log(filteredBranches[0].autos.length)
            res.render('selectedBranch', {title: titleFromParams, data: filteredBranches})
          } catch (error) {
            res.render('errors', {title: 'Error 8', error: 'Local not found', detailedError: error.message})
          }
        })
      }
}


module.exports = branchesControllers 