<template> 
  <div class="customDropdown" :class="size">
    <div class="dropdownWrapper">
      <section class="section sectionOpener">
      <div class="dropdownItem dropdownItemOpener">
        <h1 class="dropdownTitle">{{ title }}</h1>
        <div class="inputField">
          <input type="checkbox" v-model="popupButton" id="checkbox-popup" class="dropdownCheckbox dropdownCheckboxOpener">
          <label for="checkbox-popup" class="dropdownText"></label>
        </div>
      </div>
    </section>
    <section class="section sectionMain" :class="{ 'sectionMainActive' : popupButton }" @change="handleCheckbox">
      <ul class="dropdownItems" v-if="options.length">
        <li class="dropdownItem dropdownItemSelect"
          v-for="(option, i) in options"
          :key="i"
           
          >
          <input
            type="checkbox" 
            :value="option.value"
            class="dropdownCheckbox dropdownCheckboxSelect"
            :id="'checkbox-' + i"
            v-model="picked"
            >
          <label :for="'checkbox-' + i" class="dropdownText">{{ option.name }}</label>
        </li>
      </ul>
      <p v-else>No options provided :c</p>
    </section>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

interface Option {
  name: string,
  value: string
}

export default defineComponent({
  props: {
    small: Boolean,
    medium: Boolean,
    large: Boolean,
    title: {
      type: String,
      default: () => 'Select option'
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    }
  },
  emits: ['picked'],
  setup(props, { emit }) {
    let popupButton = ref(false);
    let picked = ref<string[]>([]);

    const customDropdownSizes = {
      'customDropdownSmall': props.small,
      'customDropdownMedium': props.medium,
      'customDropdownLarge': props.large
    }

    const size = Object.entries(customDropdownSizes).filter((el) => el[1])?.[0]?.[0] ?? 'customDropdownMedium';
    
    const handleCheckbox = (e: Event) => emit('picked', picked.value);

    return {
      popupButton,
      handleCheckbox,
      size,
      picked
    }
  },
})
</script>


<style scoped>
@import url('@/assets/css/customDropdown/index.css');
</style>