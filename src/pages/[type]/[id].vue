<script setup lang="ts">
import { useHead } from "@unhead/vue";
import "quill/dist/quill.snow.css";
import { onMounted, ref } from "vue";
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

const thumbnail = ref<string>();
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (project == null) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = getProjectThumbnail(project);
  img.onload = () => {
    if (canvas.value == null) return;

    canvas.value.width = img.width;
    canvas.value.height = img.height;

    const ctx = canvas.value?.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    thumbnail.value = canvas.value?.toDataURL();
  };
});
</script>

<template>
  <main>
    <img class="thumbnail" v-if="thumbnail != null" :src="thumbnail" />
    <canvas ref="canvas" class="canvas"></canvas>
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
.canvas {
  display: none;
}
</style>
