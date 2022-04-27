<template>
  <div class="relative pt-1 my-2">
    <label for="customRange3" class="form-label">Limit</label>
    <input
       
      type="range"
      class="
        form-range
        appearance-none
        w-full
        h-2
        p-0
        bg-blue-300 
        rounded-md
        focus:outline-none focus:ring-0 focus:shadow-none
      "
      v-model="inputValue"
      :min="min"
      :max="max"
      :step="step"
    />
    <div class="span-diveders w-full flex justify-between text-xs px-2">
      <span v-for="(span, i) in (max / 100)" :key="i">{{ (i + 1) * 100 }}</span>      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'range-slider',
  props: ['curLimit'],
  data() {
    return {
      min: 100 as number,
      max: 500 as number,
      step: 100
    }
  },
  computed: {
    inputValue: {
      get(): number {
        return this.curLimit;
      },
      set(value: number | string) {
        this.$emit('update:curLimit', value)
      }
    }
  },
  mounted() {
    console.log(this.curLimit)
  }
})

</script>

<style scoped>

</style>