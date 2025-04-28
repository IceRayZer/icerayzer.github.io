import type { Data } from './models.js';

export let data = (await import('./assets/data.json')).default as Data;
