import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Modal from '@/components/lauf-item.vue';

describe("modal", () => {
  const mockedAxios = vi.mocked(axios, true);

  beforeEach(() => {
    vi.mock('axios');
  });

  it("should emit an event when a modal is clicked", async () => {
    mockedAxios.get.mockResolvedValue({ data: []});
    const wrapper = mount(Modal);
    await flushPromises();
    await wrapper.vm.$nextTick();
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('edit');
  });
});