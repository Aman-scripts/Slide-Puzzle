# Monad Puzzle - Sliding Puzzle Game

## Overview

A browser-based sliding puzzle game built with React, featuring a Monad-themed artwork that players must solve by sliding tiles. The application offers three difficulty levels (3x3, 4x4, and 5x5 grids) with move tracking, timer functionality, and audio feedback.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**State Management**: Zustand for global state management with three primary stores:
- `usePuzzle` - Manages puzzle state, tile positions, game logic, and difficulty settings
- `useAudio` - Handles audio playback for hit sounds and success notifications
- `useGame` - Controls game phase transitions (ready, playing, ended)

**Routing**: Single-page application with phase-based rendering (menu, playing, completed) rather than traditional routing.

**UI Components**: Radix UI primitives with custom styling, providing accessible and composable components through a comprehensive UI library in `client/src/components/ui/`.

**Styling**: Tailwind CSS with custom design tokens for Monad brand colors (blue, purple, berry, off-white, black) defined in CSS variables.

**Design Pattern**: Component-based architecture with separation of concerns:
- Game logic isolated in Zustand stores
- Presentation components consume store state
- Reusable UI primitives for consistent design

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Architecture Pattern**: Minimal REST API server with placeholder route registration system. The backend is set up to serve the Vite-built frontend in production and proxy to Vite dev server in development.

**Storage Layer**: Abstract storage interface (`IStorage`) with in-memory implementation (`MemStorage`) for user data. The interface is designed to be swapped with a database-backed implementation without changing application logic.

**Development vs Production**: 
- Development: Vite middleware integrated with Express for HMR and asset serving
- Production: Static file serving of pre-built assets from `dist/public`

### Data Storage

**Database ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver.

**Schema Management**: Schema defined in `shared/schema.ts` with a users table including basic authentication fields (username, password). Uses Drizzle-Zod for runtime validation schemas.

**Migration Strategy**: Drizzle Kit handles schema migrations with files output to `./migrations` directory.

**Connection**: Database URL expected via `DATABASE_URL` environment variable, utilizing Neon's serverless PostgreSQL offering for production deployments.

**Current State**: Database schema defined but not actively used; application currently runs with in-memory storage for game state.

### External Dependencies

**Database**: Neon serverless PostgreSQL (via `@neondatabase/serverless`)
- Serverless PostgreSQL database optimized for edge deployments
- Connection pooling and auto-scaling capabilities

**UI Libraries**:
- Radix UI - Headless accessible component primitives
- React Query (`@tanstack/react-query`) - Server state management (configured but not actively used)
- React Three Fiber ecosystem (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) - 3D graphics capabilities (installed but not utilized in current implementation)

**Utility Libraries**:
- `class-variance-authority` - Component variant styling utility
- `cmdk` - Command palette component
- `date-fns` - Date manipulation
- `nanoid` - Unique ID generation

**Development Tools**:
- Vite with React plugin for fast HMR
- TSX for TypeScript execution in development
- ESBuild for production builds
- Drizzle Kit for database migrations

**Fonts**: Inter font family loaded via `@fontsource/inter`

**State Management**: Zustand with middleware support for store subscriptions

**Validation**: Zod for runtime schema validation integrated with Drizzle

**Note**: The application includes React Three Fiber and related 3D libraries but the current implementation is a 2D puzzle game using standard DOM/CSS, suggesting potential future 3D enhancement plans.