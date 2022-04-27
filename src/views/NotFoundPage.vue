<template>
  <not-fount-layout>
    <section class="main__top">
      <h1 class="not-found__title">We do not have such page</h1>
    </section>
    <section class="main__bottom">
      <slot>
      </slot>
    </section>
  </not-fount-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import notFountLayout from '@/layouts/notFoundLayout.vue';

export default defineComponent({
  components: {
    notFountLayout
  },
  setup() {
    console.log('Ready')
  },
})
</script>


<style>
.main__top {
  height: 50%;
}

.main__bottom {
  height: 50%;
}

.main__top,
.main__bottom {
  display: flex;
  align-items: center;
}

.not-found__title {
  font-size: 2em;
  /* text-shadow: rgba(175, 250, 113, 0.3) 2px 5px, rgba(243, 6, 6, 0.3) -2px -5px, rgba(0, 0, 255, 0.3) -5px -2px; */
  animation: list-shadow 5s infinite;
}

@keyframes animate-text {
  0% {
    text-shadow: red 1px 0px, blue 3px 0px;
  }
  25% {
    text-shadow: red 2px 0px, blue 4px 0px;
  } 
  75% {
    text-shadow: red -2px 0px, blue -4px 0px;
  }
  100% {
    text-shadow: red 1px 0px, blue 3px 0px;
  }
}

@keyframes list-shadow {
  0% {
    text-shadow: red 0px 0px, blue 0px 0px;
  }
  25% {
    text-shadow: red 80px 40px, blue -80px -40px;
  } 
  70% {
    text-shadow: red 80px 35px 50px, blue -80px -40px 50px;
  }
  72% {
    text-shadow: red 80px 35px 40px, blue -80px -40px 40px;
  }
  90% {
    text-shadow: red 0px 0px 0px, blue 0px 0px 0px;
  }
  100% {
    text-shadow: red 1px 0px 0px, blue 3px 0px 0px;
  }
}
</style>