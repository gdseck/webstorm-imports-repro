<template>
  <button
    :class="[
      'my-button',
      `my-button--${variant}`,
      { 'my-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { isString } from '@my-company/utils-ts/core'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    label?: string
  }>(),
  {
    variant: 'primary',
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

// Example of using the imported utility
if (props.label && isString(props.label)) {
  console.log(`Button label: ${props.label}`)
}
</script>

<style scoped>
.my-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.my-button--primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.my-button--secondary {
  background-color: #e5e7eb;
  color: #1f2937;
  border: 1px solid #d1d5db;
}

.my-button--danger {
  background-color: #ef4444;
  color: white;
  border: none;
}

.my-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>