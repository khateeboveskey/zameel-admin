import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import GroupsPage from '@/app/pages/groups.vue';

vi.mock('@/composables/useCachedFetch', () => ({ useCachedFetch: vi.fn(() => ({ data: { value: [] }, pending: false, refresh: vi.fn() })) }));
vi.mock('@/composables/useToast', () => ({ useToast: () => ({ add: vi.fn() }) }));
vi.mock('@/composables/debouncedRef', () => ({ debouncedRef: (v: any) => v }));
vi.mock('@/composables/toArabicDate', () => ({ toArabicDate: (d: any) => d }));

describe('Groups Page', () => {
  it('mounts without error', () => {
    const wrapper = mount(GroupsPage, {
      global: { stubs: ['UButton', 'UTable'] },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
