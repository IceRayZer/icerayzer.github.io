<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import Article from "../components/Article.vue";
import { data } from "../constants";

const { t } = useI18n();
useHead({
  title: `${t("page.about-me")} - IceRayZer Portfolio`,
});
</script>

<template>
  <main>
    <Article :title="$t('page.about-me')" :article="data['about-me']" />
  </main>
</template>
