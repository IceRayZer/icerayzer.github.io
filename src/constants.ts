import { Data } from './models.js';

export const data = (await import('./assets/data.json')).default as Data