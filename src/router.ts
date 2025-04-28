import { createRouter, createWebHistory } from 'vue-router';
import { data } from './constants.js';
import { useProjectsStore } from './store.js';
import type { Project } from './models.js';
import { getProjectId, mapToProject } from './utils.js';
import type { Pinia } from 'pinia';

export default async function (pinia: Pinia) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/' + (data.types[0] ?? '') },
      { path: '/about-me', component: () => import('./pages/About-me.vue') },
      { path: '/social-medias', component: () => import('./pages/Social-medias.vue') },
      { path: '/editor', component: () => import('./pages/Editor.vue') },
      {
        path: '/:type',
        children: [
          { path: '', component: () => import('./pages/ProjectsType.vue'), props: true },
          {
            path: ':id',
            children: [
              { path: '', component: () => import('./pages/Project.vue'), props: true },
              { path: 'editor', component: () => import('./pages/Editor.vue'), props: true },
            ],
          },
        ],
      },
      { path: '/:pathMatch(.*)*', component: () => import('./components/NotFound.vue') },
    ],
  });

  const projectsModules = import.meta.glob('./assets/projects/**/*.json');
  const projects: Project[] = [];
  for (const projectPath of Object.keys(projectsModules)) {
    const projectData = (await projectsModules[projectPath]()) as Project;
    const project = mapToProject(projectData);
    project.id = getProjectId(projectPath);
    project.lang = projectPath.match(/assets\/projects\/([^\/]*)\//)?.[1] ?? '';
    projects.push(project);
  }
  const store = useProjectsStore(pinia);
  store.setProjects(projects);

  return router;
}
