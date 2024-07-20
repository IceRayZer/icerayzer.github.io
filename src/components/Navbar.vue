<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import MenuIcon from "../assets/menu.svg";
import SocialsIcon from "../assets/socials.svg";
import { data } from "../constants";
import { useProjectsStore } from "../store";

const route = useRoute();
const store = useProjectsStore();

const search = ref("");
const mobile = ref(innerWidth <= 1280);
const open = ref(false);

watch(search, () => {
  store.setSearch(search.value ?? "");
});

function toggleMenu() {
  open.value = !open.value;
}

addEventListener("resize", checkMobile);

onBeforeUnmount(() => {
  removeEventListener("resize", checkMobile);
});

function checkMobile() {
  mobile.value = innerWidth <= 1280;
}
</script>

<template>
  <nav :class="{ mobile }">
    <div class="navbar-left">
      <RouterLink class="logo" to="/">
        <img src="../assets/logo.png" alt="Logo" />
      </RouterLink>
      <input
        class="search"
        type="text"
        v-model="search"
        :placeholder="$t('projects.search.placeholder')"
      />
      <template v-if="!mobile">
        <div class="separator"></div>
        <div class="types">
          <RouterLink
            class="link"
            :class="{ active: route.path.startsWith('/' + t) }"
            v-for="t in data.types"
            :key="t"
            :to="'/' + t"
          >
            {{ $t(`type.${t}`) }}
          </RouterLink>
        </div>
      </template>
    </div>
    <div class="navbar-right">
      <RouterLink to="/about-me">
        <button class="profile" type="button" :title="$t('page.about-me')">
          <img src="../assets/user_profile.jpg" alt="IceRayZer" />
          <span v-if="!mobile">IceRayZer</span>
        </button>
      </RouterLink>
      <RouterLink to="/social-medias" :title="$t('page.social-medias')">
        <button type="button"><SocialsIcon /></button>
      </RouterLink>
      <Language />
      <button v-if="mobile" type="button" @click="toggleMenu">
        <MenuIcon />
      </button>
    </div>
    <div class="menu" :class="{ open }" v-if="mobile">
      <RouterLink
        class="link"
        :class="{ active: route.path.startsWith('/' + t) }"
        v-for="t in data.types"
        :key="t"
        :to="'/' + t"
      >
        {{ $t(`type.${t}`) }}
      </RouterLink>
      <div class="fill"></div>
    </div>
  </nav>
</template>

<style scoped lang="less">
@import "../colors.less";

nav {
  height: 96px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-color: @background-color-light;

  .navbar-left,
  .navbar-right {
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0 24px;
    align-items: center;
    gap: 32px;
  }

  .navbar-right {
    justify-content: end;
    gap: 8px;
  }

  .logo {
    height: 48px;
  }

  .search {
    width: 100%;
    min-width: 256px;
    max-width: 100%;
  }

  .separator {
    flex-shrink: 0;
    width: 4px;
    height: 48px;
    background-color: #232531;
  }

  .types {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .profile {
    padding: 0 12px 0 0;

    > img {
      height: 100%;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }

  .link {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 016px;
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
    color: white;

    &.active {
      position: relative;
      background: linear-gradient(to left, @primary-color, @secondary-color);
      background-clip: text;
      color: transparent;

      &::after {
        content: "";
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: 28px;
        left: 0;
        background: linear-gradient(to left, @primary-color, @secondary-color);
      }
    }
  }

  &.mobile {
    .profile {
      padding: 0;

      > img {
        border-radius: 4px;
      }
    }
  }

  .menu {
    z-index: 10;
    height: 100%;
    position: fixed;
    top: 96px;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: @background-color-lighter;
    transition: transform 300ms ease-in-out;

    &:not(.open) {
      transform: translateX(100%);
    }

    .link {
      height: fit-content;
      justify-content: center;
      margin: 0;
      padding: 16px;

      &::after {
        content: none;
      }

      &:not(:first-child) {
        border-top: 4px solid @background-color-light;
      }
    }

    .fill {
      width: 100%;
      height: 100%;
      background-color: @background-color-light;
    }
  }
}
</style>
