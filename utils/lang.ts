import { useI18n } from 'vue-i18n'

export interface ILocales {
  [key: string]: {
    name: string
    iso: string
    flag: string
  }
}

export const availableLocales: ILocales = {
  en: {
    name: 'English',
    iso: 'en',
    flag: '🇺🇸',
  },
  id: {
    name: 'Bahasa',
    iso: 'id',
    flag: '🇮🇩',
  },
  ja: {
    name: '日本語',
    iso: 'ja',
    flag: '🇯🇵',
  },
}

export function LanguageManager() {
  // composable
  const { locale } = useI18n()
  const localeUserSetting = useLocalStorage('locale', 'en')

  // methods
  const getSystemLocale = (): string =>
    window ? window.navigator.language.substring(0, 2) : 'en'
  const getUserLocale = (): string =>
    localeUserSetting.value || getSystemLocale()

  // state
  const localeSetting = useState<string>('locale.setting', () =>
    process.client ? getUserLocale() : 'en'
  )

  // watchers
  watch(localeSetting, (localeSetting) => {
    localeUserSetting.value = localeSetting
    locale.value = localeSetting
  })

  // init locale
  const init = () => {
    localeSetting.value = getUserLocale()
  }

  // lifecycle
  onBeforeMount(() => init())

  return {
    localeSetting,
    init,
  }
}
