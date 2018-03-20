const sqlite = require('./sqlite3')
const IamgeTags = require('./imageTags.js')

/**
 * tag
 *
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} text
 * @property {string} color
 */
const TABLE_NAME = 'tags'

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
 *
 * @param {number | string} imageIdentify
 * @returns {Array.<Tag>}
 */
function getsByImage(imageIdentify) {
  const imageTags = IamgeTags.getsByImage(imageIdentify)

  const tags = []

  sqlite.transaction(() => {
    imageTags.forEach((imageTag) => {
      tags.push(get(imageTag.tagId))
    })
  })()

  return tags
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
  if (!force) sqlite.delete(TABLE_NAME, { text })
}

module.exports = {
  get,
  getAll,
  create,
  destroy,
  getsByImage,
  createTable,
}
