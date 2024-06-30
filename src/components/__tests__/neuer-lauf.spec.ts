import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import NeuerToDoLauf from '@/components/todoLauf/neuer-todo-lauf.vue';

beforeEach(() => {
  vi.mock('axios');
});

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'Startseite Laufer', component: { template: '<div>Startseite</div>' } }]
});

describe('NeuerToDoLauf.vue', () => {
  it('should create a new ToDoLauf and navigate to Startseite Laufer on success', async () => {
    const mockResponse = { data: 'Success' };
    (axios.post as any).mockResolvedValue(mockResponse);

    const wrapper = mount(NeuerToDoLauf, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Create a new ToDoLauf'
      }
    });

    await wrapper.find('input[placeholder="Datum"]').setValue('2021-08-01');
    await wrapper.find('input[placeholder="Art"]').setValue('Joggen');
    await wrapper.find('input[placeholder="Titel"]').setValue('Morning Run');
    await wrapper.find('input[placeholder="Distanz"]').setValue(10);
    await wrapper.find('input[placeholder="Beschreibung"]').setValue('Run in the park');
    await wrapper.find('input[placeholder="Status"]').setValue(true);

    await wrapper.find('button').trigger('click');

    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/todolauf`,
      {
        datum: '2021-08-01',
        art: 'Joggen',
        titel: 'Morning Run',
        distanz: 10,
        beschreibung: 'Run in the park',
        status: 'true'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    expect(router.currentRoute.value.name).toBe('Startseite Laufer');
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('Network Error');
    (axios.post as any).mockRejectedValue(mockError);

    const wrapper = mount(NeuerToDoLauf, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Create a new ToDoLauf'
      }
    });

    await wrapper.find('input[placeholder="Datum"]').setValue('2021-08-01');
    await wrapper.find('input[placeholder="Art"]').setValue('Joggen');
    await wrapper.find('input[placeholder="Titel"]').setValue('Morning Run');
    await wrapper.find('input[placeholder="Distanz"]').setValue(10);
    await wrapper.find('input[placeholder="Beschreibung"]').setValue('Run in the park');
    await wrapper.find('input[placeholder="Status"]').setValue(true);

    await wrapper.find('button').trigger('click');

    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/todolauf`,
      {
        datum: '2021-08-01',
        art: 'Joggen',
        titel: 'Morning Run',
        distanz: 10,
        beschreibung: 'Run in the park',
        status: 'true'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // expect(router.currentRoute.value.name).not.toBe('Startseite Laufer');
  });
});
