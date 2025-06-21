import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SubjectsPage from '@/app/pages/subjects.vue';

vi.mock('@/composables/useCachedFetch', () => ({ useCachedFetch: vi.fn(() => ({ data: { value: [] }, pending: false, refresh: vi.fn() })) }));
vi.mock('@/composables/useToast', () => ({ useToast: () => ({ add: vi.fn() }) }));
vi.mock('@/composables/toArabicDate', () => ({ toArabicDate: (d: any) => d }));


describe('Subjects Page', () => {
  it('mounts without error', () => {
    const wrapper = mount(SubjectsPage, {
      global: { stubs: ['UButton', 'UTable'] },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
