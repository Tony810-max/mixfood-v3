/**
 * TanStack Query hooks for menu data
 */

import { menuService } from '@/services/menu.service';
import { logger } from '@/utils/logger';
import { useQuery } from '@tanstack/react-query';

export const useMenu = () => {
  return useQuery({
    queryKey: ['menu', 'categories'],
    queryFn: () => {
      logger.info('[useMenu] Fetching menu data...');
      return menuService.getAllCategories();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menu', 'items'],
    queryFn: () => {
      logger.info('[useMenuItems] Fetching menu items...');
      return menuService.getAllMenuItems();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
