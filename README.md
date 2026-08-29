# Mix Food - Client (Vite + React)

Customer-facing website for the **Mix Food** restaurant: menu browsing, product search, and table reservations.

## Tech Stack

- **Build tool**: Vite 5
- **Framework**: React 18 + TypeScript
- **Routing**: React Router DOM
- **UI**: Tailwind CSS + shadcn/ui (Radix UI) + framer-motion
- **State/API**: TanStack Query + axios
- **Testing**: Vitest + Playwright
- **Package manager**: pnpm (>= 9)

## Project structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # React contexts (auth, i18n...)
├── hooks/            # Custom hooks (incl. API hooks)
├── pages/            # Route pages (Home, Menu, Reservations, Booking...)
├── services/         # API service layer
├── types/            # Shared TypeScript types
└── main.tsx          # App entry
public/               # Static assets
```

---

## Prerequisites

- [Node.js](https://nodejs.org) >= 20.19
- [pnpm](https://pnpm.io) >= 9
- The **Mix Food backend** running (API base URL)

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

Set the backend URL:

```env
VITE_API_BASE_URL=http://localhost:3001
```

> `VITE_*` variables are **inlined at build time** — restart the dev/build server after changing them.

### 1.3 Run

```bash
pnpm dev        # development  -> http://localhost:8080
pnpm build      # production build -> dist/
pnpm preview    # preview the built site locally
```

> In dev the backend must already be running and allow CORS for the client origin.

### 1.4 Tests

```bash
pnpm test          # vitest unit tests
pnpm exec playwright test   # e2e tests (if Playwright browsers installed)
```

---

## 2. Build & run with Docker (production on a VPS)

The client is a **static site** — the Docker image builds it with Vite and serves it with **nginx**. The API URL is baked in at build time, so pass it as a build arg.

Expected on the VPS:
- a shared Docker network `mixfood` (see the backend README),
- nginx (host) reverse-proxying to the container, or the container exposed on a port.

### 2.1 Build the image

```bash
# from the repo root
docker compose build --build-arg VITE_API_BASE_URL=https://api.mix-food.io.vn .
```

Or set the env var first:

```bash
export VITE_API_BASE_URL=https://api.mix-food.io.vn
docker compose build
```

### 2.2 Run

```bash
docker compose up -d
```

The container serves the site on host port `8080 → 80` (nginx). Check it: `curl -I http://localhost:8080`.

### 2.3 Reverse proxy (nginx)

```nginx
server {
    listen 80;
    server_name client.mix-food.io.vn;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable SSL with Certbot: `sudo certbot --nginx -d client.mix-food.io.vn`.

> SPA routing is handled by nginx (`try_files ... /index.html`) via the bundled [`nginx.conf`](nginx.conf), so client-side routes work on refresh.

### 2.4 Update / redeploy

```bash
git pull
docker compose build --build-arg VITE_API_BASE_URL=https://api.mix-food.io.vn .
docker compose up -d
```

---

## 3. Environment variables

See [`.env.example`](.env.example).

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Backend API base URL (inlined at build time) |

---

## License

Private project — internal use.
