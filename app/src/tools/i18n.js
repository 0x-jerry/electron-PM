import { remote } from 'electron'
import setting from 'electron-settings'
import zhCN from '../languages/zh_CN'
import en from '../languages/en'

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
    en,
  }

  const key = Object.keys(i18n).find(k => k === lang)

  return i18n[key || 'zhCN']
}

export default languages(setting.get('language', getLocal()))
