const assert = require('assert')
const db = require('../app/main/db.js')('electronTest.db')
const db1 = require('../app/main/db.js')('electronTest.db')

describe('database test', () => {
  it('should return true when instance two object', () => {
    assert.equal(db, db1)
  });

  describe('actioin test', () => {
    beforeEach(() => {
      db._db.prepare('DELETE FROM image_tag').run()
      db._db.prepare('DELETE FROM tags').run()
      db._db.prepare('DELETE FROM images').run()
      db.insertImage('hello')
      db.insertTag('ok')
      db.insertImageTag('hello', 'ok')
    });

    it('should return ok when give ok', () => {
      const tag = db.getTag('ok')
      assert.equal(tag.text, 'ok')
    });

    it('should return helo when given hello', () => {
      const image = db.getImage('hello')
      assert.equal(image.path, 'hello')
    });

    it('should return a row when given hello, ok', () => {
      const imageTag = db.getImageTag('hello', 'ok')
      assert.equal(imageTag.image.path, 'hello')
      assert.equal(imageTag.tag.text, 'ok')
    })
  })
})
