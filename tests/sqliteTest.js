require('chai').should()
const Sqlite = require('../app/main/modules/sqlite3.js')

describe('sqlite test', () => {
  describe('add function test', () => {
    const sqltie = new Sqlite('test.db')

    it('should return sqlite string', () => {
      const state = sqltie.addPrepare('test', {
        num: 1,
        str: 'hello',
      })

      console.log(state.source);
    })
  })
})
