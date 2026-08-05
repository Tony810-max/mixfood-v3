/**
 * Custom hook for reservation management using TanStack Query
 * Provides reservation data and operations
 */

import { RESERVATION_STATUS } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { useInvalidateReservations, useMyReservations } from '@/hooks/api/useReservations';
import { Reservation } from '@/types';
import { useMemo } from 'react';

export const useReservations = () => {
  const { isAuthenticated } = useAuth();
  const { data: reservations = [], isLoading, error } = useMyReservations(isAuthenticated);
  const invalidateReservations = useInvalidateReservations();

  console.log('[useReservations] Hook state:', {
    isAuthenticated,
    isLoading,
    error,
    reservationsCount: reservations?.length,
  });

  // Ensure reservations is always an array
  const safeReservations = useMemo(() => {
    return Array.isArray(reservations) ? reservations : [];
  }, [reservations]);

  const stats = useMemo(() => {
    return {
      total: safeReservations.length,
      pending: safeReservations.filter(r => r.status === RESERVATION_STATUS.PENDING).length,
      confirmed: safeReservations.filter(r => r.status === RESERVATION_STATUS.CONFIRMED).length,
      cancelled: safeReservations.filter(r => r.status === RESERVATION_STATUS.CANCELLED).length,
    };
  }, [safeReservations]);

  const filterReservations = useMemo(() => {
    return (status?: string, searchQuery?: string) => {
      let filtered = safeReservations;

      if (status && status !== 'ALL') {
        filtered = filtered.filter(r => r.status === status);
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(r => 
          r.name.toLowerCase().includes(query) ||
          r.phone.includes(query) ||
          r.note?.toLowerCase().includes(query)
        );
      }

      return filtered;
    };
  }, [safeReservations]);

  const sortReservations = useMemo(() => {
    return (reservationsToSort: Reservation[], sortBy: 'date-desc' | 'date-asc' | 'status') => {
      const sorted = [...reservationsToSort];
      
      return sorted.sort((a, b) => {
        const dateA = new Date(a.reservationDate);
        const dateB = new Date(b.reservationDate);
        
        switch (sortBy) {
          case 'date-asc':
            return dateA.getTime() - dateB.getTime();
          case 'date-desc':
            return dateB.getTime() - dateA.getTime();
          case 'status':
            return a.status.localeCompare(b.status);
          default:
            return dateB.getTime() - dateA.getTime();
        }
      });
    };
  }, []);

  return {
    reservations: safeReservations,
    isLoading: isAuthenticated ? isLoading : false,
    error,
    stats,
    filterReservations,
    sortReservations,
    refreshReservations: invalidateReservations,
  };
};