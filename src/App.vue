<template>
    <!-- <the-infobar></the-infobar>
    <the-header></the-header> -->
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
</template>


<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
// import TheHeader from '@/components/Header.vue';
// import TheInfobar from '@/components/InfoBar.vue';
import { getOffers } from '@/data/services/expressAPI/expressAPI';

export default defineComponent({
  components: {
    // TheHeader, TheInfobar
  },
  async mounted() {
    console.log('Get offers')
    const res = await getOffers();
    console.log('RES: ', res) 
    // console.log('res')
  }
})

</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.table-container {
  width: 1200px;
  margin: 0 auto;
}

.currencies-table {
  width: 100%;
  overflow-y: scroll;
}

.table-border-bottom {
  border-bottom-width: 1px;
  border-style: solid;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  widows: 100%;
  height: 100vh;
  overflow-x: hidden;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

function getOffers() {
  throw new Error("Function not implemented.");
}
