/**
 * Search and filter management composable
 * Provides consistent search functionality with debouncing and filters
 */
export const useSearchAndFilter = (
  debounceMs: number = 1000,
  options: {
    enableAdvancedFilters?: boolean;
    filterFields?: string[];
  } = {}
) => {
  const { enableAdvancedFilters = false, filterFields = ['name'] } = options;

  // Search state
  const searchTerm = ref('');
  const debouncedSearchTerm = debouncedRef(searchTerm, debounceMs);

  // Advanced filters state (for complex search like users page)
  const advancedFilters = reactive<Record<string, any>>({});

  // Clear search
  const clearSearch = () => {
    searchTerm.value = '';
  };

  // Reset all filters
  const resetFilters = () => {
    searchTerm.value = '';
    Object.keys(advancedFilters).forEach(key => {
      advancedFilters[key] = null;
    });
  };

  /**
   * Build filters array for API calls
   */
  const buildFilters = (customFilters: any[] = []) => {
    const filterArr: any[] = [...customFilters];

    // Add search term filters
    if (debouncedSearchTerm.value && filterFields.length > 0) {
      const searchFilters = filterFields.map(field => ({
        type: 'or',
        field,
        operator: 'like',
        value: `%${debouncedSearchTerm.value}%`,
      }));
      filterArr.push(...searchFilters);
    }

    // Add advanced filters if enabled
    if (enableAdvancedFilters) {
      Object.entries(advancedFilters).forEach(([key, value]) => {
        if (value != null && value !== '') {
          if (Array.isArray(value) && value.length > 0) {
            filterArr.push({
              type: 'and',
              field: key,
              operator: 'in',
              value: value.map((item: any) => item.id || item),
            });
          } else if (typeof value === 'boolean') {
            filterArr.push({
              type: 'and',
              field: key,
              operator: value ? '!=' : '=',
              value: null,
            });
          } else {
            filterArr.push({
              type: 'and',
              field: key,
              operator: '=',
              value,
            });
          }
        }
      });
    }

    return filterArr.length ? [{ type: 'and', nested: filterArr }] : [];
  };

  /**
   * Watch for search changes and trigger callback
   */
  const watchSearchChanges = (callback: () => void, watchAdvanced: boolean = false) => {
    const watchSources = [debouncedSearchTerm];
    if (watchAdvanced && enableAdvancedFilters) {
      watchSources.push(...Object.keys(advancedFilters).map(key => toRef(advancedFilters, key)));
    }

    watch(watchSources, callback);
  };

  return {
    // State
    searchTerm,
    debouncedSearchTerm,
    advancedFilters,
    
    // Actions
    clearSearch,
    resetFilters,
    buildFilters,
    watchSearchChanges,
  };
};