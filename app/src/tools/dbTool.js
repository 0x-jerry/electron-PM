import { ipcRenderer } from 'electron'

/**
 * 
 * @returns {Array<string>}
 */
function reloadImages() {
  return ipcRenderer.sendSync('reload-images-sync')
}

/**
 * 
 * @returns {Array<string>}
 */
function getAllImages() {
  return ipcRenderer.sendSync('get-all-images-sync') || []
}

/**
 * 
 * @returns {Array<{text: string, color: string}>}
 */
function getAllTags() {
  return ipcRenderer.sendSync('get-all-tags-sync') || []
}

/**
 * 
 * @param {string} path 
 * @returns {Array<{text: string, color: string}>}
 */
function getTagsByImage(path) {
  let tags = ipcRenderer.sendSync('get-image-tags-sync', {
    path: path
  }) || []

  return tags
}

/**
 * 
 * @param {string} imagePath 
 * @param {string} tagText 
 */
function addTagByImage(imagePath, tagText) {
  ipcRenderer.send('add-image-tag', {
    path: imagePath,
    tag: tagText
  })
}

/**
 * 
 * 
 * @param {string} tagText 
 * @param {boolean} [force=false] 
 * @returns {boolean}
 */
function deleteTag(tagText, force = false) {
  return ipcRenderer.sendSync('delete-tag-sync', {
    text: tagText,
    force: force
  })
}

/**
 * 
 * @param {string} text 
 * @param {string} [color='#fff'] 
 */
function addTag(text, color = '#fff') {
  ipcRenderer.sendSync('add-tag-sync', {
    text: text,
    color: color
  })
}

/**
 * 
 * @param {string} imagePath 
 * @param {string} tagText 
 */
function deleteTagByImage(imagePath, tagText) {
  ipcRenderer.send('delete-image-tag', {
    path: imagePath,
    tag: tagText
  })
}

export default{
  reloadImages,
  getTagsByImage,
  deleteTagByImage,
  addTagByImage,
  getAllTags,
  getAllImages,
  deleteTag,
  addTag,
}