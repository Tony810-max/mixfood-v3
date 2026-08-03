# Mix Food V3 - Refactor Documentation

## Overview
This document describes the comprehensive refactoring performed on the Mix Food V3 project to improve code maintainability, reduce duplication, and establish better architectural patterns.

## Refactoring Summary

### 1. Centralized Type Definitions (`src/types/index.ts`)
**Problem**: Type definitions were scattered across multiple files (AuthContext, services, components) leading to duplication and inconsistency.

**Solution**: Created a centralized types file containing:
- User & Auth types (User, LoginPayload, RegisterPayload, AuthResponse, etc.)
- Reservation types (Reservation, ReservationStatus, CreateReservationPayload, etc.)
- Menu types (MenuItem, Category, MenuItemTag)
- API types (ApiRequestOptions, ApiError)
- Storage types (StorageLocation)
- Restaurant info types (RestaurantInfo, BookingRule, GuestOption)

**Benefits**:
- Single source of truth for all types
- Easier to maintain and update
- Better type safety across the application
- Reduced duplication

### 2. Consolidated Constants (`src/constants/index.ts`)
**Problem**: Constants were scattered across multiple files with no central management.

**Solution**: Created a centralized constants file containing:
- Re-exported existing constants (SOCIAL_LINKS, THAI_DISHES, etc.)
- Booking-specific constants (BOOKING_TIME_SLOTS)
- Storage keys (STORAGE_KEYS)
- API configuration (API_CONFIG)
- Reservation status configuration (RESERVATION_STATUS, STATUS_COLORS)
- Date formatting options (DATE_FORMATS)
- Validation rules (VALIDATION)
- Error messages (ERROR_MESSAGES)

**Benefits**:
- Centralized configuration management
- Easy to update constants across the application
- Consistent error messages and validation rules
- Better organization

### 3. Logger Utility (`src/utils/logger.ts`)
**Problem**: Console.log statements were scattered throughout the codebase with no consistent logging approach.

**Solution**: Created a centralized logger utility with:
- Different log levels (debug, info, warn, error)
- Timestamps for all log entries
- Environment-aware logging (debug logs skipped in production)
- Consistent log formatting
- Context support for structured logging

**Benefits**:
- Professional logging approach
- Easy to disable/enable logs based on environment
- Better debugging capabilities
- Consistent log format across the application

### 4. Enhanced Formatters (`src/utils/formatters.ts`)
**Problem**: Limited formatting utilities with only phone and verification code formatters.

**Solution**: Enhanced formatters utility with:
- Existing formatters (formatPhoneNumber, formatVerificationCode)
- New formatters:
  - formatCurrency (VND formatting)
  - formatNumber (number with commas)
  - truncateText (text truncation)
  - capitalizeFirst (string capitalization)
  - formatFileSize (human-readable file sizes)
- Error handling for all formatters
- Integration with logger for error tracking

**Benefits**:
- Comprehensive formatting utilities
- Error handling prevents crashes
- Consistent formatting across the app
- Reusable functions

### 5. Custom Hooks
**Problem**: Business logic was scattered across components with no reusability.

**Solution**: Created custom hooks:

#### `useDateFormat` Hook
- Centralized date formatting logic
- Consistent date/time formatting
- Utility functions (isToday, isFutureDate, isPastDate)
- Locale support

#### `useReservations` Hook
- Centralized reservation management
- Filtering and sorting logic
- Statistics calculation
- Data fetching with error handling
- Reusable across components

**Benefits**:
- Reusable business logic
- Cleaner components
- Better separation of concerns
- Easier testing

### 6. Services Layer Refactoring
**Problem**: Services had duplicated logic and inconsistent patterns.

**Solution**:
- Removed type definitions from services (now use centralized types)
- Replaced hardcoded strings with constants (STORAGE_KEYS)
- Replaced hardcoded error messages with ERROR_MESSAGES
- Integrated logger for better debugging
- Standardized API configuration usage

**Benefits**:
- Consistent service patterns
- Better error handling
- Easier maintenance
- Reduced duplication

### 7. Fixed React Hooks Violations
**Problem**: `pages/Booking/utils/const.ts` was calling React hooks outside of components, violating React rules.

**Solution**:
- Refactored functions to accept translation parameters instead of calling hooks
- Updated components to pass translations to these functions
- Maintained functionality while following React best practices

**Benefits**:
- No React hooks violations
- Better component architecture
- More testable utility functions
- Follows React best practices

### 8. Component Organization
**Problem**: No centralized import structure for components and hooks.

**Solution**:
- Created `src/components/index.ts` for centralized component exports
- Created `src/hooks/index.ts` for centralized hook exports
- Barrels exports for better import organization

**Benefits**:
- Cleaner imports
- Better organization
- Easier to find components/hooks
- Consistent import patterns

### 9. Context Updates
**Problem**: Contexts used hardcoded strings and scattered type definitions.

**Solution**:
- Updated AuthContext to use centralized User type
- Replaced hardcoded storage keys with STORAGE_KEYS constants
- Improved error handling with logger integration

**Benefits**:
- Consistent type usage
- Centralized configuration
- Better error tracking

## File Structure Changes

### New Files Created:
```
src/
├── types/
│   └── index.ts              # Centralized type definitions
├── constants/
│   └── index.ts              # Centralized constants
├── hooks/
│   ├── useDateFormat.ts      # Date formatting hook
│   ├── useReservations.ts    # Reservation management hook
│   └── index.ts              # Centralized hook exports
├── utils/
│   ├── logger.ts             # Logging utility
│   └── formatters.ts         # Enhanced formatting utilities
└── components/
    └── index.ts              # Centralized component exports
```

### Files Modified:
- `src/services/api.ts` - Use centralized types and constants
- `src/services/auth.service.ts` - Use centralized types and constants
- `src/services/user.service.ts` - Use centralized types and logger
- `src/services/reservation.service.ts` - Use centralized types
- `src/contexts/AuthContext.tsx` - Use centralized types and constants
- `src/pages/Booking/utils/const.ts` - Fixed React hooks violations
- `src/pages/Booking/BookingInfoCards.tsx` - Updated to use refactored utils
- `src/pages/Booking/BookingRules.tsx` - Updated to use refactored utils
- `src/pages/Menu/utils/const.ts` - Use centralized types
- `src/pages/Reservations/index.tsx` - Use custom hooks and constants

## Migration Guide

### For Developers:

#### Import Changes:
**Before:**
```typescript
import { User } from '@/contexts/AuthContext';
import { LoginPayload } from '@/services/auth.service';
```

**After:**
```typescript
import { User, LoginPayload } from '@/types';
```

#### Using Constants:
**Before:**
```typescript
localStorage.getItem('mixfood.access-token');
```

**After:**
```typescript
import { STORAGE_KEYS } from '@/constants';
localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
```

#### Using Logger:
**Before:**
```typescript
console.log('Debug info', data);
console.error('Error occurred', error);
```

**After:**
```typescript
import { logger } from '@/utils/logger';
logger.debug('Debug info', data);
logger.error('Error occurred', error);
```

#### Using Custom Hooks:
**Before:**
```typescript
// Component logic for reservations
const [reservations, setReservations] = useState([]);
// ... complex logic
```

**After:**
```typescript
import { useReservations } from '@/hooks';
const { reservations, stats, filterReservations } = useReservations();
```

## Benefits Achieved

1. **Maintainability**: Centralized types and constants make updates easier
2. **Consistency**: Standardized patterns across the codebase
3. **Type Safety**: Better type coverage with centralized types
4. **Debugging**: Professional logging with structured output
5. **Reusability**: Custom hooks for common business logic
6. **Error Handling**: Consistent error messages and handling
7. **Code Quality**: Fixed React hooks violations and lint errors
8. **Organization**: Better file structure and import patterns

## Testing Recommendations

1. Test all authentication flows (login, logout, registration)
2. Test reservation creation and management
3. Test date formatting across different locales
4. Test error handling and logging
5. Test responsive design on mobile devices
6. Test language switching functionality

## Future Improvements

1. **Testing**: Add unit tests for custom hooks and utilities
2. **API Client**: Consider using a more robust API client (axios, ky)
3. **State Management**: Consider implementing a state management solution (Zustand, Redux)
4. **Error Boundaries**: Add React error boundaries for better error handling
5. **Performance**: Implement code splitting and lazy loading
6. **Accessibility**: Improve ARIA labels and keyboard navigation
7. **Internationalization**: Extract all hardcoded strings to translation files

## Conclusion

This refactoring significantly improves the codebase's maintainability, consistency, and scalability. The centralized approach to types, constants, and utilities provides a solid foundation for future development while reducing technical debt.