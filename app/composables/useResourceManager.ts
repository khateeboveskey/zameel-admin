/**
 * Generic resource manager composable for CRUD operations
 * Provides consistent create, update, delete functionality with toast notifications
 */
export const useResourceManager = <T extends { id?: number; name?: string }>(
  resourceName: string,
  endpoints: {
    list?: string;
    search?: string;
    create: string;
    update: (id: number) => string;
    delete: (id: number) => string;
  },
  options: {
    searchMethod?: 'GET' | 'POST';
    deleteMethod?: 'DELETE' | 'PATCH';
    messages?: {
      create?: { success?: string; error?: string };
      update?: { success?: string; error?: string };
      delete?: { success?: string; error?: string };
    };
  } = {}
) => {
  const toast = useToast();
  const { searchMethod = 'POST', deleteMethod = 'DELETE', messages = {} } = options;

  // Default messages
  const defaultMessages = {
    create: {
      success: `تمت إضافة ${resourceName}`,
      error: `خطأ عند إضافة ${resourceName}`,
    },
    update: {
      success: `تم تحديث ${resourceName}`,
      error: `خطأ عند تحديث ${resourceName}`,
    },
    delete: {
      success: `تم حذف ${resourceName}`,
      error: `خطأ عند حذف ${resourceName}`,
    },
  };

  const finalMessages = {
    create: { ...defaultMessages.create, ...messages.create },
    update: { ...defaultMessages.update, ...messages.update },
    delete: { ...defaultMessages.delete, ...messages.delete },
  };

  /**
   * Create a new resource
   */
  const createResource = async (data: Partial<T>, onSuccess?: () => void) => {
    const { error } = await useCachedFetch<T>(endpoints.create, {
      method: 'POST',
      body: data,
    });

    if (error.value) {
      toast.add({
        title: finalMessages.create.error,
        description: error.value.message,
        color: 'error',
        icon: 'i-lucide-alert-triangle',
      });
      return { success: false, error: error.value };
    } else {
      const name = data.name || resourceName;
      toast.add({
        title: finalMessages.create.success,
        description: `تمت إضافة "${name}".`,
        color: 'success',
        icon: 'i-lucide-circle-check',
      });
      onSuccess?.();
      return { success: true };
    }
  };

  /**
   * Update an existing resource
   */
  const updateResource = async (id: number, data: Partial<T>, onSuccess?: () => void) => {
    const { error } = await useCachedFetch<T>(endpoints.update(id), {
      method: 'PATCH',
      body: data,
    });

    if (error.value) {
      toast.add({
        title: finalMessages.update.error,
        description: error.value.message,
        color: 'error',
        icon: 'i-lucide-alert-triangle',
      });
      return { success: false, error: error.value };
    } else {
      const name = data.name || resourceName;
      toast.add({
        title: finalMessages.update.success,
        description: `تم تحديث "${name}".`,
        color: 'success',
        icon: 'i-lucide-circle-check',
      });
      onSuccess?.();
      return { success: true };
    }
  };

  /**
   * Delete a resource
   */
  const deleteResource = async (id: number, name?: string, onSuccess?: () => void) => {
    const { error } = await useCachedFetch<T>(endpoints.delete(id), {
      method: deleteMethod,
    });

    if (error.value) {
      toast.add({
        title: finalMessages.delete.error,
        description: error.value.message,
        color: 'error',
        icon: 'i-lucide-alert-triangle',
      });
      return { success: false, error: error.value };
    } else {
      toast.add({
        title: finalMessages.delete.success,
        description: name ? `تم حذف "${name}".` : `تم حذف ${resourceName}.`,
        color: 'success',
        icon: 'i-lucide-circle-check',
      });
      onSuccess?.();
      return { success: true };
    }
  };

  /**
   * Fetch resources with optional search/filter parameters
   */
  const fetchResources = async <R>(
    endpoint: string,
    params: {
      filters?: any[];
      page?: number;
      searchTerm?: string;
      [key: string]: any;
    } = {}
  ) => {
    const { filters, page, searchTerm, ...otherParams } = params;
    
    if (endpoint.includes('search')) {
      return await useCachedFetch<IPaginatedFetchResponse<R>>(endpoint, {
        method: searchMethod,
        body: {
          filters: filters || [],
          page,
          ...otherParams,
        },
      });
    } else {
      return await useCachedFetch<IPaginatedFetchResponse<R>>(endpoint, {
        params: {
          page,
          search: searchTerm,
          ...otherParams,
        },
      });
    }
  };

  return {
    createResource,
    updateResource,
    deleteResource,
    fetchResources,
  };
};