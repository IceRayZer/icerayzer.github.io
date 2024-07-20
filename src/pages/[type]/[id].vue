<script setup lang="ts">
import { useHead } from "@unhead/vue";
import "quill/dist/quill.snow.css";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import Article from "../../components/Article.vue";
import { useProjectsStore } from "../../store";
import { getProjetId } from "../../utils";

const route = useRoute();
const router = useRouter();
const store = useProjectsStore();

const project = store.projects.find(
  (p) => getProjetId(p.name) === route.params.id
);

if (project == null) {
  router.replace("/404");
}

const { t } = useI18n();
useHead({
  title: `${t(project?.name ?? "")} - IceRayZer Portfolio`,
});
</script>

<template>
  <main>
    <Article
      :title="project?.name ?? ''"
      :article="project?.article ?? ''"
      :engine="project?.engine"
      :tags="project?.tags"
    />
  </main>
</template>
