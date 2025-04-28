export declare interface Data {
  'languages': string[];
  'types': string[];
  'engines': Engines;
  'others-engines': Engines;
  'tags': string[];
  'social-medias': SocialMedia[];
}

export declare type ProjectType = string;

export declare interface TypeRoute {
  type: ProjectType;
}

export declare interface Project {
  id: string;
  lang: string;
  name: string;
  engine: string;
  type: ProjectType;
  tags?: string[];
  thumbnail?: string;
  summary?: string;
  article?: string;
}

export declare type Engines = Record<string, string>;

export declare interface Engine {
  id: string;
  name: string;
}

export declare interface SocialMedia {
  id: string;
  name: string;
  url: string;
}

export declare type ArticleMode = 'read' | 'edit' | 'preview';
