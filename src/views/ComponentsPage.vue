<template>
  <h1>{{ pick }} as</h1>
  <custom-dropdown
    medium
    title="Select the best pizzas"
    :options="options"
    @picked="onPick"
  ></custom-dropdown>
  <form class="validationForm">
    <div class="validationRow">
      <input type="text" class="validationgInput inputText">
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue'
import customDropdown from '@/components/customDropdown.vue';

export default defineComponent({
  components: { customDropdown },
  
  setup() {
    let pick = ref<string[]>([]);
    const options = [
      {
        name: '4 Cheese',
        value: '4-cheese'
      },
      {
        name: 'NY style pepperonni',
        value: 'ny-style-pepperonni'
      },
      {
        name: 'Carbonara',
        value: 'carbonara'
      }
    ]

    const onPick = (arr: string[]) => pick.value = arr;
    
    return {
      options,
      pick,
      onPick
    }
  }
})
</script>


<style>

</style>
