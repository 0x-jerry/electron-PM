const sqlite = require('./sqlite3')
const { tableNames } = require('../database.config.js')

/**
 * image
 *
 * @typedef {Object} Image
 * @property {number} id
 * @property {string} path
 */
const TABLE_NAME = tableNames.images

function createTable() {
  sqlite.exec(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
    id integer primary key autoincrement,
    path varchar(255) unique
  )`)
}

/**
 *
 * @param {string | number} identity
 * @returns {Image}
 */
function get(identity) {
  const selector = typeof identity === 'number' ? { id: identity } : { path: identity }

  return sqlite.selectOne(TABLE_NAME, selector)
}

/**
 * @returns {Array.<Image>}
 */
function getAll() {
  return sqlite.selectMultiple(TABLE_NAME)
}

/**
 *
 * @param {string} path
 */
function create(path) {
  sqlite.create(TABLE_NAME, { path })
}

/**
 *
 * @param {string} path
 */
function destory(path) {
  sqlite.delete(TABLE_NAME, { path })
}

module.exports = {
  get,
  getAll,
  create,
  destory,
  createTable,
}
