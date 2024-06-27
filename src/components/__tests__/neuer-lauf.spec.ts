import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import NeuerLauf from '@/components/lauf/neuer-lauf.vue';
// import { jest } from '@jest/globals';

// TODO: Create a new unit test for NeuerToDoLauf.vue
beforeEach(() => {
  vi.mock('axios');
});

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'Startseite Laufer', component: { template: '<div>Startseite</div>' } }]
});

describe('NeuerLauf.vue', () => {
  it('should create a new Lauf and navigate to Startseite Laufer on success', async () => {
    const mockResponse = { data: 'Success' };
    (axios.post as any).mockResolvedValue(mockResponse);

    const wrapper = mount(NeuerLauf, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Create a new Lauf'
      }
    });

    await wrapper.find('input[placeholder="Datum"]').setValue('2022-09-02');
    await wrapper.find('input[placeholder="Art"]').setValue('Jogging');
    await wrapper.find('input[placeholder="Titel"]').setValue('Night Run');
    await wrapper.find('input[placeholder="Distanz"]').setValue(11);
    await wrapper.find('input[placeholder="Zeit"]').setValue("00:45:00");
    await wrapper.find('input[placeholder="Gefuehl"]').setValue("Gut");
    await wrapper.find('input[placeholder="Aufwand"]').setValue(3);
    await wrapper.find('input[placeholder="Beschreibung"]').setValue('Easy run in the park');
    await wrapper.find('input[placeholder="Schmerz"]').setValue('No pain');

    await wrapper.find('button').trigger('click');

    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/lauf`,
      {
        datum: new Date('2022-09-02').toLocaleDateString("en-CA"),
        art: 'Jogging',
        titel: 'Night Run',
        distanz: 11,
        zeit: "00:45:00",
        gefuehl: "Gut",
        aufwand: 3,
        beschreibung: 'Easy run in the park',
        schmerz: 'No pain',
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

    const wrapper = mount(NeuerLauf, {
      global: {
        plugins: [router]
      },
      props: {
        title: 'Create a new Lauf'
      }
    });

    await wrapper.find('input[placeholder="Datum"]').setValue('2022-09-02');
    await wrapper.find('input[placeholder="Art"]').setValue('Jogging');
    await wrapper.find('input[placeholder="Titel"]').setValue('Night Run');
    await wrapper.find('input[placeholder="Distanz"]').setValue(11);
    await wrapper.find('input[placeholder="Zeit"]').setValue("00:45:00");
    await wrapper.find('input[placeholder="Gefuehl"]').setValue("Gut");
    await wrapper.find('input[placeholder="Aufwand"]').setValue(3);
    await wrapper.find('input[placeholder="Beschreibung"]').setValue('Easy run in the park');
    await wrapper.find('input[placeholder="Schmerz"]').setValue('No pain');

    await wrapper.find('button').trigger('click');

    await flushPromises();

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/lauf`,
      {
        datum: new Date('2022-09-02').toLocaleDateString("en-CA"),
        art: 'Jogging',
        titel: 'Night Run',
        distanz: 11,
        zeit: "00:45:00",
        gefuehl: "Gut",
        aufwand: 3,
        beschreibung: 'Easy run in the park',
        schmerz: 'No pain',
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  });
});