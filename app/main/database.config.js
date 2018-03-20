const { join } = require('path')
const { getPath } = require('electron').app

module.exports = {
  name: join(getPath('userData'), 'sqlite.db'),
}
