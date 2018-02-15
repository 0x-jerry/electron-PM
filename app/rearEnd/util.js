const fs = require('fs')

module.exports = {
  loadConfig: (configPath) => {
    if (fs.existsSync(configPath)){
      let config = JSON.parse(fs.readFileSync(configPath))

      config = Object.assign({}, {
        path: './'
      }, config)

      return config
    }
  }
}