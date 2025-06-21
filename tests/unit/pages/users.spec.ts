import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UsersPage from '@/app/pages/users.vue';

vi.mock('~/stores/role', () => ({ useRoleStore: () => ({ roles: [] }) }));
vi.mock('@/composables/useCachedFetch', () => ({ useCachedFetch: vi.fn(() => ({ data: { value: [] }, pending: false, refresh: vi.fn() })) }));
vi.mock('@/composables/useToast', () => ({ useToast: () => ({ add: vi.fn() }) }));
vi.mock('@/composables/debouncedRef', () => ({ debouncedRef: (v: any) => v }));
vi.mock('@/composables/toArabicDate', () => ({ toArabicDate: (d: any) => d }));


describe('Users Page', () => {
  it('mounts without error', () => {
    const wrapper = mount(UsersPage, {
      global: { stubs: ['UButton', 'UTable'] },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
