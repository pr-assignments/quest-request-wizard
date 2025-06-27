# Quote Request Wizard

## How to Install

1. **Clone the repository**

```bash
git clone https://github.com/pr-assignments/quest-request-wizard.git
cd quest-request-wizard
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Visit the app**  
   Open `http://localhost:3000` in your browser to view the wizard.

## 1. Overview

This wizard is part of a platform designed to streamline quote requests between maritime stakeholders — shipowners, brokers, and underwriters. It allows a Requester to fill out a step-by-step form with company, vessel, and coverage information, and submit the details to receive quotes. The goal is to make this process user-friendly, persistent, and easy to complete in a single-page interface.

The wizard guides the user through four key steps — collecting the necessary data, validating entries, saving drafts, and reviewing the information before submission. It also ensures that users can return to a partially completed form and continue seamlessly.

## 2. Data Model

```ts
// Defines allowed vessel types for insurance quotes
export enum VesselType {
  BulkCarrier = "Bulk Carrier",
  OilTanker = "Oil Tanker",
  ContainerShip = "Container Ship",
}

// Defines levels of insurance coverage available to the user
export enum CoverageLevel {
  Basic = "Basic",
  Standard = "Standard",
  Premium = "Premium",
}

// Enumerates action types used in the quote reducer for state transitions
export enum QuoteActionType {
  SetField = "SET_FIELD",
  NextStep = "NEXT_STEP",
  PrevStep = "PREV_STEP",
  SetStep = "SET_STEP",
  LoadDraft = "LOAD_DRAFT",
}

// Main data model for a quote request, representing all required form fields
export interface QuoteRequest {
  companyName: string;
  contactEmail: string;
  vesselName: string;
  vesselType: VesselType;
  coverageLevel: CoverageLevel;
  cargoValue: number;
}
```

## 3. State & Persistence

The application uses `useReducer` combined with React Context (`QuoteProvider`) to manage wizard state globally. The reducer updates the form state and current step, and each change is persisted to `localStorage` under the key `quoteDraft`. On initial load, the wizard checks localStorage and restores any in-progress data, determining the appropriate step to resume from. Navigation between steps is controlled by dispatching `NEXT_STEP` and `PREV_STEP` actions.

## 4. Styling Choices

Tailwind CSS v4 was used for utility-first styling, offering a consistent and responsive layout. Core form elements and UI interactions are powered by shadcn/ui, ensuring accessibility, form validation feedback, and design consistency across all steps. The background features a soft gradient for visual engagement, and all steps are rendered within a centered, fixed-height card to maintain alignment and usability.Tailwind CSS v4 was used for utility-first styling, with shadcn/ui components for form controls and layout consistency.

## 5. Mock API Behavior

The final form submission simulates a POST request to `https://jsonplaceholder.typicode.com/posts`. This mock endpoint is used to replicate a real API integration during development. Upon receiving a successful HTTP 200 response, the wizard displays a "Quote submitted!" message, clears the draft from localStorage, and could optionally trigger a redirect or reset. This simulates the behavior expected in production environments without requiring a backend.The final form submission simulates a POST request to `https://jsonplaceholder.typicode.com/posts`. Upon success (HTTP 200), the wizard displays a confirmation message and clears the saved draft from localStorage.

---

This project demonstrates component structure, state management, data validation, and modern UI practices using React 19, Tailwind v4, and Next.js App Router.
