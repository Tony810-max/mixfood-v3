/**
 * TanStack Query hooks for reservations
 */

import { reservationService } from '@/services/reservation.service';
import { CreateReservationPayload, Reservation } from '@/types';
import { logger } from '@/utils/logger';
import { showApiErrorToast, showOperationSuccess } from '@/utils/toastHelpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type UseQueryResult<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => Promise<unknown>;
};

export const useMyReservations = (isAuthenticated: boolean = true) => {
  const query = useQuery({
    queryKey: ['reservations', 'my'],
    queryFn: () => reservationService.getMyReservations(),
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return {
      data: [],
      isLoading: false,
      error: null,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: () => Promise.resolve({ data: [] }),
    } as UseQueryResult<Reservation[]>;
  }

  return query;
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReservationPayload) => 
      reservationService.create(payload),
    onSuccess: (data) => {
      logger.info('Reservation created successfully', { reservationId: data.reservation.id });
      showOperationSuccess('createReservation');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      logger.error('Reservation creation failed', error);
      showApiErrorToast(error, 'Đặt bàn thất bại');
    },
  });
};

export const useInvalidateReservations = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ['reservations'] });
  };
};