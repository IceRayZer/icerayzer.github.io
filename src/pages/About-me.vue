<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Article from '../components/Article.vue';
import { useHead } from '@unhead/vue';
import { ref, watch } from 'vue';

const article = ref('');

const { t, locale } = useI18n();
useHead({
  title: `${t('page.about-me')} - IceRayZer Portfolio`,
});

watch(locale, () => {
  loadText();
});

loadText();

function loadText() {
  fetch(`/about-me/${locale.value}.txt`).then((res) => {
    if (!res.headers.get('Content-Type')?.startsWith('text/plain')) return;
    res.text().then((text) => {
      article.value = text;
    });
  });
}
</script>

<template>
  <main>
    <Article :title="$t('page.about-me')" :article="article" />
  </main>
</template>
