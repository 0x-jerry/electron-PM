const sqlite3 = require('better-sqlite3')

function DataBase() {
  db = new sqlite3('electronPM.db')
  db.exec(`CREATE TABLE IF NOT EXISTS tags(
    id integer primary key autoincrement,
    text varchar(20),
    color varchar(20)
  )`)

  db.exec(`CREATE TABLE IF NOT EXISTS images(
    id integer primary key autoincrement,
    path varchar(255)
  )`)

  db.exec(`CREATE TABLE IF NOT EXISTS image_tag(
    id integer primary key autoincrement,
    image_id integer references images (id),
    tag_id integer references tags (id) 
  )`)

  this.getAllTags = db.prepare('SELECT * FROM tags')

  /**
   * @param {string} text
   * @param {string} color 
   */
  this.insertTag = db.prepare(`INSERT INTO tags(text, color) VALUES (@text, @color)`)

  this.getAllImages = db.prepare(`SELECT * FROM images`)

  /**
   * @param {string} path
   */
  this.insertImage = db.prepare(`INSERT INTO images(path) VALUES (@path)`)

  this.close = db.close
}

module.exports = new DataBase()