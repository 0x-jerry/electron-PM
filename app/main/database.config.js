const { join } = require('path')
const { app } = require('electron')

module.exports = {
  path: join(app.getPath('userData'), 'sqlite.db'),
  tableNames: {
    tags: 'tags',
    images: 'images',
    imageTags: 'image_tags',
  },
  tags: {
    id: 'id',
    text: 'text',
    color: 'color',
  },
  images: {
    id: 'id',
    path: 'path',
  },
  imageTags: {
    id: 'id',
    tagId: 'tag_id',
    imageId: 'image_id',
  },
}
