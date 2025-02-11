# Changelog

All notable changes to the Nexa project will be documented in this file.

## [Unreleased]

## [0.3.1] - 2024-03-19
### Added
- Completed Phase 3 (E-commerce) implementation
- Integrated Stripe payment processing
- Added shopping cart UI with real-time updates
- Implemented cart item management (add, remove, update quantities)
- Added Success and Cancel pages for payment flow
- Created Edge Function for secure payment processing

## [0.3.0] - 2024-03-19
### Added
- Started Phase 3 (E-commerce) implementation
- Set up products table with proper structure
- Created cart_items table with RLS policies
- Prepared database structure for shopping cart functionality

## [0.2.0] - 2024-03-19
### Added
- Completed Phase 2 (User Experience) implementation
- Simplified profile management to focus on username
- Added comprehensive error handling and loading states
- Enhanced user feedback with toast notifications

## [0.1.2] - 2024-03-19
### Added
- Implemented protected routes for authenticated users
- Added ProtectedRoute component with auth check
- Added toast notifications for unauthorized access attempts

## [0.1.1] - 2024-03-19
### Added
- Implemented password reset functionality
- Added ResetPassword and UpdatePassword pages
- Added toast notifications for password reset events

## [0.1.0] - 2024-03-19
### Added
- Initial project setup with Vite, React, TypeScript, and Tailwind CSS
- Integrated shadcn/ui components for modern UI elements
- Set up Supabase authentication
- Created responsive Navbar component
- Implemented user authentication (signup/login/logout)
- Created loginpage table with proper RLS policies
- Added toast notifications for auth events
- Basic routing structure with protected routes

### Fixed
- Resolved Supabase client configuration issues
- Fixed build errors related to incorrect imports
- Streamlined authentication flow

### Changed
- Disabled email confirmation for development purposes
- Updated navbar to display user email when logged in