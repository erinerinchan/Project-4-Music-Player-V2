function getLocale() {
  const { language } = navigator
  return language && language.length === 2 ? language.split('-') : ['en', 'CA']
}

export default getLocale
