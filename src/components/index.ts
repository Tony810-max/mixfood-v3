/**
 * Centralized component exports
 * This file provides a single entry point for importing components
 */

// Layout Components
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';

// Auth Components
export { default as ProtectedRoute } from './auth/ProtectedRoute';

// UI Components
export { Button } from './ui/button';
export { Input } from './ui/input';
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

// Common Components
export { default as Location } from './common/Location';
export { default as RouteProgress } from './common/RouteProgress';

// Navigation Components
export { default as LanguageToggle } from './navigation/LanguageToggle';
export { default as NavLink } from './navigation/NavLink';
export { default as ReserveButton } from './navigation/ReserveButton';