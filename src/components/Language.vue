<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from "vue";
import { useI18n } from "vue-i18n";
const { locale, availableLocales } = useI18n({
  useScope: "global",
});

const localeFlag = shallowRef();

function switchLanguage() {
  locale.value =
    availableLocales[
      (availableLocales.indexOf(locale.value) + 1) % availableLocales.length
    ];
  changeFlag();
}

function changeFlag() {
  localeFlag.value = defineAsyncComponent(
    () => import(`../assets/locales/${locale.value}.svg`)
  );
}
changeFlag();
</script>

<template>
  <button type="button" @click="switchLanguage" :title="$t('language')">
    <localeFlag />
  </button>
</template>
