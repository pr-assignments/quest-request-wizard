"use client";

import { QuoteProvider, useQuote } from "./context/QuoteProvider";
import CompanyStep from "./components/steps/CompanyStep";
import VesselStep from "./components/steps/VesselStep";
import CoverageStep from "./components/steps/CoverageStep";
import ReviewStep from "./components/steps/ReviewStep";
import { Toaster } from "sonner";

const steps = [
  { component: CompanyStep, title: "Step 1 of 3: Company Info" },
  { component: VesselStep, title: "Step 2 of 3: Vessel Info" },
  { component: CoverageStep, title: "Step 3 of 3: Coverage Info" },
  { component: ReviewStep, title: "Review & Submit" },
];

function QuoteWizard() {
  const { state } = useQuote();
  const stepIndex = state.currentStep - 1;
  const StepComponent = steps[stepIndex]?.component;
  const title = steps[stepIndex]?.title;

  return StepComponent ? (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md p-2 sm:p-6 h-[400px] flex flex-col justify-between">
        <div className="flex-1 overflow-auto">
          <StepComponent title={title} />
        </div>
      </div>
    </div>
  ) : null;
}

export default function Home() {
  return (
    <QuoteProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <QuoteWizard />
      </div>
      <Toaster richColors position="top-center" />
    </QuoteProvider>
  );
}
