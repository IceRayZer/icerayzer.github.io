<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Article from '../components/Article.vue';
import NotFound from '../components/NotFound.vue';
import { useProjectsStore } from '../store';
import { getProjectThumbnail, loadArticle, useEditorShortcut } from '../utils';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { computed, ref, watch } from 'vue';

const noArticle = ref(false);

const route = useRoute();
const router = useRouter();
const store = useProjectsStore();

const { t, locale } = useI18n();

const project = computed(() => store.projects.find((p) => p.id === route.params.id && p.lang === locale.value));

useHead({
  title: `${t(project.value?.name ?? '')} - IceRayZer Portfolio`,
});

loadProjectArticle();
watch(project, () => loadProjectArticle());

function loadProjectArticle() {
  if (project.value != null) {
    if (project.value.article == null) {
      loadArticle(project.value).then((article) => {
        if (project.value == null) return;

        project.value.article = article;
        noArticle.value = article == null;
      });
    } else {
      noArticle.value = false;
    }
  }
}

useEditorShortcut(() => {
  if (project.value == null) return;

  router.push(`/${project.value.type}/${project.value.id}/editor`);
});
</script>

<template>
  <main>
    <NotFound v-if="project == null || noArticle" />
    <template v-else>
      <img
        v-if="project?.thumbnail != null"
        class="thumbnail"
        :src="getProjectThumbnail(project)"
        :alt="project?.name"
      />
      <Article
        :title="project?.name ?? ''"
        :article="project?.article ?? ''"
        :engine="project?.engine"
        :tags="project?.tags"
      />
    </template>
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
