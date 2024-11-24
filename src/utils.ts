import { data } from "./constants.js";
import { type Engine, type Engines, type Project } from "./models.js";

export function getProjetId(name: string): string {
  return name.toLowerCase().replace(/'|`|\/|:/g, "").replace(/ +/g, "_");
}

export function mapToProject(project: Project): Project {
  return {
    name: project.name,
    engine: project.engine,
    type: project.type,
    tags: project.tags,
    thumbnail: project.thumbnail,
    summary: project.summary,
    article: project.article,
  }
}

export function toEngineList(engines: Engines): Engine[] {
  return Object.keys(engines ?? {}).map((id) => ({
    id,
    name: engines[id]
  }))
}

export function getEngineName(engine: string) {
  return [...toEngineList(data.engines), ...toEngineList(data["others-engines"])].find((e) => e.id === engine)?.name;
}

export function getEngineLogo(engine: string) {
  return new URL(`./assets/engines/${engine}.png`, import.meta.url).toString();
}

export function getSocialMediaLogo(socialMedia: string) {
  return new URL(`./assets/social-medias/${socialMedia}.png`, import.meta.url).toString();
}

export function getProjectThumbnail(project: Project) {
  let src = new URL(
    `./assets/projects/${project.type}/${getProjetId(project.name)}/${project.thumbnail}`,
    import.meta.url
  ).toString();
  try {
    src = new URL(project.thumbnail ?? '').toString();
  } catch {}

  return src;
}

export const defaultLocale = navigator.language.split('-')[0]