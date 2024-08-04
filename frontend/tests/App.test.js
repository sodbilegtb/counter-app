import { render, fireEvent, screen } from '@testing-library/vue';
import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../src/App.vue'; // Adjust the path as needed

// Setup axios mock adapter
const mock = new MockAdapter(axios);

describe('App.vue', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should render the initial counter value', async () => {
    mock.onGet('http://localhost:3000/counter').reply(200, { counter: 0 });

    render(App);

    // Wait for the component to update
    await screen.findByText('Counter: 0');
  });

  it('should increment the counter when the button is clicked', async () => {
    mock.onGet('http://localhost:3000/counter').reply(200, { counter: 0 });
    mock.onPost('http://localhost:3000/counter/increment').reply(200, { counter: 1 });

    render(App);

    // Click the increment button
    await fireEvent.click(screen.getByText('Increment'));

    // Wait for the component to update
    await screen.findByText('Counter: 1');
  });
});
