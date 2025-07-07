import { useState, useCallback } from 'react';

/**
 * Custom hook for managing accordion state
 * @param {boolean} multiple - Whether multiple items can be open at once
 * @param {Array} defaultOpen - Array of item IDs that should be open by default
 */
export const useAccordion = (multiple = false, defaultOpen = []) => {
  const [openItems, setOpenItems] = useState(new Set(defaultOpen));

  const toggleItem = useCallback((itemId) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(itemId)) {
        // Close the item
        newSet.delete(itemId);
      } else {
        // Open the item
        if (!multiple) {
          // If not multiple, clear all others first
          newSet.clear();
        }
        newSet.add(itemId);
      }
      
      return newSet;
    });
  }, [multiple]);

  const isOpen = useCallback((itemId) => {
    return openItems.has(itemId);
  }, [openItems]);

  const openItem = useCallback((itemId) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (!multiple) {
        newSet.clear();
      }
      newSet.add(itemId);
      return newSet;
    });
  }, [multiple]);

  const closeItem = useCallback((itemId) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  const closeAll = useCallback(() => {
    setOpenItems(new Set());
  }, []);

  const openAll = useCallback((itemIds) => {
    if (multiple) {
      setOpenItems(new Set(itemIds));
    }
  }, [multiple]);

  return {
    openItems,
    toggleItem,
    isOpen,
    openItem,
    closeItem,
    closeAll,
    openAll
  };
};