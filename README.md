# Climate Financial Risk Dashboard

A React dashboard that visualises the financial impact of climate risk across multiple pathways, timeframes, and financial metrics.

Built with **React**, **TypeScript**, **Recharts**, **Tailwind CSS**, and **Material UI**.

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

This will read the CSV file located at `src/data/mock_data.csv` and generate a JSON file at `src/data/transformed_mock_data.json`. The dashboard uses this JSON as its data source.

**Note:** We are not using a backend service for this project because:

- The dataset is static and small (mock data).
- The focus is on demonstrating React, data transformation, and visualization.
- Avoiding a backend simplifies setup for testing and reviewing the dashboard.
- Insights and charts are computed directly in the frontend for speed and interactivity.

## Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

**Filters and Interactivity**

- Financial Line Item Dropdown: Select which metric to display (EBIT, FCFF, DCF).
- Timeframe Dropdown: Filter data by years (e.g., 2025–2030, 2030–2034).
- TimeScale Slider: Adjust the time scale to focus on specific periods.
- Zoom Controls: Zoom in or out on the graph for a clearer view of the data.

## Running Tests (Optional)

End-to-end tests are written with Cypress. To run them, first start the dev server, then run Cypress in a separate terminal:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run cypress:open   # interactive mode
npm run cypress:run    # headless mode
```
