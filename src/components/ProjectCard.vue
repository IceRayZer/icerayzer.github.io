<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ProjectType, Project } from '../models';
import { getEngineLogo, getEngineName, getProjectThumbnail, useResizeWindow } from '../utils';
import { useRouter } from 'vue-router';

interface ProjectCardProps {
  project: Project;
  type: ProjectType;
}

const props = defineProps<ProjectCardProps>();

const router = useRouter();

const showHover = ref(false);

const projectLocation = computed(() => (props.type == null ? '' : `/${props.type}/${props.project.id}`));

useResizeWindow(() => {
  showHover.value = window.innerWidth <= 960;
});

function clickOnCard() {
  if (!showHover.value) return;

  router.push(projectLocation.value);
}
</script>

<template>
  <div class="project-card" :class="{ hover: showHover }" @click="clickOnCard">
    <img
      v-if="$props.project.thumbnail != null && $props.project.thumbnail != ''"
      class="thumbnail"
      :src="getProjectThumbnail($props.project)"
      :alt="$props.project.name"
    />
    <div class="gradient"></div>
    <span class="title" :title="$props.project.name">{{ $props.project.name }}</span>
    <div class="infos">
      <div class="details">
        <div class="name">
          <img class="logo" :src="getEngineLogo($props.project.engine)" :title="getEngineName($props.project.engine)" />
        </div>
        <div class="tags">
          <span ref="tags" class="tag" v-for="tag in $props.project.tags" :key="tag" :title="$t(`tag.${tag}`)">{{
            $t(`tag.${tag}`)
          }}</span>
        </div>
      </div>
      <p class="summary" :title="$props.project.summary">{{ $props.project.summary }}</p>
      <div v-if="$props.project.article && !showHover" class="actions">
        <RouterLink class="showmore btn primary" :to="projectLocation">{{ $t('projects.showmore') }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../colors.less';

.project-card {
  aspect-ratio: 3/2;
  position: relative;
  border-radius: 8px;
  color: white;
  background-color: @background-color-light;
  overflow: hidden;
  box-shadow: 0 32px 16px -18px #00000055;

  > .thumbnail,
  > .gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  > .thumbnail {
    object-fit: cover;
    transition: filter 300ms ease-in-out;
  }

  > .gradient {
    z-index: 1;
    background: linear-gradient(
      to top,
      @background-color 12%,
      fade(@background-color, 90%) 24%,
      fade(@background-color, 40%)
    );
  }

  > .title {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    font-size: 40px;
    font-weight: 900;
    transform: translate(-50%, -50%);
    transition: all 300ms ease-in-out;
  }

  .infos {
    width: 100%;
    height: 100%;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    top: 0;
    left: 0;
    display: flex;
    align-items: start;
    gap: 16px;
    padding: 5%;
    box-sizing: border-box;
    transform: translateY(78%);
    transition: transform 300ms ease-in-out;

    .details {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;

      .name {
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
        transition: font-weight 300ms ease-in-out;
      }

      .logo {
        height: 32px;
      }

      .tags {
        opacity: 0;
      }
    }

    .summary {
      height: 100%;
      opacity: 0;
      margin: 0;
      text-align: justify;
      overflow: hidden;
      mask: linear-gradient(to top, transparent, black 40%, black);
      transition: opacity 300ms ease-in-out;
    }

    .actions {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 32px;

      > .showmore {
        margin: auto;
        padding: 4px 12px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  > :not(.thumbnail) {
    z-index: 2;
  }

  &:hover,
  &.hover {
    .thumbnail {
      filter: blur(4px);
    }

    .title {
      text-align: start;
      font-weight: bold;
      font-size: 18px;
      top: 5%;
      left: 5%;
      transform: translate(0, 50%);
    }

    .infos {
      transform: translateY(0%);

      .tags {
        opacity: 1;
      }
    }

    .summary {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 960px) {
  .showmore {
    height: 24px;
  }
}
</style>
