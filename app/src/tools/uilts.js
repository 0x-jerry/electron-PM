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

export {
  notify
}