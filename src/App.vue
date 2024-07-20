<script setup lang="ts">
import { useHead } from "@unhead/vue";
import Navbar from "./components/Navbar.vue";

useHead({
  title: "IceRayZer Portfolio",
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
@import "./main.less";
</style>
