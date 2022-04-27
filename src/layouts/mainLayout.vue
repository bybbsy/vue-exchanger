<template>
  <div class="main-layout">
    <div class="header-wrapper">
      <section class="infobar-section">
        <slot name="infobar-slot">
          <the-infobar></the-infobar>
        </slot>
      </section>
      <section class="header-section">
        <slot name="header-slot">
          <the-header></the-header>
        </slot>
      </section>
    </div>
    <main class="main-wrapper">
      <slot>
        <loader/>
      </slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import TheHeader from '@/components/Header.vue';
import TheInfobar from '@/components/InfoBar.vue';

export default defineComponent({
  components: {
    TheInfobar, TheHeader,
    Loader: defineAsyncComponent(() => import('@/components/Loader.vue'))
  }
})
</script>


<style>

</style>