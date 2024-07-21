<script setup lang="ts">
import { data } from "../constants";
import { useProjectsStore } from "../store";
import { getEngineLogo } from "../utils";

const store = useProjectsStore();

function isActive(engine: string) {
  return engine === store.engine;
}
</script>

<template>
  <aside>
    <button
      :class="{ active: isActive('all') }"
      type="button"
      :title="$t('engine.all')"
      @click="() => store.setEngine('all')"
    >
      <span>{{ $t("engine.all") }}</span>
    </button>
    <button
      :class="{ active: isActive(engine.id) }"
      v-for="engine in data.engines"
      :key="engine.id"
      type="button"
      :title="engine.name"
      @click="() => store.setEngine(engine.id)"
    >
      <img :src="getEngineLogo(engine.id)" :alt="engine.name" />
    </button>

    <button
      :class="{ active: isActive('others') }"
      type="button"
      :title="$t('engine.others')"
      @click="() => store.setEngine('others')"
    >
      <img :src="getEngineLogo('others')" :alt="$t('engine.others')" />
    </button>
  </aside>
</template>

<style scoped lang="less">
@import "../colors.less";

aside {
  width: 96px;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px 0;
  background-color: @background-color-dark;

  > button {
    position: relative;
    width: 64px;
    height: 64px;
    padding: 12px;
    border: 1px solid @background-color;
    border-radius: 8px;
    background: linear-gradient(
      to top,
      @background-color-dark,
      @background-color
    );
    box-shadow: 2px 4px8px #00000033;

    &.active::before {
      content: "";
      position: absolute;
      border-radius: 8px;
      padding: 2px;
      background: linear-gradient(to top, @primary-color, @secondary-color);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      inset: 0;
    }

    > svg {
      width: 100%;
      height: 100%;
    }

    &:active {
      background: linear-gradient(
        to top,
        @background-color,
        @background-color-dark
      );
    }
  }
}
</style>
