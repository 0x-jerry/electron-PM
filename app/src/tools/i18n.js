import { remote } from 'electron'
import zhCN from '../languages/zh_CN'

function getLocal() {
  return remote.app.getLocale().split('-').join('')
}

/**
 *
 * @return {JSON}
 */
function languages(lang) {
  const i18n = {
    zhCN,
  }

  const key = Object.keys(i18n).find(k => k === lang)

  return i18n[key || 'zhCN']
}

export default languages(getLocal())
