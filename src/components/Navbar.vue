<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import MenuIcon from '../assets/menu.svg';
import SocialsIcon from '../assets/socials.svg';
import Language from './Language.vue';
import { data } from '../constants';
import { useProjectsStore } from '../store';
import { useResizeWindow } from '../utils';

type NavbarSize = 'large' | 'medium' | 'small' | 'compact';

const store = useProjectsStore();

const search = ref('');
const size = ref<NavbarSize>('large');
const open = ref(false);

watch(search, () => {
  store.setSearch(search.value ?? '');
});

function toggleMenu(value?: boolean) {
  open.value = value ?? !open.value;
}

useResizeWindow(() => {
  if (window.innerWidth > 1280) size.value = 'large';
  else if (window.innerWidth > 768) size.value = 'medium';
  else if (window.innerWidth > 480) size.value = 'small';
  else size.value = 'compact';
});
</script>

<template>
  <nav :class="size">
    <div class="navbar-left">
      <RouterLink class="logo" to="/">
        <img src="../assets/logo.png" alt="Logo" />
      </RouterLink>
      <input
        v-if="size !== 'compact'"
        class="search"
        type="text"
        v-model="search"
        :placeholder="$t('projects.search.placeholder')"
      />
      <template v-if="size === 'large'">
        <div class="separator"></div>
        <div class="types">
          <RouterLink class="link" v-for="t in data.types" :key="t" :to="'/' + t">
            {{ $t(`type.${t}`) }}
          </RouterLink>
        </div>
      </template>
    </div>
    <div class="navbar-right">
      <template v-if="size === 'large' || size === 'medium'">
        <RouterLink to="/about-me">
          <button class="profile" type="button" :title="$t('page.about-me')">
            <img src="../assets/user_profile.jpg" alt="IceRayZer" />
            <span v-if="size === 'large'">IceRayZer</span>
          </button>
        </RouterLink>
        <RouterLink to="/social-medias" :title="$t('page.social-medias')">
          <button type="button"><SocialsIcon /></button>
        </RouterLink>
        <Language />
      </template>
      <button v-if="size !== 'large'" type="button" @click="() => toggleMenu()">
        <MenuIcon />
      </button>
    </div>
    <div class="menu" :class="{ open }" v-if="size !== 'large'">
      <template v-if="size === 'compact'">
        <div class="menu-item">
          <input class="search" type="text" v-model="search" :placeholder="$t('projects.search.placeholder')" />
        </div>
        <div class="menu-item">
          <div class="separator"></div>
        </div>
      </template>
      <div class="menu-item">
        <div class="link-container" v-for="t in data.types" :key="t">
          <RouterLink class="link" :to="'/' + t">
            {{ $t(`type.${t}`) }}
          </RouterLink>
        </div>
      </div>
      <div v-if="size !== 'medium'" class="menu-bottom">
        <RouterLink to="/about-me">
          <button class="profile" type="button" :title="$t('page.about-me')">
            <img src="../assets/user_profile.jpg" alt="IceRayZer" />
          </button>
        </RouterLink>
        <RouterLink to="/social-medias" :title="$t('page.social-medias')">
          <button type="button"><SocialsIcon /></button>
        </RouterLink>
        <Language />
      </div>
    </div>
    <div v-if="open" class="menu-backdrop" @click="() => toggleMenu(false)"></div>
  </nav>
</template>

<style scoped lang="less">
@import '../colors.less';

nav {
  height: 96px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-color: @background-color-light;
  z-index: 10;

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

    &.router-link-active {
      position: relative;
      background: linear-gradient(to left, @primary-color, @secondary-color);
      background-clip: text;
      color: transparent;

      &::after {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: 28px;
        left: 0;
        background: linear-gradient(to left, @primary-color, @secondary-color);
      }
    }
  }

  &.medium,
  &.small,
  &.compact {
    .search {
      width: fit-content;
      min-width: fit-content;
    }

    .navbar-right {
      width: fit-content;
    }

    .profile {
      padding: 0;

      > img {
        border-radius: 4px;
      }
    }
  }

  .menu {
    z-index: 10;
    height: calc(100% - 96px);
    position: fixed;
    top: 96px;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: @background-color-light;
    transition: transform 300ms ease-in-out;

    &:not(.open) {
      transform: translateX(100%);
    }

    .menu-item {
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;

      .link-container {
        width: 100%;
        background-color: @background-color-lighter;

        .link {
          height: fit-content;
          justify-content: center;
          margin: 0;
          padding: 16px;
          font-size: 20px;

          &::after {
            content: none;
          }

          &:not(:first-child) {
            border-top: 4px solid @background-color-light;
          }
        }
      }

      .search {
        border-radius: 0;
      }

      .separator {
        width: 128px;
        height: 4px;
      }
    }

    .menu-bottom {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 8px;
      margin-bottom: 16px;
    }
  }

  &.compact .menu {
    height: calc(100% - 176px);
  }

  .menu-backdrop {
    width: 100%;
    height: calc(100% - 96px);
    position: absolute;
    left: 0;
    top: 96px;
    z-index: 9;
  }
}
</style>
