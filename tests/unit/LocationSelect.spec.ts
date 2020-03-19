import { shallowMount, mount } from '@vue/test-utils';
import LocationSelect from '@/components/LocationSelect.vue';
import { mockLocation } from './mockData/location';
import Vue from 'vue';

const selectors = {
  checkButton: '.location-select__button',
};

describe('LocationSelect.vue', () => {
  it('check button is hidden if location is not selected', () => {
    const wrapper = shallowMount(LocationSelect);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.contains(selectors.checkButton)).toBe(false);
  });

  it('check button is visible if location is selected', async () => {
    const wrapper = mount(LocationSelect);
    wrapper.setData({ selected: mockLocation });
    await Vue.nextTick();
    expect(wrapper.contains(selectors.checkButton)).toBe(true);
  });
});
