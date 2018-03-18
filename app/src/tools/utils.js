import { ipcRenderer } from 'electron'

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

function contextmenu() {
  ipcRenderer.send('context-menu', {})

  const $bg = $('<div style=\'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;\'> </div>')
  $bg.one('click', () => $bg.remove())
  $('body').append($bg)
}

export {
  notify,
  contextmenu,
}
