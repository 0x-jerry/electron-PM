const sqlite = require('./sqlite3')
const Images = require('./images.js')
const Tags = require('./tags.js')

/**
 * imageTag
 * @typedef {Object} ImageTag
 * @property {number} id
 * @property {number} tagId
 * @property {number} imageId
 */
const TABLE_NAME = 'image_tags'

function createTable() {
  sqlite.exec(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
    id integer primary key autoincrement,
    image_id integer references images (id),
    tag_id integer references tags (id)
  )`)
}

/**
 *
 * @param {string | number} tagIdentity
 * @param {string | number} imageIdentity
 * @returns {ImageTag}
 */
function get(tagIdentity, imageIdentity) {
  const tag = Tags.get(tagIdentity)
  const image = Images.get(imageIdentity)

  return sqlite.selectOne(TABLE_NAME, {
    tagId: tag.id,
    imageId: image.id,
  })
}

/**
 *
 * @param {string | number} tagIdentity
 * @returns {Array.<ImageTag>}
 */
function getsByTag(tagIdentity) {
  const tag = Tags.get(tagIdentity)

  return sqlite.selectMultiple(TABLE_NAME, {
    tagId: tag.id,
  })
}

/**
 *
 * @param {string | number} imageIdentity
 * @returns {Array.<ImageTag>}
 */
function getsByImage(imageIdentity) {
  const image = Images.get(imageIdentity)

  return sqlite.selectMultiple(TABLE_NAME, {
    imageId: image.id,
  })
}

/**
 *
 * @param {number | string} tagIdentity
 * @param {number | string} imageIdentity
 */
function create(tagIdentity, imageIdentity) {
  const tag = Tags.get(tagIdentity)
  const image = Images.get(imageIdentity)

  sqlite.create(TABLE_NAME, {
    tagId: tag.id,
    imageId: image.id,
  })
}

/**
 *
 * @param {number | string} tagIdentity
 * @param {number | string} imageIdentity
 */
function destroy(tagIdentity, imageIdentity) {
  const tag = Tags.get(tagIdentity)
  const image = Images.get(imageIdentity)
  sqlite.delete(TABLE_NAME, {
    tagId: tag.id,
    imageId: image.id,
  })
}

module.exports = {
  get,
  create,
  destroy,
  getsByTag,
  getsByImage,
  createTable,
}
