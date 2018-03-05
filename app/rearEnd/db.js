const sqlite3 = require('better-sqlite3')

function DataBase(name = 'electronPM.db') {
  if (typeof DataBase.instance === 'object' && DataBase.instance._db.name === name) return DataBase.instance

  let db = new sqlite3(name)
  this._db = db

  db.exec(`CREATE TABLE IF NOT EXISTS tags(
    id integer primary key autoincrement,
    text varchar(20) unique,
    color varchar(20)
  )`)

  db.exec(`CREATE TABLE IF NOT EXISTS images(
    id integer primary key autoincrement,
    path varchar(255) unique
  )`)

  db.exec(`CREATE TABLE IF NOT EXISTS image_tag(
    id integer primary key autoincrement,
    image_id integer references images (id),
    tag_id integer references tags (id) 
  )`)

  this.getAllTags = () => db.prepare('SELECT * FROM tags').all()
  this.getAllImages = () => db.prepare(`SELECT * FROM images`).all()

  /**
   * @param {string} path
   */
  this.insertImage = (path) => db.prepare(`INSERT INTO images(path) VALUES (@path)`).run({path: path})

  /**
   * @param {string} path
   */
  this.getImage = (path) => db.prepare(`SELECT * FROM images WHERE path=@path`).get({path: path})

  /**
   * @param {string} text
   * @param {string} color 
   */
  this.insertTag = (text, color = '#fff') => db.prepare(`INSERT INTO tags(text, color) VALUES (@text, @color)`).run({text: text, color: color})

  this.deleteTag = (text, force = false) => {
    if (force) db.prepare(`DELETE FROM image_tag WHERE tag_id=@tagId`).run({tagId: this.getTag(text).id})

    db.prepare(`DELETE FROM tags WHERE text=@text`).run({text: text})
  }

  /**
   * @param {string | number} text
   */
  this.getTag = (text) => {
    let tag = null
    if (typeof text == 'string'){
      tag = db.prepare(`SELECT * FROM tags WHERE text=@text`).get({text: text})
    } else {
      tag = db.prepare(`SELECT * FROM tags WHERE id=@id`).get({id: text})
    }
    return tag
  }

  /**
   * @param {string} imagePath
   * @param {string} tagText
   */
  this.getImageTag = (imagePath, tagText) => {
    let image = this.getImage(imagePath)
    let tag = this.getTag(tagText)
    let imageTag = db.prepare(`SELECT * FROM image_tag WHERE image_id=@imageId AND tag_id=@tagId`).get({imageId: image.id, tagId: tag.id})
    let result = {
      image: db.prepare(`SELECT * FROM images WHERE id=@id`).get({id: imageTag.image_id}),
      tag: db.prepare(`SELECT * FROM tags WHERE id=@id`).get({id: imageTag.tag_id})
    }
    return result
  }

  this.getImageTags = (imagePath) => {
    let image = this.getImage(imagePath)
    let imageTags = db.prepare(`SELECT * FROM image_tag WHERE image_id=@imageId`).all({imageId: image.id})
    if (!imageTags) return null

    return imageTags.map(imageTag => this.getTag(+imageTag.tag_id))
  }

  this.insertImageTag = (imagePath, tagText) => {
    let image = this.getImage(imagePath)
    let tag = this.getTag(tagText)
    return db.prepare(`INSERT INTO image_tag(image_id, tag_id) VALUES (@imageId, @tagId)`).run({imageId: image.id, tagId:tag.id})
  }

  this.close = () => db.close()

  DataBase.instance = this
}

module.exports = (name) => new DataBase(name)