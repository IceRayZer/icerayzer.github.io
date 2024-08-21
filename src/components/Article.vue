<script setup lang="ts">
import { getEngineLogo, getEngineName } from "../utils";

interface ArticleProps {
  title: string;
  article: string;
  engine?: string;
  tags?: string[];
}

withDefaults(defineProps<ArticleProps>(), {
  tags: () => [],
});
</script>

<template>
  <div class="page">
    <h1>{{ $props.title }}</h1>
    <div class="content ql-editor">
      <div class="infos">
        <div class="tags">
          <span
            ref="tags"
            class="tag"
            v-for="tag in tags"
            :key="tag"
            :title="$t(`tag.${tag}`)"
            >{{ $t(`tag.${tag}`) }}</span
          >
        </div>
        <img
          v-if="$props.engine != null"
          class="logo"
          :src="getEngineLogo($props.engine)"
          :alt="getEngineName($props.engine)"
          :title="getEngineName($props.engine)"
        />
      </div>
      <div v-html="article"></div>
    </div>
  </div>
</template>
