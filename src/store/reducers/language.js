import FA from '../../utils/languages/fa.json'
import EN from '../../utils/languages/en.json'
import AR from '../../utils/languages/ar.json'

const getLanguage = function (lang) {
  switch (lang) {
    case 'fa':
      return FA;
    case 'ar':
      return AR;
    default:
      return EN;
  }
}

const language = (state = FA, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return getLanguage(action.lang)
    default:
      return state
  }
}

export default language