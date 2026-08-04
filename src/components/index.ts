/**
 * Centralized component exports
 * This file provides a single entry point for importing components
 */

// Layout Components
export { default as Footer } from './layout/Footer';
export { default as Header } from './layout/Header';

// Auth Components
export { AuthCard, AuthFormLayout, AuthHeader, AuthLogo, ProtectedRoute } from './auth';

// UI Components
export { Button } from './ui/button';
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
export { Input } from './ui/input';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Common Components
export { default as Location } from './common/Location';
export { default as RouteProgress } from './common/RouteProgress';

// Navigation Components
export { default as LanguageToggle } from './navigation/LanguageToggle';
export { default as NavLink } from './navigation/NavLink';
export { default as ReserveButton } from './navigation/ReserveButton';

