import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LaufItem from '@/components/lauf-item.vue';

describe("lauf-item", () => {
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

  const testLauf: todoLauf =
    {
      id: 1,
      titel: "Lauf 1",
      datum: new Date("2021-08-01"),
      art: "Joggen",
      distanz: 10,
      beschreibung: "Joggen im Park",
      status: false,
    };

  beforeEach(() => {
    vi.mock('axios');
  });

  it("should handle empty item", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    const wrapper = mount(LaufItem);
    await flushPromises();
    expect(wrapper.findAllComponents(LaufItem).length).toBe(0);
    expect(wrapper.find('#LaufItem').exists()).toBe(false);
  });

  it("should render all laufe", async () => {
    mockedAxios.get.mockResolvedValue({ data: testLauf });
    const defaultSlot = `
        <p style="padding: 20px 0 10px 0">${ testLauf.titel }</p>
        <p style="padding-top: 10px">${ testLauf.art }</p>
        <p style="padding-top: 10px">${ testLauf.distanz } km</p>
        <p style="padding-top: 10px">${ testLauf.beschreibung }</p>
        `
    const wrapper = mount(LaufItem, { props: { title: 'test' }, slots: { default: defaultSlot, heading: testLauf.datum.toDateString() }});
    await flushPromises();
    await wrapper.vm.$nextTick();
    console.log(wrapper.html());
    expect(wrapper.text()).toContain(testLauf.datum.toDateString());
    expect(wrapper.text()).toContain('Lauf 1');
    expect(wrapper.text()).toContain('Joggen');
    expect(wrapper.text()).toContain('10');
    expect(wrapper.text()).toContain('Joggen im Park');
  });

  it("should emit an event when a lauf item is clicked", async () => {
    mockedAxios.get.mockResolvedValue({ data: testLauf });
    const wrapper = mount(LaufItem);
    await flushPromises();
    await wrapper.vm.$nextTick();
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('edit');
  });
});