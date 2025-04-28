<script setup lang="ts">
import type { Project, ProjectType } from '../models';
import ProjectCard from './ProjectCard.vue';

interface ProjectListProps {
  projects: Project[];
  type: ProjectType;
}

defineProps<ProjectListProps>();
</script>

<template>
  <div class="project-list" :class="{ empty: projects.length <= 0 }">
    <ProjectCard v-for="project in projects" :key="project.name" :project="project" :type="$props.type" />
  </div>
</template>

<style scoped lang="less">
.project-list {
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: min-content;
  justify-content: space-around;
  gap: 64px;
  padding: 48px;
  margin-bottom: 96px;
}

@media only screen and (max-width: 2560px) {
  .project-list {
    grid-template-columns: repeat(4, 1fr);
    gap: 48px;
    padding: 32px;
  }
}

@media only screen and (max-width: 1920px) {
  .project-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (max-width: 1280px) {
  .project-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    padding: 24px;
  }
}

@media only screen and (max-width: 960px) {
  .project-list {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px;
  }
}
</style>
