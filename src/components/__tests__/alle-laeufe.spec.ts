import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ItemBox from '@/components/lauf-item.vue';
import AlleLaeufe from "../lauf/alle-laeufe.vue";

describe("alle-laeufe", () => {
  const mockedAxios = vi.mocked(axios, true);

  beforeEach(() => {
    vi.mock('axios');
  });

  it("should handle empty list", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    const wrapper = mount(AlleLaeufe, { props: { title: 'test' } });
    await flushPromises();
    expect(wrapper.findAllComponents(ItemBox).length).toBe(0);
    expect(wrapper.text()).toContain('To Do Läufe');
    expect(wrapper.find('#itembox').exists()).toBe(false);
  });
});