import { ipcRenderer, clipboard } from 'electron';

/**
 *
 * @param {string} text
 * @param {function} click
 * @param {function} close
 */
function notify(text, click, close) {
  const notification = new Notification($('title').text(), {
    body: text,
    icon: './assets/logo.png',
  })

  notification.onclick = () => {
    if (click) click()
  }

  notification.onclose = () => {
    if (close) close()
  }
}

/**
 *
 * @param {string} path
 * @return {string}
 */
function getFileSize(path) {
  const size = ipcRenderer.sendSync('get-file-size-sync', { path })
  const kb = (size / 1000.0)
  const mb = (kb / 1000.0)

  return kb < 1000 ? `${kb.toFixed(2)}KB` : `${mb.toFixed(2)}MB`
}

function copyToClipboard(str) {
  clipboard.writeText(str)
}

export default {
  notify,
  getFileSize,
  copyToClipboard,
}
