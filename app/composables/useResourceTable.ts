/**
 * Resource table configuration composable
 * Provides consistent table setup and pagination management
 */
export const useResourceTable = <T extends { id: number }>(
  initialPageSize: number = 15
) => {
  const table = useTemplateRef('table');
  const currentPage = ref(1);

  // Pagination setup
  const pagination = reactive({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // Update pagination when page changes
  const updatePagination = (newPage: number) => {
    currentPage.value = newPage;
    pagination.pageIndex = newPage - 1;
  };

  // Reset to first page
  const resetToFirstPage = () => {
    currentPage.value = 1;
    pagination.pageIndex = 0;
  };

  // Watch pagination changes
  const watchPaginationChanges = (callback: () => void) => {
    watch(() => pagination.pageIndex, (newIndex) => {
      currentPage.value = newIndex + 1;
      callback();
    });
  };

  /**
   * Build common table columns for resources
   */
  const buildCommonColumns = (extraColumns: any[] = []): any[] => {
    return [
      {
        accessorKey: 'id',
        header: 'الرقم التعريفي',
        cell: ({ row }: any) => row.getValue('id'),
      },
      {
        accessorKey: 'name',
        header: 'الاسم',
        cell: ({ row }: any) => row.getValue('name'),
      },
      ...extraColumns,
      {
        accessorKey: 'created_at',
        header: 'تاريخ الإنشاء',
        cell: ({ row }: any) => toArabicDate(row.getValue('created_at')),
      },
      {
        accessorKey: 'updated_at',
        header: 'آخر تعديل',
        cell: ({ row }: any) => toArabicDate(row.getValue('updated_at')),
      },
      {
        accessorKey: 'actions',
        header: 'الإجراءات',
        cell: () => null,
      },
    ];
  };

  /**
   * Build action menu items
   */
  const buildActionItems = (onEdit: (item: T) => void, onDelete: (id: number) => void): any[] => [
    {
      label: 'تعديل',
      slot: 'edit-label',
      icon: 'i-lucide-edit',
      click: onEdit,
    },
    {
      label: 'حذف',
      slot: 'delete-label',
      icon: 'i-lucide-trash',
      click: onDelete,
    },
  ];

  /**
   * Common table UI configuration
   */
  const commonTableUI = {
    base: 'table-fixed border-separate border-spacing-0',
    thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
    tbody: '[&>tr]:last:[&>td]:border-b-0',
    td: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
    th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
  };

  return {
    // State
    table,
    currentPage,
    pagination,
    
    // Actions
    updatePagination,
    resetToFirstPage,
    watchPaginationChanges,
    
    // Builders
    buildCommonColumns,
    buildActionItems,
    
    // Configuration
    commonTableUI,
  };
};