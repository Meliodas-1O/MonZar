<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>

      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">To-do App</div>
        <div class="text-subtitle1">cisco</div>
      </div>
      <q-img
        class="header-img absolute-top"
        src="https://thumbs.dreamstime.com/b/water-drop-23006926.jpg"
      />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-list padding style="margin-top: 185px; border-right: 1px solid #ddd">
        <q-item to="/" active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="article" />
          </q-item-section>

          <q-item-section> To-do </q-item-section>
        </q-item>

        <q-item to="/help" active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="help_outline" />
          </q-item-section>

          <q-item-section> Help </q-item-section>
        </q-item>
      </q-list>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from '../boot/axios';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const response = api.get('/task/get/');
    console.log('response', response);

    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="scss">
.header-img {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
}
</style>

<!--jhjh-->
