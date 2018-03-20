const Sqlite = require('./sqlite3')
const config = require('../database.config.js')

/**
 * image
 *
 * @typedef {Object} Image
 * @property {number} id
 * @property {string} path
 */
function Images() {
  const sqlite = new Sqlite(config.name)
  const TABLE_NAME = 'images'

  this.createTable = () => {
    sqlite.exec(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
      id integer primary key autoincrement,
      path varchar(255) unique
    )`)
  }

  /**
   *
   * @param {string} path
   */
  this.create = (path) => {
    sqlite.create(TABLE_NAME, { path })
  }

  /**
   *
   * @param {string} path
   */
  this.delete = (path) => {
    sqlite.delete(TABLE_NAME, { path })
  }
}

module.exports = Images
