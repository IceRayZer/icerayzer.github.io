<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import ProjectList from "../../components/ProjectList.vue";
import { data } from "../../constants";
import { useProjectsStore } from "../../store";

const route = useRoute();
const router = useRouter();

if (!data.types.includes(route.params.type as string)) {
  router.replace("/404");
}

const store = useProjectsStore();
const projects = computed(() =>
  store.filteredProjects.filter((p) => p.type === route.params.type)
);

const { t } = useI18n();
const pageTitle = computed(
  () => `${t("type." + route.params.type)} - IceRayZer Portfolio`
);

useHead({
  title: pageTitle,
});
</script>

<template>
  <main>
    <Sidebar />
    <ProjectList :projects="projects" :type="String($route.params.type)" />
  </main>
</template>

<style scoped lang="less">
main {
  height: 100%;
  position: relative;
  overflow-y: auto;
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
