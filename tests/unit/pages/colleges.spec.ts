import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CollegesPage from '@/app/pages/colleges.vue';

vi.mock('@/composables/useCachedFetch', () => ({ useCachedFetch: vi.fn(() => ({ data: { value: [] }, pending: false, refresh: vi.fn() })) }));
vi.mock('@/composables/useToast', () => ({ useToast: () => ({ add: vi.fn() }) }));
vi.mock('@/composables/toArabicDate', () => ({ toArabicDate: (d: any) => d }));


describe('Colleges Page', () => {
  it('mounts without error', () => {
    const wrapper = mount(CollegesPage, {
      global: { stubs: ['UButton', 'UTable'] },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
