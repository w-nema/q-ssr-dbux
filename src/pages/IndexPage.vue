<template>
  <q-page class="flex flex-center column">
    <div class="q-pa-md">
      <h5 class="q-my-md">UI State (synced with backend)</h5>
      <q-input v-model="text" label="Text" @update:model-value="onTextChange" />
      <q-toggle v-model="toggle" label="Toggle" @update:model-value="onToggleChange" />
    </div>

    <div class="q-pa-md">
      <q-btn label="Save Manually" color="primary" @click="saveState" />
    </div>

    <div class="q-pa-md">
      <p>Current state:</p>
      <pre>{{ { text, toggle } }}</pre>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useUiStore } from 'stores/ui-store';
import { storeToRefs } from 'pinia';

const uiStore = useUiStore();
const { text, toggle } = storeToRefs(uiStore);
const { fetchState, saveState, setText, setToggle } = uiStore;

let saveInterval;

onMounted(() => {
  fetchState();
  saveInterval = setInterval(saveState, 10000); // Save every 10 seconds
});

onUnmounted(() => {
  clearInterval(saveInterval);
});

const onTextChange = (value) => {
  setText(value);
  saveState();
};

const onToggleChange = (value) => {
  setToggle(value);
  saveState();
};
</script>
