const Sqlite = require('./sqlite3')
const config = require('../database.config.js')

/**
 * tag
 *
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} text
 * @property {string} color
 */
function Tags() {
  const sqlite = new Sqlite(config.name)
  const TABLE_NAME = 'tags'

  this.createTable = () => {
    sqlite.exec(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
      id integer primary key autoincrement,
      text varchar(20) unique,
      color varchar(20)
    )`)
  }

  /**
   *
   * @param {string} text
   * @param {string} color
   */
  this.create = (text, color = '#fff') => {
    sqlite.create(TABLE_NAME, { text, color })
  }

  /**
   *
   * @param {string} text
   * @param {boolean} force
   */
  this.delete = (text, force = false) => {
    if (!force) sqlite.delete(TABLE_NAME, { text })
  }

  /**
   * @returns {Array.<Tag>}
   */
  this.getAll = () => sqlite.selectAll(TABLE_NAME)
}

module.exports = Tags
