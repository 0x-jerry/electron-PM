import { ipcRenderer } from 'electron'

/**
 * 
 * @param {string} text 
 * @param {function} click
 * @param {function} close
 */
function notify(text, click, close) {
  let notification = new Notification($('title').text(), {
    body: text,
    icon: './assets/logo.png'
  })

  notification.onclick = () => {
    click && click()
  }

  notification.onclose = () => {
    close && click()
  }
}

function contextmenu() {
  ipcRenderer.send('context-menu', {})

  let $bg = $(`<div style='position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;'> </div>`)
  $bg.one('click', () => $bg.remove())
  $('body').append($bg)
}

export {
  notify,
  contextmenu
}