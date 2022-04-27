<template>
  <div class="customDropdown">
    <div class="dropdownWrapper">
      <section class="section sectionOpener">
      <div class="dropdownItem dropdownItemOpener">
        <h1 class="dropdownTitle">Select option</h1>
        <div class="inputField">
          <input type="checkbox" v-model="popupButton" id="checkbox-popup" class="dropdownCheckbox dropdownCheckboxOpener">
          <label for="checkbox-popup" class="dropdownText"></label>
        </div>
      </div>
    </section>
    <section class="section sectionMain" :class="{ 'sectionMainActive' : popupButton }">
      <ul class="dropdownItems">
        <li class="dropdownItem dropdownItemSelect"
          v-for="(option, i) in options"
          :key="i" 
          >
          <input
            type="checkbox" 
            :value="option.value"
            class="dropdownCheckbox dropdownCheckboxSelect"
            :id="'checkbox-' + i"
            >
          <label :for="'checkbox-' + i" class="dropdownText">{{ option.name }}</label>
        </li>
      </ul>
    </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Option {
  name: string,
  value: string
}

export default defineComponent({
  setup() {
    let popupButton = ref(false);
    
    const options: Option[] = [
      {
        name: 'Option 1',
        value: 'Option 1',
      },
      {
        name: 'Option 2',
        value: 'Option 2',
      },
      {
        name: 'Option 3',
        value: 'Option 3',
      },
      {
        name: 'Option 2',
        value: 'Option 2',
      },
      {
        name: 'Option 3',
        value: 'Option 3',
      }
    ]

    return {
      options,
      popupButton
    }
  },
})
</script>


<style scoped>
@import url('@/assets/css/customDropdown/index.css');
</style>