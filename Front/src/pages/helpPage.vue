<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="row items-center justify-evenly">
    <h1>Helpi</h1>
  </q-page>
</template>

<script lang="ts">
import { Meta } from '../components/models';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { meta };
  },
});
</script>
