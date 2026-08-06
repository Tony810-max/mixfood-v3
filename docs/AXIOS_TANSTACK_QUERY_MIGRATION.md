# Axios + TanStack Query Migration Guide

## Overview
This document describes the migration from fetch-based API calls to Axios + TanStack Query for better data fetching and state management.

## Changes Made

### 1. Dependencies
- Added `axios` for HTTP client
- TanStack Query already available (`@tanstack/react-query`)

### 2. Axios Instance (`src/lib/axios.ts`)
Created centralized axios instance with:
- Base URL configuration
- Request interceptors for auth token injection
- Response interceptors for error handling
- Automatic token refresh on 401 errors
- Consistent error handling and logging

### 3. Service Layer Refactoring
**Before (fetch-based):**
```typescript
export const reservationService = {
  create(payload: CreateReservationPayload) {
    return apiRequest<ReservationResponse>("/reservations", {
      method: "POST",
      body: payload,
    });
  },
};
```

**After (axios-based):**
```typescript
import axios from '@/lib/axios';

export const reservationService = {
  async create(payload: CreateReservationPayload): Promise<ReservationResponse> {
    const response = await axios.post<ReservationResponse>("/reservations", payload);
    return response.data;
  },
};
```

### 4. TanStack Query Hooks
Created dedicated hooks in `src/hooks/api/`:

#### `useAuth.ts`
- `useLogin()` - Login mutation
- `useRegister()` - Register mutation  
- `useSendRegistrationCode()` - Send OTP code mutation
- `useLogout()` - Logout mutation

#### `useReservations.ts`
- `useMyReservations()` - Fetch user reservations query
- `useCreateReservation()` - Create reservation mutation
- `useInvalidateReservations()` - Invalidate reservations cache

#### `useUser.ts`
- `useUpdateProfile()` - Update profile mutation
- `useChangePassword()` - Change password mutation

### 5. Component Updates
Updated components to use TanStack Query hooks:

**BookingForm:**
```typescript
// Before
import { reservationService } from "@/services/reservation.service";
await reservationService.create(payload);

// After
import { useCreateReservation } from "@/hooks/api/useReservations";
const createReservation = useCreateReservation();
await createReservation.mutateAsync(payload);
```

**useReservations Hook:**
```typescript
// Before (manual state management)
const [reservations, setReservations] = useState<Reservation[]>([]);
const [isLoading, setIsLoading] = useState(true);
await reservationService.getMyReservations();

// After (TanStack Query)
const { data: reservations = [], isLoading } = useMyReservations();
```

**AuthContext:**
- Simplified to only manage user state
- Removed login/logout logic (now handled by hooks)
- Exposed `setUser` for components to update user data

### 6. Benefits of Migration

#### Axios Benefits:
- Automatic JSON parsing
- Request/response interceptors
- Timeout handling
- Better error handling
- Request cancellation support
- Automatic token refresh

#### TanStack Query Benefits:
- Automatic caching and background refetching
- Optimistic updates
- Loading states management
- Error handling and retry logic
- Deduplication of requests
- Offline/online detection
- Pagination support
- Infinite scrolling support

## File Structure

```
src/
├── lib/
│   └── axios.ts              # Axios instance with interceptors
├── hooks/
│   ├── api/
│   │   ├── useAuth.ts        # Auth mutations
│   │   ├── useReservations.ts # Reservation queries/mutations
│   │   └── useUser.ts        # User mutations
│   └── useReservations.ts     # Custom hook using TanStack Query
└── services/
    ├── api.ts                 # Legacy fetch-based (kept for reference)
    ├── auth.service.ts        # Updated to use axios
    ├── reservation.service.ts # Updated to use axios
    └── user.service.ts         # Updated to use axios
```

## Usage Examples

### Login
```typescript
import { useLogin } from '@/hooks/api/useAuth';

const LoginPage = () => {
  const loginMutation = useLogin();
  
  const handleLogin = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ payload: { email, password }, remember: true });
    // Success/error handling is automatic
  };
};
```

### Fetch Reservations
```typescript
import { useMyReservations } from '@/hooks/api/useReservations';

const ReservationsPage = () => {
  const { data: reservations, isLoading, error } = useMyReservations();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  
  return <ReservationList reservations={reservations} />;
};
```

### Create Reservation
```typescript
import { useCreateReservation } from '@/hooks/api/useReservations';

const BookingForm = () => {
  const createReservation = useCreateReservation();
  
  const handleSubmit = async (data: BookingData) => {
    await createReservation.mutateAsync(data);
    // Toast notification is automatic
  };
};
```

## Testing

### Test Checklist:
- [ ] Login flow works correctly
- [ ] Registration flow works correctly  
- [ ] Token refresh works on 401 errors
- [ ] Reservations are fetched and cached
- [ ] New reservations are created successfully
- [ ] Profile updates work correctly
- [ ] Password changes work correctly
- [ ] Error handling shows proper toast notifications
- [ ] Loading states display correctly
- [ ] Console logs show proper API calls

## Migration Notes

### Breaking Changes:
- AuthContext no longer has `login` and `logout` methods
- Components must use `useLogin`, `useLogout` hooks directly
- Services now return data directly (not wrapped in response)

### Backward Compatibility:
- Old `api.ts` file kept for reference
- Can gradually migrate remaining components
- AuthContext still exposes user state management

## Future Improvements

1. **Query Cache Configuration**: Add global TanStack Query client config
2. **Optimistic Updates**: Implement optimistic updates for better UX
3. **Infinite Queries**: Add infinite scrolling for large datasets
4. **Prefetching**: Prefetch data on hover/navigation
5. **Query Keys**: Standardize query key structure
6. **Error Boundaries**: Add error boundaries for better error isolation
7. **Retry Logic**: Configure automatic retry for failed requests
8. **Background Refetch**: Configure background refetch intervals