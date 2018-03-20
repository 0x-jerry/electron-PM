const { join } = require('path')
const { getPath } = require('electron').app

module.exports = {
  database: {
    name: join(getPath('userData'), 'sqlite.db'),
  },
}
