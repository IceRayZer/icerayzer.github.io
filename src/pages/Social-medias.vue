<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import { data } from "../constants";
import { getSocialMediaLogo } from "../utils";

const { t } = useI18n();
useHead({
  title: `${t("page.social-medias")} - IceRayZer Portfolio`,
});
</script>

<template>
  <div class="page">
    <h1>Social medias</h1>
    <div class="content">
      <div
        class="social-media"
        v-for="media in data['social-medias']"
        :key="media.id"
      >
        <span class="name">{{ media.name }}</span>
        <a :href="media.url" :title="media.name" target="_blank">
          <img :src="getSocialMediaLogo(media.id)" :alt="media.name" />
        </a>
        <span
          v-if="$t(`social-medias.${media.id}`) !== `social-medias.${media.id}`"
          :title="$t(`social-medias.${media.id}`)"
        >
          {{ $t(`social-medias.${media.id}`) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 128px;

  .social-media {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 24px;
    }

    > a {
      height: 128px;

      > img {
        height: 100%;
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .content .social-media > a {
    height: 64px;
  }
}
</style>
