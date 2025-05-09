import { defineStore } from 'pinia';
import { data } from './constants.js';
import { type Project } from './models.js';
import { toEngineList } from './utils.js';
import i18n from './i18n.js';

interface ProjectsStore {
  projects: Project[];
  engine: string;
  search: string;
}

export const useProjectsStore = defineStore('projects', {
  state: (): ProjectsStore => ({
    projects: [],
    engine: 'all',
    search: '',
  }),
  actions: {
    setProjects(projects: Project[]) {
      this.projects = projects;
    },
    setEngine(engine: string) {
      this.engine = engine;
    },
    setSearch(search: string) {
      this.search = search;
    },
  },
  getters: {
    filteredProjects: (state): Project[] => {
      let projects = state.projects.filter(
        (p) => p.name.toLowerCase().includes(state.search.toLowerCase()) && p.lang === i18n.global.locale.value
      );
      if (state.engine === 'all') return projects;
      if (state.engine === 'others') {
        return projects.filter((p) => toEngineList(data['others-engines']).findIndex((e) => e.id === p.engine) > -1);
      }

      return projects.filter((p) => p.engine === state.engine);
    },
  },
});
