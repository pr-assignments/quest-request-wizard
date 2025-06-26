"use client";

import { QuoteProvider, useQuote } from "./context/QuoteProvider";
import CompanyStep from "./components/steps/CompanyStep";
import VesselStep from "./components/steps/VesselStep";
import CoverageStep from "./components/steps/CoverageStep";
import ReviewStep from "./components/steps/ReviewStep";
import { Toaster } from "sonner";

// Step definitions: each maps to a component and a title
const steps = [
  { component: CompanyStep, title: "Step 1 of 3: Company Info" },
  { component: VesselStep, title: "Step 2 of 3: Vessel Info" },
  { component: CoverageStep, title: "Step 3 of 3: Coverage Info" },
  { component: ReviewStep, title: "Review & Submit" },
];

// Wizard controller that renders the active step
function QuoteWizard() {
  const { state } = useQuote();
  const stepIndex = state.currentStep - 1;
  const StepComponent = steps[stepIndex]?.component;
  const title = steps[stepIndex]?.title;

  return StepComponent ? (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md p-2 sm:p-6 h-[400px] flex flex-col justify-between">
        {/* Container ensures scrollable step content and consistent layout */}
        <div className="flex-1 overflow-auto">
          <StepComponent title={title} />
        </div>
      </div>
    </div>
  ) : null;
}

// Root page: wraps everything in QuoteProvider and sets up global layout
export default function Home() {
  return (
    <QuoteProvider>
      <div className="min-h-dvh sm:min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <QuoteWizard />
      </div>
      {/* Sonner toast handler (top-center with rich colors) */}
      <Toaster richColors position="top-center" />
    </QuoteProvider>
  );
}
