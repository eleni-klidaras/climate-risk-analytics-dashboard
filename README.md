# Climate Financial Risk Dashboard

A React dashboard that visualises the financial impact of climate risk across multiple pathways, timeframes, and financial metrics.

Built with **React**, **TypeScript**, **Recharts**, **Tailwind CSS**, and **Material UI**.

## Project Structure

```
src/
├── components/    # UI components (e.g. Graph, FilterPanel, Dropdown, Header)
├── constants/     # App-wide constants
├── data/          # CSV source and transformed JSON
├── services/      # Data fetching logic
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
scripts/           # Data transformation script
cypress/           # End-to-end tests
```

## Data Model

The dashboard visualises **climate financial risk** using the following concepts:

- **Climate pathways** — different climate scenarios (e.g., orderly transition, hot house world)
- **Financial line items** — EBIT, FCFF, and DCF
- **Financial line item shock** — the projected impact value being charted
- **Timeframes** — short (2025–2030), medium (2030–2034), and long

## Prerequisites

- Node.js (v18+)
- npm

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Transform the CSV mock data into JSON (required before running the app):

```bash
npm run transform-data
```

This reads `src/data/mock_data.csv` and generates `src/data/transformed_mock_data.json`. The dashboard uses this JSON as its data source.

**Note:** There is no backend service because the dataset is static mock data and the focus is on frontend data transformation and visualisation.

3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Filters and Interactivity

- **Financial Line Item Dropdown** — Select which metric to display (EBIT, FCFF, DCF).
- **Timeframe Dropdown** — Filter data by years (e.g., 2025–2030, 2030–2034).
- **TimeScale Slider** — Adjust the time scale to focus on specific periods.
- **Zoom Controls** — Zoom in or out on the graph for a clearer view of the data.

## Scripts

| Command                  | Description                          |
| ------------------------ | ------------------------------------ |
| `npm run dev`            | Start the development server         |
| `npm run build`          | Type-check and build for production  |
| `npm run preview`        | Preview the production build locally |
| `npm run lint`           | Run ESLint                           |
| `npm run transform-data` | Convert CSV mock data to JSON        |
| `npm run cypress:open`   | Open Cypress in interactive mode     |
| `npm run cypress:run`    | Run Cypress tests headlessly         |

## Running Tests (Optional)

End-to-end tests are written with Cypress. Start the dev server first, then run Cypress in a separate terminal:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run cypress:open   # interactive mode
npm run cypress:run    # headless mode
```
