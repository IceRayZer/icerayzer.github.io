<script setup lang="ts">
import Quill from "quill";
import { onMounted, ref } from "vue";
import { QuillyEditor } from "vue-quilly";

const modelValue = defineModel<string>();

const editor = ref();
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

let quill: Quill | null = null;

onMounted(() => {
  quill = editor.value?.initialize(Quill) ?? null;
});
</script>

<template>
  <QuillyEditor ref="editor" v-model="modelValue" :options="options" />
</template>
