<template>
  <div
    :class="[
      'my-card',
      { 'my-card--bordered': bordered }
    ]"
  >
    <div v-if="title" class="my-card__header">
      <h3 class="my-card__title">{{ title }}</h3>
    </div>
    <div class="my-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="my-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { truncate } from '@my-company/utils-ts/string'

const props = withDefaults(
  defineProps<{
    title?: string
    bordered?: boolean
    maxTitleLength?: number
  }>(),
  {
    bordered: true,
    maxTitleLength: 50
  }
)

// Example of using the imported utility
const formattedTitle = props.title 
  ? truncate(props.title, props.maxTitleLength)
  : ''

if (formattedTitle) {
  console.log(`Card title: ${formattedTitle}`)
}
</script>

<style scoped>
.my-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.my-card--bordered {
  border: 1px solid #e5e7eb;
}

.my-card__header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.my-card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.my-card__body {
  padding: 16px;
}

.my-card__footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}
</style>