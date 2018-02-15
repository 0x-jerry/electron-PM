let assert = require('assert')
let db = require('../app/rearEnd/db.js')
let db1 = require('../app/rearEnd/db.js')

describe('db test', () => {
  it('should return true when instance two object', () => {
    assert.equal(true, db === db1)
  })
})

