<script setup lang="ts">
import { Project, ProjectType } from "../models";
import ProjectCard from "./ProjectCard.vue";

interface ProjectListProps {
  projects: Project[];
  type: ProjectType;
}

defineProps<ProjectListProps>();
</script>

<template>
  <div class="project-list">
    <ProjectCard
      v-for="project in projects"
      :key="project.name"
      :project="project"
      :type="$props.type"
    />
  </div>
</template>

<style scoped lang="less">
.project-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 64px;
  padding: 64px;
  margin-left: 96px;
}
</style>
