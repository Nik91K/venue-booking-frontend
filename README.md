## Venue Booking System – Frontend

This is the frontend for a **Venue Booking System** – a web application where users can explore venues on a map, view details, place bookings, and manage their profile. It also includes **admin** and **owner** dashboards for managing establishments and users.

The app is built with **React + TypeScript + Vite**, uses **Redux Toolkit** for state management, and talks to a backend API configured via environment variables.

---

### Tech stack

- **Framework**: React 19 + TypeScript
- **Bundler/dev server**: Vite
- **Routing**: `react-router-dom`
- **State management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **HTTP client**: Axios (configured in `src/api/axiosConfig.ts`)
- **UI**:
  - Custom UI primitives in `src/components/ui`
  - Layout components in `src/components/layout`
  - Shared components (cards, tables, dialogs, etc.) in `src/components/common`
- **Maps**: Google Maps via `@react-google-maps/api` / `@vis.gl/react-google-maps`
- **Notifications & errors**: `sonner` toasts via a global `errorSlice` and `ErrorComponent`
- **Analytics / monitoring**: Sentry (`@sentry/react`) when DSN is configured

---

### Project structure (high level)

- `src/pages`
  - `MainPage.tsx` – landing page
  - `VenuesMapPage.tsx` – map + list of venues with filters and pagination
  - `VenuePage.tsx` – single venue details, booking, comments
  - `SettingsPage.tsx` – profile, avatar, password, booking history
  - `pages/auth` – login and registration pages
  - `pages/admin` – admin dashboards (establishments, users, analytics)
  - `pages/owner` – owner dashboard for establishments
- `src/components`
  - `layout` – `Header`, `Footer`, `Sidebar`
  - `common` – reusable cards, dialogs, tables (`DataTable`), map helpers, error component, etc.
  - `ui` – low-level UI (buttons, inputs, table, spinner, pagination, etc.)
- `src/api`
  - `axiosConfig.ts` – Axios instance with base URL and interceptors
  - `store.ts` – Redux store
  - `slices` – feature slices: auth, user, establishments, bookings, comments, errors, etc.
- `src/hooks`
  - Domain hooks: `useEstablishments`, `useBookingForm`, `useSchedule`, `useNumToStars`
  - Validation: `hooks/validation/*` including `authorization`, `useEstablishment`, `useFormWithValidation`
- `src/fixtures` – static data (e.g., sidebar items, admin charts)
- `src/types` – shared TypeScript types

---

### Getting started

#### Prerequisites

- **Node.js** (LTS recommended)
- **npm** (or `yarn` if you prefer)
- A running backend for the Venue Booking System (API base URL configured below)

#### Install dependencies

```bash
cd venue-booking-frontend
npm install
# or
yarn install
```

#### Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

`./.env.example` contains:

- `VITE_API_URL` – Base URL of the backend API (e.g. `http://localhost:8080/api`)
- `VITE_GOOGLE_MAPS_API` – Google Maps API key for map components
- `VITE_SENTRY_DSN` – Sentry DSN for error monitoring (optional; leave empty to disable)

---

### Running the app

#### Development

```bash
npm run dev
# or
yarn dev
```

Open the URL printed in the console (typically `http://localhost:5173/`).

#### Production build

```bash
npm run build
# or
yarn build
```

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

---

### Available scripts

From `package.json`:

- **`dev`** – start Vite dev server
- **`build`** – type-check (`tsc -b`) and build for production
- **`preview`** – preview the production build
- **`lint`** – run ESLint on the project
- **`lint:fix`** – ESLint with `--fix`
- **`format`** – format files in `src` with Prettier
- **`format:check`** – check formatting with Prettier

Run any script with:

```bash
npm run <script>
```

---

### Key features

- **Venue exploration**
  - Map + list view of establishments with search, filters, and pagination
  - Detailed venue pages with photos, schedule, rating, and comments
- **Booking**
  - Booking dialogs using `useBookingForm` and shared booking form components
  - User booking history in the settings page
- **Authentication**
  - Login and registration with client-side validation (`authorization` validators)
  - Token handling via auth slice and Axios config
- **User settings**
  - Update username, avatar, and password
  - View past bookings
- **Admin / owner dashboards**
  - Establishment management: table views with search, filters, row actions, and pagination
  - User management (admin)
  - Owner view of their own establishments
- **Error handling & UX**
  - Centralized error handling via `errorSlice` and `ErrorComponent` (toasts)
  - `Spinner` and table loading states for async operations

---

### Development guidelines

- Use existing **UI components** from `src/components/ui` and `src/components/common` before adding new ones.
- Centralize **validation** in `src/hooks/validation` and prefer `useFormWithValidation` for new forms.
- Report errors via `errorSlice` (e.g. `addError(convertError(error))`) instead of only using `console.log`.
- Respect existing patterns for **loading states** (disable buttons when `loading`, show `Spinner` or table loading rows).

---

### License

This project is a personal educational project created for learning purposes.
