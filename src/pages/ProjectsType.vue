<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectList from '../components/ProjectList.vue';
import Sidebar from '../components/Sidebar.vue';
import NotFound from '../components/NotFound.vue';
import { useProjectsStore } from '../store';
import { useI18n } from 'vue-i18n';
import { loadArticle, useEditorShortcut, useResizeWindow } from '../utils';
import { data } from '../constants';

const route = useRoute();
const router = useRouter();

const compact = ref(false);

const store = useProjectsStore();
const projects = computed(() => store.filteredProjects.filter((p) => p.type === route.params.type));

const engines = computed(() => [
  ...new Set(
    store.projects
      .filter((p) => p.type === route.params.type)
      .map((p) => p.engine)
      .filter((e) => e != null)
  ),
]);

const { t } = useI18n();
const pageTitle = computed(() => `${t('type.' + route.params.type)} - IceRayZer Portfolio`);

useHead({
  title: pageTitle,
});

loadProjectsArticles();
watch(projects, () => loadProjectsArticles());

function loadProjectsArticles() {
  projects.value.forEach(async (project) => {
    if (project.article != null) return;

    project.article = await loadArticle(project);
  });
}

useResizeWindow(() => {
  compact.value = window.innerWidth <= 480;
});

useEditorShortcut(() => {
  router.push('/editor');
});
</script>

<template>
  <main :class="{ compact }">
    <NotFound v-if="!data.types.includes(route.params.type as string)" />
    <template v-else>
      <Sidebar :engines="engines" />
      <ProjectList :projects="projects" :type="String($route.params.type)" />
    </template>
  </main>
</template>

<style scoped lang="less">
main {
  height: 100%;
  position: relative;
  display: flex;
  overflow-y: auto;
}
</style>
