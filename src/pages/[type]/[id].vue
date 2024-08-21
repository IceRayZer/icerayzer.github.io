<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import Article from "../../components/Article.vue";
import { useProjectsStore } from "../../store";
import { getProjectThumbnail, getProjetId } from "../../utils";

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
    <img
      class="thumbnail"
      v-if="project?.thumbnail != null"
      :src="getProjectThumbnail(project)"
      :alt="project?.name"
    />
    <Article
      :title="project?.name ?? ''"
      :article="project?.article ?? ''"
      :engine="project?.engine"
      :tags="project?.tags"
    />
  </main>
</template>

<style scoped lang="less">
.thumbnail {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(8px);
  mask: linear-gradient(to top, transparent, transparent 10%, #00000055);
  transform: translateY(-50%);
}
</style>
