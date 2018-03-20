const Sqlite = require('./sqlite3')
const { database } = require('../database.config.js')

/**
 * tag
 *
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} text
 * @property {string} color
 */
function Tags() {
  const sqlite = new Sqlite(database.name)

  this.createTable = () => {
    sqlite.exec(`CREATE TABLE IF NOT EXISTS tags(
      id integer primary key autoincrement,
      text varchar(20) unique,
      color varchar(20)
    )`)
  }

  /**
   *
   * @param {string} text
   * @param {string} color
   * @returns {Tag}
   */
  this.create = (text, color = '#fff') => sqlite.prepare('INSERT INTO tags(text, color) VALUES (@text, @color)').run({ text, color })

  this.all = () => sqlite.prepare('SELECT * FROM tags').all()
}

module.exports = Tags
