# Project Structure — problem-2

This document describes the folder and file structure for the React + Vite project located in `problem-2/`. It highlights the purpose of important files and the responsibilities of key folders so contributors can quickly understand the code organization.

## Overview

- Project type: React application scaffolded for TypeScript and Vite.
- Conventions: `src/` contains application source; `public/` contains static assets.
- Live Demo: https://code-challenge-git-main-cuongnq610s-projects.vercel.app

## Top-level files

- `index.html`: Vite entry HTML.
- `package.json`: project scripts and dependencies (run/install commands are defined here).
- `vite.config.ts`: Vite configuration.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript configuration files.
- `eslint.config.js`, `prettier.config.js`: linting and formatting configs.

## public/

- `coin-icon/`: static assets (icons) used by the app. Files in `public/` are served as-is.

## src/

High-level entry files:

- `main.tsx`: application bootstrap (ReactDOM render / createRoot + providers).
- `App.tsx`: root app component.
- `index.css`, `App.css`: global and app-specific styles.

Primary folders and responsibilities:

- `assets/` — static images, fonts, and other assets imported by code.

- `components/` — reusable UI components. Current subfolders include:
  - `Button/` — `Button.tsx`, `CloseButton.tsx` and `index.ts` exporting the components.
  - `Card/` — `Card.tsx` and `index.ts`.
  - `Image/` — `Image.tsx` and `index.ts`.
  - `Input/` — `index.ts`, `Input.tsx`, `InputNumber.tsx`, `InputSearch.tsx`.
  - `Modal/` — `Modal.tsx` and `index.ts`.

  These components are small, focused UI building blocks meant for reuse across screens.

- `features/` — This code base is following `feature-base` structure that feature-specific code organized as modules (feature folders follow a local-namespace pattern):
  - `currency-exchange/`
    - `CurrencyExchange.tsx` — top-level feature component.
    - `components/` — feature-specific components: `CoinInput.tsx`, `ModalSelectCoin.tsx`, `SwapButton.tsx`.
    - `contexts/` — `CurrencyExchangeContext.tsx` provides context/state for the feature.
    - `hocs/` — `withCurrencyExchange.tsx` (higher-order components for injecting feature behaviours).
    - `hooks/` — `useCoinSwap.ts` and any other feature-specific hooks.

- `hooks/` — generic application hooks (e.g., `useClickOutside.ts`). Reusable across features.

- `services/` — API and data access logic:
  - `axios.service.ts` — preconfigured axios instance and helpers.
  - `coin.service.ts` — coin-related API calls.
  - `index.ts` — barrel exports for services.

- `types/` — TypeScript type definitions used across the app:
  - `coin.type.ts` — coin-related type definitions.
  - `index.ts` — aggregated exports.

- `utils/` — small helpers and utilities:
  - `number.util.ts`, `string.util.ts`, `promise.util.ts`, `style.util.ts` and `index.ts`.

## Typical development commands

Run these from inside `problem-2/`.

```bash
npm install
npm run dev
```

## Notes

- Use ESM and only export constant to adopt `tree-shaking` feature of Vite to reduce bundle size.
- Use `eslint` and `prettier` to define rules to code convention.
