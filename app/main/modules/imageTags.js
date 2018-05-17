const sqlite = require('./sqlite3')
const Images = require('./images.js')
const Tags = require('./tags.js')
const { tableNames } = require('../database.config.js')

/**
 * imageTag
 * @typedef {Object} ImageTag
 * @property {number} id
 * @property {number} tagId
 * @property {number} imageId
 */
const TABLE_NAME = tableNames.imageTags

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

  return image ? sqlite.selectMultiple(TABLE_NAME, {
    imageId: image.id,
  }) : []
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

/**
 *
 * @param {number} id
 */
function destroyById(id) {
  sqlite.delete(TABLE_NAME, { id })
}

/**
 * TODO 重构代码
 * @param {string} path
 */
function destroyByPathLike(path) {
  sqlite.exec(`
  DELETE FROM image_tags
    WHERE id IN (
      SELECT image_tags.id FROM image_tags
        JOIN tags, images
        ON tags.id=image_tags.tag_id AND images.id=image_tags.image_id
        WHERE images.path LIKE '${path}%'
    )
  `)
}

module.exports = {
  get,
  create,
  destroy,
  getsByTag,
  getsByImage,
  createTable,
  destroyById,
  destroyByPathLike,
}
