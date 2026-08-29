# Mix Food - Customer App (Vite + React)

Customer-facing app for the **Mix Food** restaurant. Serves two roles:
1. **Public website** — menu browsing, product search, table reservations.
2. **QR Table Ordering** — customers scan a table QR code to browse the menu, place orders, chat with staff, and request payment — **no account or login required**.

## Tech Stack

- **Build tool**: Vite 5
- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **UI**: Tailwind CSS + shadcn/ui (Radix UI) + framer-motion
- **State/API**: TanStack Query + axios
- **Real-time**: Socket.IO client
- **Package manager**: pnpm (>= 9)

## Project structure

```
src/
├── components/          # Reusable UI components
├── contexts/
│   ├── AuthContext.tsx       # Public site auth
│   └── TableSessionContext.tsx  # QR session state (sessionToken, table, orders)
├── hooks/               # Custom hooks (API, socket, etc.)
├── pages/
│   ├── Home/            # Public homepage
│   ├── Menu/            # Public menu
│   ├── Reservations/    # Table reservation form
│   └── TableOrder/      # QR ordering page (/q/:token)
├── services/
│   ├── table-session.service.ts  # Customer session API calls
│   └── ...                       # Other API services
├── types/               # Shared TypeScript types
└── main.tsx             # App entry
```

---

## Prerequisites

- [Node.js](https://nodejs.org) >= 20.19
- [pnpm](https://pnpm.io) >= 9
- The **Mix Food backend** running

---

## 1. Local development

### 1.1 Install dependencies

```bash
pnpm install
```

### 1.2 Configure environment

```bash
cp .env.example .env
```

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_WS_URL=http://localhost:3001
```

> `VITE_*` variables are **inlined at build time** — restart the dev server after changing them.

### 1.3 Run

```bash
pnpm dev        # development  -> http://localhost:5173
pnpm build      # production build -> dist/
pnpm preview    # preview the production build locally
```

---

## 2. QR Table Ordering — how it works

### Flow

```
Customer scans QR code
       ↓
GET /q/:token  (no auth required)
       ↓
Server finds or creates TableSession → issues session JWT
       ↓
App stores token in sessionStorage (cleared when tab closes)
       ↓
Customer browses menu / adds to cart / submits orders (Bearer: <session JWT>)
       ↓
Customer presses "Request Payment"
       ↓
Staff confirms payment (cash/transfer) in admin panel
       ↓
Session closed → customer sees "Thank you" screen
```

### Key behaviours

- **No login required** — the QR scan itself issues a short-lived session token automatically.
- **Page refresh / tab restore** — if the session token is in `sessionStorage`, the app calls `/customer/session` to re-hydrate all state (table info, orders, messages).
- **Multiple devices on same table** — all devices that scan the same QR join the same session and see the same orders.
- **Returning via QR** — if the table already has an active session, the QR scan joins it (no duplicate sessions).
- **Session expiry** — sessions expire after 8 hours. On expiry the customer sees a "Session ended" screen and can re-scan the QR.
- **Session closed by admin** — a WebSocket event tells the app in real-time; the customer sees a "Payment confirmed" screen.
- **Network error on submit** — the same idempotency key is re-sent on retry; the server returns the previously created order instead of creating a duplicate.

### Real-time events (Socket.IO)

The app connects to `VITE_WS_URL` and joins the customer's session room. Handled events:

| Event | Effect |
|---|---|
| `order.status_updated` | Updates order status badge live |
| `message.received` | Shows new staff message in chat |
| `payment.confirmed` | Shows "Payment confirmed, thank you!" screen |
| `session.closed` | Shows session-ended screen |

---

## 3. Environment variables

See [`.env.example`](.env.example).

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL (inlined at build) |
| `VITE_WS_URL` | Socket.IO server URL (usually same as API) |

---

## 4. Build & run with Docker (production)

The app is a **static site** — built with Vite and served by nginx.

```bash
docker compose build \
  --build-arg VITE_API_BASE_URL=https://api.mix-food.io.vn \
  --build-arg VITE_WS_URL=https://api.mix-food.io.vn
docker compose up -d
```

The container serves the site on port `8080`. nginx handles SPA routing (`try_files ... /index.html`) so client-side routes work on refresh.

For WebSocket support, add these headers to the nginx reverse proxy config:

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

---

## License

Private project — internal use.
