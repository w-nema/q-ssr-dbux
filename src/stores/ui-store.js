import { defineStore } from 'pinia';
import axios from 'axios';

export const useUiStore = defineStore('ui', {
  state: () => ({
    text: 'Hello from Pinia!',
    toggle: false,
  }),
  actions: {
    async fetchState() {
      try {
        const { data } = await axios.get('/api/state');
        this.text = data.text;
        this.toggle = data.toggle;
      } catch (error) {
        console.error('Error fetching state:', error);
      }
    },
    async saveState() {
      try {
        await axios.post('/api/state', {
          text: this.text,
          toggle: this.toggle,
        });
      } catch (error) {
        console.error('Error saving state:', error);
      }
    },
    setText(text) {
      this.text = text;
    },
    setToggle(toggle) {
      this.toggle = toggle;
    }
  },
});
