<template>
  <div class="app">
    <header class="app-header">
      <h1>WebStorm Import Issue Reproduction</h1>
      <p>This app demonstrates the WebStorm import path issue.</p>
    </header>

    <main class="app-content">
      <div class="component-section">
        <h2>Button Component</h2>
        <p>Imported from @my-company/ui-vue/Button</p>
        <Button @click="handleButtonClick" :variant="buttonVariant">
          {{ buttonText }}
        </Button>
      </div>

      <div class="component-section">
        <h2>Card Component</h2>
        <p>Imported from @my-company/ui-vue/Card</p>
        <Card :title="cardTitle" :bordered="true">
          <p>This is a card component that demonstrates importing from the ui-vue package.</p>
          <p>The card uses the truncate utility from @my-company/utils-ts/string.</p>

          <template #footer>
            <Button variant="secondary" @click="toggleCardTitle">
              Toggle Card Title
            </Button>
          </template>
        </Card>
      </div>

      <div class="utility-section">
        <h2>Utility Functions</h2>
        <p>Imported from @my-company/utils-ts/array</p>
        <div class="array-example">
          <h3>Chunked Array:</h3>
          <pre>{{ chunkedArrayDisplay }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Import UI components
import Button from '@my-company/ui-vue/Button'
import Card from '@my-company/ui-vue/Card'

// Import utilities
import { chunk } from '@my-company/utils-ts/array'

// Button state
const buttonText = ref('Click Me')
const buttonVariant = ref<'primary' | 'secondary' | 'danger'>('primary')

const handleButtonClick = () => {
  buttonText.value = 'Clicked!'
  buttonVariant.value = buttonVariant.value === 'primary' ? 'danger' : 'primary'
  setTimeout(() => {
    buttonText.value = 'Click Me'
  }, 1000)
}

// Card state
const cardTitle = ref('Example Card with a Very Long Title That Should Be Truncated')

const toggleCardTitle = () => {
  cardTitle.value = cardTitle.value === 'Example Card with a Very Long Title That Should Be Truncated'
    ? 'Short Title'
    : 'Example Card with a Very Long Title That Should Be Truncated'
}

// Array utility example
const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const chunkedArray = chunk(originalArray, 3)
const chunkedArrayDisplay = computed(() => JSON.stringify(chunkedArray, null, 2))
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  margin-bottom: 40px;
  text-align: center;
}

.app-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.component-section, .utility-section {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.array-example {
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 4px;
}

pre {
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>