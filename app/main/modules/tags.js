const sqlite = require('./sqlite3')
const { tableNames } = require('../database.config.js')

/**
 * tag
 *
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} text
 * @property {string} color
 */
const TABLE_NAME = tableNames.tags

function createTable() {
  sqlite.exec(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
    id integer primary key autoincrement,
    text varchar(20) unique,
    color varchar(20)
  )`)
}

/**
 *
 * @param {string | number} identity
 * @returns {Tag}
 */
function get(identity) {
  const selector = typeof identity === 'number' ? { id: identity } : { text: identity }

  return sqlite.selectOne(TABLE_NAME, selector)
}

/**
 * TODO
 * 重构此函数
 *
 * @param {number | string} imageIdentify
 * @returns {Array.<Tag>}
 */
function getsByImage(imageIdentity) {
  const condition = typeof imageIdentity === 'number' ? 'images.id' : 'images.path'
  const sql = sqlite.prepare(`
    SELECT tags.* FROM tags
      JOIN images, image_tags
      ON tags.id=image_tags.tag_id AND images.id=image_tags.image_id
      WHERE ${condition}=@imageIdentify
  `)

  return sql.all({ imageIdentity })
}

/**
 * @returns {Array.<Tag>}
 */
function getAll() {
  return sqlite.selectMultiple(TABLE_NAME)
}

/**
 *
 * @param {string} text
 * @param {string} color
 */
function create(text, color = '#fff') {
  sqlite.create(TABLE_NAME, { text, color })
}

/**
 *
 * @param {string} text
 * @param {boolean} force
 */
function destroy(text, force = false) {
  const tag = get(text)

  if (force) sqlite.delete(tableNames.imageTags, { tagId: tag.id })
  sqlite.delete(TABLE_NAME, tag)
}

module.exports = {
  get,
  getAll,
  create,
  destroy,
  getsByImage,
  createTable,
}
