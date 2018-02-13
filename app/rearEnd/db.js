let Database = require('better-sqlite3')

let db = new Database('electronPM.db')

db.close()

console.log(db)

