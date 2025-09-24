/**
 * Modal state management composable
 * Provides consistent modal open/close state management
 */
export const useModalState = () => {
  const addModalOpen = ref(false);
  const editModalOpen = ref(false);
  const deleteModalOpen = ref(false);

  const openAddModal = () => {
    addModalOpen.value = true;
  };

  const closeAddModal = () => {
    addModalOpen.value = false;
  };

  const openEditModal = (resetFn?: () => void) => {
    editModalOpen.value = false;
    nextTick(() => {
      resetFn?.();
      editModalOpen.value = true;
    });
  };

  const closeEditModal = () => {
    editModalOpen.value = false;
  };

  const openDeleteModal = (resetFn?: () => void) => {
    deleteModalOpen.value = false;
    nextTick(() => {
      resetFn?.();
      deleteModalOpen.value = true;
    });
  };

  const closeDeleteModal = () => {
    deleteModalOpen.value = false;
  };

  const closeAllModals = () => {
    addModalOpen.value = false;
    editModalOpen.value = false;
    deleteModalOpen.value = false;
  };

  return {
    // State
    addModalOpen,
    editModalOpen,
    deleteModalOpen,
    
    // Actions
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    closeAllModals,
  };
};