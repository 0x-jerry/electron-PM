const { join } = require('path')
const { app } = require('electron')

module.exports = {
  name: join(app.getPath('userData'), 'sqlite.db'),
}
