<template>
  <div id="app">
    <h1>Counter: {{ counter }}</h1>
    <button @click="incrementCounter">Increment</button>
  </div>
</template>

<script>
import axios from 'axios';
import { io } from 'socket.io-client';

export default {
  name: 'App',
  data() {
    return {
      counter: 0,
      socket: null,
    };
  },
  created() {
    this.fetchCounter();
    this.setupWebSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    fetchCounter() {
      axios.get('http://localhost:3000/counter')
        .then(response => {
          this.counter = response.data.counter;
        })
        .catch(error => {
          console.error('Error fetching counter:', error);
        });
    },
    incrementCounter() {
      axios.post('http://localhost:3000/counter/increment')
        .then(response => {
          this.counter = response.data.counter;
        })
        .catch(error => {
          console.error('Error incrementing counter:', error);
        });
    },
    setupWebSocket() {
      this.socket = io('http://localhost:3000');
      this.socket.on('counterUpdated', (data) => {
        this.counter = data.counter;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
