import { onBeforeUnmount, onMounted } from 'vue';
import { data } from './constants.js';
import { type Engine, type Engines, type Project } from './models.js';
import { useRoute, useRouter } from 'vue-router';

export function mapToProject(project: Project): Project {
  return {
    id: project.id,
    lang: project.lang,
    name: project.name,
    engine: project.engine,
    type: project.type,
    tags: project.tags,
    thumbnail: project.thumbnail,
    summary: project.summary,
  };
}

export function toEngineList(engines: Engines): Engine[] {
  return Object.keys(engines ?? {}).map((id) => ({
    id,
    name: engines[id],
  }));
}

export function getEngineName(engine: string) {
  return [...toEngineList(data.engines), ...toEngineList(data['others-engines'])].find((e) => e.id === engine)?.name;
}

export function getEngineLogo(engine: string) {
  return new URL(`./assets/engines/${engine}.png`, import.meta.url).toString();
}

export function getSocialMediaLogo(socialMedia: string) {
  return new URL(`./assets/social-medias/${socialMedia}.png`, import.meta.url).toString();
}

export function getProjectThumbnail(project: Project) {
  let src = new URL(
    `./assets/projects/${project.lang}/${project.type}/${project.id}/${project.thumbnail}`,
    import.meta.url
  ).toString();
  try {
    src = new URL(project.thumbnail ?? '').toString();
  } catch {}

  return src;
}

export function getProjectId(path: string): string {
  return path.match(/([^\/.]+)\.[^.]+$/)?.[1] ?? path;
}

export async function loadArticle(project: Project) {
  const res = await fetch(`/articles/${project.lang}/${project.type}/${project.id}.txt`);
  if (res.headers.get('Content-Type') !== 'text/plain') return undefined;
  return await res?.text();
}

export function useResizeWindow(cb: () => void) {
  let cbb = () => cb();
  onMounted(() => {
    addEventListener('resize', cbb);
    cb();
  });
  onBeforeUnmount(() => {
    removeEventListener('resize', cbb);
  });
}

export function useEditorShortcut(cb: () => void) {
  const route = useRoute();

  function onKeydown(e: KeyboardEvent) {
    if (e.altKey && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
      if (!route.path.endsWith('/editor')) {
        cb();
      }
    }
  }

  onMounted(() => {
    addEventListener('keydown', onKeydown);
  });

  onBeforeUnmount(() => {
    removeEventListener('keydown', onKeydown);
  });
}
