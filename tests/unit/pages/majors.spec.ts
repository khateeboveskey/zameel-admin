import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MajorsPage from '@/app/pages/majors.vue';

vi.mock('@/composables/useCachedFetch', () => ({ useCachedFetch: vi.fn(() => ({ data: { value: [] }, pending: false, refresh: vi.fn() })) }));
vi.mock('@/composables/useToast', () => ({ useToast: () => ({ add: vi.fn() }) }));
vi.mock('@/composables/toArabicDate', () => ({ toArabicDate: (d: any) => d }));
vi.mock('@/stores/degree', () => ({ useDegreeStore: () => ({}) }));

describe('Majors Page', () => {
  it('mounts without error', () => {
    const wrapper = mount(MajorsPage, {
      global: { stubs: ['UButton', 'UTable'] },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
