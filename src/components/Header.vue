<template>
  <nav class="header-nav flex items-baseline">
    <div class="nav-logo mr-10">
      <p class="text-blue-500 text-lg font-bold">Cryptos</p>
    </div>
    <div class="nav-links flex">
      <div class="nav-link__wrapper mx-2">
        <router-link to="/">Home</router-link>
      </div>
      <div class="nav-link__wrapper mx-2">
        <router-link to="/markets">Markets</router-link>
      </div>
      <div class="nav-link__wrapper mx-2">
        <router-link to="/detail">Detailed</router-link>
      </div>
      <div class="nav-link__wrapper mx-2">
        <router-link to="/quiz">Quizzes</router-link>
      </div>
      <div class="nav-link__wrapper mx-2">
        <router-link to="/components">Components</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'the-header'
})
</script>
