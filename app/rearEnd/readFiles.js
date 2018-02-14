const fs = require('fs')
const path = require('path')

function readFiles(filePath) {
  let images = []

  let files = fs.readdirSync(filePath)

  files.forEach(file => {
    let stats = fs.statSync(path.join(filePath, file))

    if (stats.isFile() && file.match(/\.(png|jpg|gif)$/)) {
      images.push(path.join(filePath, file))
    }
  })

  return images
}


module.exports = {
  readFiles: readFiles
}
