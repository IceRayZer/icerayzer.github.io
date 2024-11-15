<script setup lang="ts">
import { computed } from "vue";
import { data } from "../constants";
import { useProjectsStore } from "../store";
import { getEngineLogo, toEngineList } from "../utils";

interface SidebarProps {
  engines: string[];
}

const props = defineProps<SidebarProps>();
const store = useProjectsStore();

function isActive(engine: string) {
  return engine === store.engine;
}

const engines = computed(() =>
  [
    ...toEngineList(data.engines),
    ...toEngineList(data["others-engines"]),
  ].filter((e) => props.engines.includes(e.id))
);

const hasOthersEngines = computed(
  () =>
    engines.value.filter(
      (engine) =>
        toEngineList(data["others-engines"]).findIndex(
          (e) => e.id === engine.id
        ) > -1
    ).length > 0
);

console.log(engines.value);
</script>

<template>
  <aside v-if="engines.length > 1">
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
      v-for="engine in engines.filter((e) => data.engines[e.id])"
      :key="engine.id"
      type="button"
      :title="engine.name"
      @click="() => store.setEngine(engine.id)"
    >
      <img :src="getEngineLogo(engine.id)" :alt="engine.name" />
    </button>

    <button
      v-if="hasOthersEngines"
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
