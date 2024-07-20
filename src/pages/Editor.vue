<script setup lang="ts">
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { nextTick, onMounted, ref, toRaw } from "vue";
import { QuillyEditor } from "vue-quilly";
import ProjectCard from "../components/ProjectCard.vue";
import { data } from "../constants";
import { Project } from "../models";
import { getProjetId, mapToProject } from "../utils";

const allEngines = [...data.engines, ...data["others-engines"]];

const editor = ref<InstanceType<typeof QuillyEditor>>();
const options = ref({
  theme: "snow",
  toolbar: "full",
  modules: {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["direction", { align: [] }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  },
});

const project = ref<Project>({
  name: "",
  engine: allEngines[0]?.id,
  type: data.types[0],
  tags: [],
});
const edit = ref<boolean>(true);
const importFile = ref<HTMLInputElement | null>(null);

let quill: Quill | null = null;

onMounted(() => {
  quill = editor.value?.initialize(Quill) ?? null;
});

function importProject() {
  importFile.value?.click();
}

function onImportFile() {
  if (importFile.value == null) return;

  const file = importFile.value.files?.[0];
  if (file == null) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(String(e.target?.result ?? ""));
      project.value = mapToProject(json);
    } catch (err) {
      console.error("Failed to import project:", err);
    }
  };
  reader.readAsText(file, "utf8");
}

function exportProject() {
  if (project.value == null) return;

  const proj: Project = mapToProject(structuredClone(toRaw(project.value)));

  const a = document.createElement("a");
  a.download = getProjetId(proj.name);
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(proj)], {
      type: "application/json",
    })
  );
  a.href = url;
  a.click();
}

function switchPreview() {
  edit.value = !edit.value;
  if (!edit.value) quill = null;

  nextTick(() => {
    quill ??= editor.value?.initialize(Quill) ?? null;
  });
}

function switchTag(tag: string) {
  if (project.value.tags == null) return;

  const tagIndex = project.value.tags.findIndex((t) => t === tag);
  if (tagIndex > -1) {
    project.value.tags.splice(tagIndex, 1);
  } else {
    project.value.tags.push(tag);
  }
}
</script>

<template>
  <main>
    <ProjectCard class="card" :project="project" />
    <div class="page" v-if="edit">
      <div class="content editor">
        <label class="input-group">
          <span>{{ $t("project.name") }}</span>
          <input v-model="project.name" type="text" />
        </label>
        <label class="input-group">
          <span>{{ $t("project.type") }}</span>
          <select v-model="project.type">
            <option v-for="t in data.types" :key="t" :value="t">
              {{ $t(`type.${t}`) }}
            </option>
          </select>
        </label>
        <div class="input-group">
          <span>{{ $t("project.tags") }}</span>
          <div class="tags">
            <span
              class="tag"
              :class="{ unchecked: !project.tags?.includes(tag) }"
              v-for="tag in data.tags"
              :key="tag"
              :title="$t(`tag.${tag}`)"
              @click="() => switchTag(tag)"
              >{{ $t(`tag.${tag}`) }}</span
            >
          </div>
        </div>
        <label class="input-group">
          <span>{{ $t("project.engine") }}</span>
          <select v-model="project.engine">
            <option
              v-for="engine in allEngines"
              :key="engine.id"
              :value="engine.id"
            >
              {{ $t(`engine.${engine}`) }}
            </option>
          </select>
        </label>
        <label class="input-group">
          <span>{{ $t("project.thumbnail") }}</span>
          <input v-model="project.thumbnail" type="text" />
        </label>
        <label class="input-group">
          <span>{{ $t("project.summary") }}</span>
          <input v-model="project.summary" type="text" />
        </label>
        <div class="text-editor">
          <ClientOnly>
            <QuillyEditor
              ref="editor"
              v-model="project.article"
              :options="options"
            />
          </ClientOnly>
        </div>
      </div>
    </div>
    <Article
      v-else
      :title="project?.name ?? ''"
      :article="project?.article ?? ''"
      :engine="project?.engine"
      :tags="project?.tags"
    />
    <div class="actions">
      <button class="primary" type="button" @click="switchPreview">
        {{ edit ? $t("editor.preview") : $t("editor.edit") }}
      </button>
      <button class="primary" type="button" @click="importProject">
        {{ $t("editor.import") }}
      </button>
      <button class="primary" type="button" @click="exportProject">
        {{ $t("editor.export") }}
      </button>
    </div>
    <input
      id="import"
      ref="importFile"
      type="file"
      accept="application/json"
      @change="onImportFile"
    />
  </main>
</template>

<style scoped lang="less">
@import "../colors.less";

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page {
  padding: 64px 0;
  overflow: unset;
}

.card {
  width: 600px;
  flex-shrink: 0;
  margin-top: 64px;
}

.editor,
.preview {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  .input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tag.unchecked {
    font-weight: normal;
    background: @background-color-lighter;
    color: white;
  }

  .text-editor {
    width: 100%;
    margin-bottom: 42px;
    background-color: snow;
  }
}

.actions {
  position: fixed;
  bottom: 64px;
  right: 64px;
  display: flex;
  gap: 16px;
}

#import {
  display: none;
}
</style>

<style lang="less">
@import "../colors.less";

.ql-editor {
  background-color: @background-color-light;
  min-height: 256px;
}
</style>
