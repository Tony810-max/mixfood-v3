/**
 * TanStack Query hooks for reservations
 */

import { getApiErrorMessage } from '@/services/api';
import { reservationService } from '@/services/reservation.service';
import { CreateReservationPayload } from '@/types';
import { logger } from '@/utils/logger';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useMyReservations = (isAuthenticated: boolean = true) => {
  if (!isAuthenticated) {
    return {
      data: [],
      isLoading: false,
      error: null,
      isFetching: false,
      isSuccess: true,
      isError: false,
      refetch: () => Promise.resolve({ data: [] }),
    } as any;
  }

  const query = useQuery({
    queryKey: ['reservations', 'my'],
    queryFn: () => reservationService.getMyReservations(),
  });

  return query;
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReservationPayload) => 
      reservationService.create(payload),
    onSuccess: (data) => {
      logger.info('Reservation created successfully', { reservationId: data.reservation.id });
      toast.success('Đặt bàn thành công!', {
        description: 'Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận.',
      });
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      logger.error('Reservation creation failed', error);
      toast.error('Đặt bàn thất bại', {
        description: getApiErrorMessage(error),
      });
    },
  });
};

export const useInvalidateReservations = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ['reservations'] });
  };
};