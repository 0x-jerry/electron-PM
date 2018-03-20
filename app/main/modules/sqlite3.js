const Sqlite3 = require('better-sqlite3')

/**
 *
 * @param {string} name
 * @returns
 */
function Sqlite(name) {
  if (!name && process.env.NODE_ENV === 'development') return console.error('database must have a name')

  if (typeof Sqlite.instance === 'object' && Sqlite.instance._db.name === name) return Sqlite.instance

  const db = new Sqlite3(name)

  this.prepare = db.prepare
  this.exec = db.exec
  this.close = db.close

  const begin = db.prepare('BEGIN');
  const commit = db.prepare('COMMIT');
  const rollback = db.prepare('ROLLBACK');

  this.addPrepare = (tableName, data) => {
    const keys = Object.keys(data)
    const str = keys.map(key => `@${key}`).join(',')

    return db.prepare(`
      INSERT INTO ${tableName}(${keys.join(',')})
      VALUES(${str})
    `)
  }

  this.add = (tableName, data) => {
    this.addPrepare(tableName, data).run(data)
    // const keys = Object.keys(data)
    // const str = keys.map(key => `@${key}`).join(' ')

    // db.prepare(`
    //   INSERT INTO ${tableName}(${keys.join(',')})
    //   VALUES(${str})
    // `).run(data)
  }

  /**
   * @return {Function}
   */
  this.transaction = func => (...args) => {
    begin.run()
    try {
      func(...args)
      commit.run()
    } catch (error) {
      console.log(error)
    } finally {
      if (db.inTransaction) rollback.run()
    }
  }
}

const sqlite = new Sqlite('test.db')
const statu = sqlite.addPrepare('testTable', {
  num: 1,
  text: 'string',
})

console.log(statu.source)

module.exports = Sqlite
