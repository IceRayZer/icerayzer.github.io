import { createPinia } from 'pinia';
import { ViteSSG } from 'vite-ssg';
import { createI18n } from 'vue-i18n';
import routes from '~pages';
import App from './App.vue';
import { Project } from './models.js';
import { useProjectsStore } from './store.js';
import { defaultLocale, mapToProject } from './utils.js';

export const createApp = ViteSSG(App, {
  base: import.meta.env.BASE_URL,
  routes,
}, async ({ app, router, initialState, isClient }) => {
  // Store
  const pinia = createPinia()
  app.use(pinia)
  // Internationalization
  const languages = await loadLanguages()
  const i18n = createI18n({
    locale: languages[defaultLocale] == null ? 'en' : defaultLocale,
    messages: { ...languages },
    legacy: false
  })
  app.use(i18n)

  if (import.meta.env.SSR) initialState.pinia = pinia.state.value
  else pinia.state.value = initialState.pinia || {}

  // Data initialization
  router.beforeEach(async (to, from, next) => {
    const store = useProjectsStore(pinia)
    if (store.projects.length <= 0) {
      store.setProjects(await loadProjects())
    }
    next()
  })
})

async function loadProjects (): Promise<Project[]> {
  const projects = await Promise.all(Object.values(import.meta.glob('./assets/projects/*.json')).map(p => p())) as Project[]
  return projects.map(mapToProject)
}

async function loadLanguages (): Promise<Record<string, Record<string, string>>> {
  const languagesImports = await import.meta.glob('./assets/locales/*.json')
  const languagesKeys = Object.keys(languagesImports)
  const languages: Record<string, Record<string, string>> = {}
  for (const langKey of languagesKeys) {
    const lang = langKey.match(/([^/]+)\.json$/)?.[1] ?? ''
    languages[lang] = ((await languagesImports[langKey]()) as {default: Record<string, string>}).default
  }
  return languages;
}