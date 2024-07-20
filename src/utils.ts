import { data } from "./constants.js";
import { Project } from "./models.js";

export function getProjetId(name: string): string {
  return name.toLowerCase().replaceAll(" ", "-");
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

export function getEngineName(engine: string) {
  return [...data.engines, ...data["others-engines"]].find((e) => e.id === engine)?.name;
}

export function getEngineLogo(engine: string) {
  return new URL(`./assets/engines/${engine}.png`, import.meta.url).toString();
}

export function getSocialMediaLogo(socialMedia: string) {
  return new URL(`./assets/social-medias/${socialMedia}.png`, import.meta.url).toString();
}

export function getThumbail(thumbnail: string) {
  let src = new URL(
    `./assets/projects/${thumbnail}`,
    import.meta.url
  ).toString();
  try {
    src = new URL(thumbnail).toString();
  } catch {}

  return src;
}

export const defaultLocale = navigator.language.split('-')[0]