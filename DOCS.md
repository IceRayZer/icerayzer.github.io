# Documentation

This document explains how to add or edit the data of the website without touching any code file.

To note, all the files manipulations should be exclusively restricted to the `src/assets` folder.

## Data definitions

- [Language](#Languages): languages codes (fr, en...)
- [Type](#Types): projects types (games, level-design...)
- [Engines](#Engines): games engines (unity, unreal-engine...)
- [Tags](#Tags): projects custom tags (solo-project, gamejam...)
- [About me](<#About me>): about me page content
- [Social medias](<#Social medias>): your social medias

Data are declared in `src/assets/data.json`.

### Languages

To add a language, there are 3 steps:

1. Duplicate `src/assets/locales/en.json` and rename it to `<CODE>.json`.
2. Translate the values in the language.
3. Go to [SVG Repo](https://www.svgrepo.com/vectors/flag/multicolor/), export the language flag as SVG then rename it and move it to `src/assets/locales/<CODE>.json`.

### Types

Types of projects appear in the navbar as categories of projects.

### Engines

To add a game engine, there are 2 steps:

1. Add an entry in the array `engines` for a main game engine, or `othes-engines` for secondary game engines, from the `data.json` with:
   - id: the name of the game engine, in lowercase and hyphens [-] instead of spaces [ ]
   - name: the name of the game engine
2. Download the game engine logo, in white transparent as PNG and of resolution 128x128, and put it in `src/assets/engines/<GAME_ENGINE_ID>.png`.

Games engines are located in the sidebar for projects list to filter projects.

### Tags

Tags help describing and sorting projects.

### About me

To edit the "about me" page, go to the [editor](<#Project editor>) and use only the text editor. Then export the data, open it and copy the content of `article`. Finally paste that content into `about-me` in the `data.json`.

### Social medias

To add a social media, there are 2 steps:

1. Add an entry in the array `socials-medias` from the `data.json` with:
   - id: the name of the social network, in lowercase and hyphens [-] instead of spaces [ ]
   - name: the name of the social network
   - url: your social media url
2. Download the social media logo, as PNG, and put it in `src/assets/social-medias/<SOCIAL_MEDIA_ID>.png`.
3. (Optional) You can add a short description for a social network, by adding a key `social-medias.<SOCIAL_MEDIA_ID>` in the translations files.

## Project

Projects are located in `src/assets/projects/`.

A project contains:

- name: the name or title of the project
- type: the [type](#Types) of the project [project card only]
- engine: the [engine](#Engines) used for the project [project card only]
- tags: some [tags](#Tags) to describe the project [project card only]
- thumbnail: a thumbnail for the project [project card only]
- summary: a short description of the project [project card only]
- article: an [article](#Article) for the project [article only]

### Project editor

Go to `https://<USERNAME>.github.io/editor` to access the projects editor.

There is a project card preview, at the top of the form, to help visualize how it will look in projects list.

There are 3 buttons at the bottom right:

- Preview / Edit: switch between preview mode and edit mode of the project form
- Import: import a previous [project data](#Project) to edit it
- Export: export the current editing [project data](#Project)

## Article

An article is a specific page for a project to explain anything related to the project.
