import 'react-i18next'
import es from './es.json'

declare module 'react-i18next' {
  // eslint-disable-next-line no-unused-vars
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: typeof es
  }
}
