const Sqlite3 = require('better-sqlite3')
const utils = require('./utils.js')

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

  /**
   *
   * @param {string} tableName
   * @param {JSON} data
   */
  this.create = (tableName, data) => {
    const execStr = utils.composeInsertExecString(tableName, Object.keys(data))
    return db.prepare(execStr).run(data)
  }

  /**
   *
   * @param {string} tableName
   * @param {JSON} condition
   */
  this.delete = (tableName, condition) => {
    const execStr = utils.composeDeleteExecString(tableName, Object.keys(condition))
    return db.prepare(execStr).run(condition)
  }

  /**
   *
   * @param {string} tableName
   */
  this.selectAll = (tableName) => {
    return db.prepare(`SELECT * FROM ${tableName}`).all()
  }

  const begin = db.prepare('BEGIN');
  const commit = db.prepare('COMMIT');
  const rollback = db.prepare('ROLLBACK');

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

module.exports = Sqlite
