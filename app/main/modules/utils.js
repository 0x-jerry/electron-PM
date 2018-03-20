/**
 *
 * @param {string} str
 * @returns {string}
 */
function camelCaseToUnderscore(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 *
 * @param {string} tableName
 * @param {Array.<string>} columns
 */
function composeSelectExecString(tableName, columns = null) {
  if (!columns) return `SELECT * FROM ${tableName}`

  const condition = columns.map(column => `${camelCaseToUnderscore(column)}=@${column}`).join(' AND ')

  return `
    SELECT * FROM ${tableName}
    WHERE ${condition}
  `
}

/**
 *
 * @param {string} tableName
 * @param {Array.<string>} columns
 */
function composeInsertExecString(tableName, columns) {
  const table = columns.map(column => camelCaseToUnderscore(column)).join(',')
  const value = columns.map(column => `@${column}`).join(',')

  return `
      INSERT INTO ${tableName}(${table})
      VALUES(${value})
    `
}

/**
 *
 * @param {string} tableName
 * @param {Array.<string>} columns
 */
function composeDeleteExecString(tableName, columns) {
  const condition = columns.map(column => `${camelCaseToUnderscore(column)}=@${column}`).join(' AND ')

  return `
    DELETE FROM ${tableName}
    WHERE ${condition}
  `
}

/**
 *
 * @param {string} tableName
 * @param {Array.<string>} updateColumns
 * @param {Array.<string>} conditionColumns
 */
function composeUpdateExecString(tableName, updateColumns, conditionColumns) {
  const value = updateColumns.map(column => `${camelCaseToUnderscore(column)}=@${column}`).join(',')
  const condition = conditionColumns.map(column => `${camelCaseToUnderscore(column)}=@${column}`).join(' AND ')

  return `
    UPDATE ${tableName}
    SET ${value}
    WHERE ${condition}
  `
}

module.exports = {
  camelCaseToUnderscore,
  composeSelectExecString,
  composeInsertExecString,
  composeDeleteExecString,
  composeUpdateExecString,
}
