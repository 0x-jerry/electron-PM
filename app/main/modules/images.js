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
 * TODO
 * 重构此函数
 *
 * @param {string | number} tagIdentity
 * @returns {Array.<Image>}
 */
function getsByTag(tagIdentity) {
  const condition = typeof tagIdentity === 'number' ? 'tags.id' : 'tags.text'
  const sql = sqlite.prepare(`
    SELECT images.* FROM images
      JOIN tags, image_tags
      ON tags.id=image_tags.tag_id AND images.id=image_tags.image_id
      WHERE ${condition}=@tagIdentity
  `)

  return sql.all({ tagIdentity })
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

/**
 *
 * @param {string} path
 */
function destroyLike(path) {
  sqlite.deleteLike(TABLE_NAME, { path })
}

module.exports = {
  get,
  getAll,
  create,
  destory,
  destroyLike,
  getsByTag,
  createTable,
}
