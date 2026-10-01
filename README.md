# Sales Savvy — Frontend

React storefront and admin dashboard for the Sales Savvy e-commerce platform.
Backend: [sales-savvy-backend](https://github.com/harishxdevs/sales-savvy-backend) (Spring Boot + MySQL).

**Stack:** React 18 · Vite · React Router · Framer Motion · Razorpay Checkout

## Features

- Customer registration, login and logout (cookie-based JWT session)
- Product browsing by category, cart with quantity updates
- Razorpay checkout and order history
- Admin login and dashboard: manage products, users and view business stats

## Run locally

```bash
npm install
cp .env.example .env     # point VITE_API_URL at your backend (default http://localhost:9090)
npm run dev              # http://localhost:5173
```

## Build and deploy to GitHub Pages

```bash
VITE_API_URL=https://your-backend.onrender.com npm run deploy
```

This builds the app with the correct base path (`/sales-savvy-frontend/`), copies `index.html`
to `404.html` so client-side routes work on refresh, and pushes `dist` to the `gh-pages` branch.
GitHub serves it at https://harishxdevs.github.io/sales-savvy-frontend/.
