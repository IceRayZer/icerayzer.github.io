<script setup lang="ts">
import { computed } from "vue";
import { ProjectType, type Project } from "../models";
import {
  getEngineLogo,
  getEngineName,
  getProjectThumbnail,
  getProjetId,
} from "../utils";

interface ProjectCardProps {
  project: Project;
  type?: ProjectType;
}

const props = defineProps<ProjectCardProps>();

const projectLocation = computed(() =>
  props.type == null ? "" : `/${props.type}/${getProjetId(props.project.name)}`
);
</script>

<template>
  <div class="project-card">
    <img
      class="thumbnail"
      v-if="$props.project.thumbnail != null && $props.project.thumbnail != ''"
      :src="getProjectThumbnail($props.project)"
      :alt="$props.project.name"
    />
    <div class="gradient"></div>
    <div class="infos">
      <div class="details">
        <div class="name">
          <span :title="$props.project.name">{{ $props.project.name }}</span>
          <img
            class="logo"
            :src="getEngineLogo($props.project.engine)"
            :title="getEngineName($props.project.engine)"
          />
        </div>
        <div class="tags">
          <span
            ref="tags"
            class="tag"
            v-for="tag in $props.project.tags"
            :key="tag"
            :title="$t(`tag.${tag}`)"
            >{{ $t(`tag.${tag}`) }}</span
          >
        </div>
      </div>
      <p class="summary">{{ $props.project.summary }}</p>
      <div class="actions">
        <RouterLink
          class="showmore btn primary"
          v-if="$props.project.article != null"
          :to="projectLocation"
          >{{ $t("projects.showmore") }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../colors.less";

.project-card {
  width: 600px;
  height: 400px;
  position: relative;
  border-radius: 8px;
  color: white;
  background-color: @background-color-light;
  overflow: hidden;
  box-shadow: 0 32px 16px -18px #00000055;

  > .thumbnail,
  > .gradient,
  > .title {
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
        justify-content: space-between;
        align-items: center;
        transition: font-weight 300ms ease-in-out;

        > span {
          font-size: 18px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
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

  &:hover {
    .thumbnail {
      filter: blur(4px);
    }

    .infos {
      transform: translateY(0%);

      .name {
        font-weight: bold;
      }

      .tags {
        opacity: 1;
      }
    }

    .summary {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 1920px) {
  .project-list {
    .project-card {
      width: 400px;
      height: 266px;

      .infos {
        transform: translateY(70%);
      }
    }
  }
}

@media only screen and (max-width: 1280px) {
  .project-list {
    .project-card {
      width: 300px;
      height: 200px;
    }
  }
}
</style>
