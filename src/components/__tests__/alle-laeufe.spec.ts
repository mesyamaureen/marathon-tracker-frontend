import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ItemBox from '@/components/lauf-item.vue';
import AlleLaeufe from "../lauf/alle-laeufe.vue";

describe("alle-laeufe", () => {
  const mockedAxios = vi.mocked(axios, true);

  type todoLauf = {
    id?: number
    titel: string
    datum: Date
    art: string
    distanz: number
    beschreibung: string
    status: boolean
  }

  const currentWeekToDoLäufe: todoLauf[] = [
    {
      id: 1,
      titel: "Lauf 1",
      datum: new Date("2021-08-01"),
      art: "Joggen",
      distanz: 10,
      beschreibung: "Joggen im Park",
      status: false,
    },
    {
      id: 2,
      titel: "Lauf 2",
      datum: new Date("2021-08-02"),
      art: "Joggen",
      distanz: 5,
      beschreibung: "Joggen im Park",
      status: false,
    },
    {
      id: 3,
      titel: "Lauf 3",
      datum: new Date("2021-08-03"),
      art: "Joggen",
      distanz: 15,
      beschreibung: "Joggen im Park",
      status: false,
    },
  ];

  beforeEach(() => {
    vi.mock('axios');
  });

  it("should handle empty list", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    const wrapper = mount(AlleLaeufe, { props: { title: 'test' } });
    await flushPromises();
    expect(wrapper.findAllComponents(ItemBox).length).toBe(0);
    expect(wrapper.find('#itembox').exists()).toBe(false);
  });

  it("should render all laufe", async () => {
    mockedAxios.get.mockResolvedValue({ data: currentWeekToDoLäufe });
    const wrapper = mount(AlleLaeufe, { props: { title: 'test' } });
    await flushPromises();
    await wrapper.vm.$nextTick();
    console.log(wrapper.html());
    expect(wrapper.findAllComponents(ItemBox).length).toBe(currentWeekToDoLäufe.length);
    expect(wrapper.text()).toContain('To Do Läufe');
    expect(wrapper.text()).toContain('Lauf 2');
    expect(wrapper.text()).toContain('Joggen');
    expect(wrapper.text()).toContain('5');
    expect(wrapper.text()).toContain('Joggen im Park');
  });

  it("should emit an event when a lauf is clicked", async () => {
    mockedAxios.get.mockResolvedValue({ data: currentWeekToDoLäufe });
    const wrapper = mount(AlleLaeufe, { props: { title: 'test' } });
    await flushPromises();
    await wrapper.vm.$nextTick();
    const itemBox = wrapper.findComponent(ItemBox);
    console.log(itemBox.html());
    itemBox.find('button').trigger('click');
    expect(itemBox.emitted()).toHaveProperty('edit');
  });
});