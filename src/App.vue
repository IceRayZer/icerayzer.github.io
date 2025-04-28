<script setup lang="ts">
import 'quill/dist/quill.snow.css';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <RouterView :key="$route.fullPath" />
</template>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import './main.less';
</style>
