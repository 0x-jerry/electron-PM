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

export {
  notify,
}
