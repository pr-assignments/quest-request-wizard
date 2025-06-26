"use client";

import { useQuote } from "../../context/QuoteProvider";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { QuoteActionType } from "../../types";
import { toast } from "sonner";

// Enum for safer field references
const enum CompanyStepField {
  CompanyName = "companyName",
  ContactEmail = "contactEmail",
}

interface CompanyStepProps {
  title: string;
}

export default function CompanyStep({ title }: Readonly<CompanyStepProps>) {
  const { state, dispatch } = useQuote();
  const { companyName = "", contactEmail = "" } = state.form;

  // Tracks whether each field has been interacted with
  const [touched, setTouched] = useState({
    companyName: false,
    contactEmail: false,
  });

  // Basic email validation regex
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
  const isValid = companyName.trim() !== "" && emailValid;

  // Dispatches SetField for both fields
  const handleChange = (field: CompanyStepField, value: string) => {
    dispatch({ type: QuoteActionType.SetField, field, value });
  };

  // Advance to next step if valid
  const handleNext = () => {
    if (isValid) dispatch({ type: QuoteActionType.NextStep });
  };

  // Trigger success toast using Sonner
  const handleSaveDraft = () => {
    toast.success("Draft saved");
  };

  // Mark fields as touched if pre-filled (rehydrated from localStorage)
  useEffect(() => {
    if (companyName) setTouched((prev) => ({ ...prev, companyName: true }));
    if (contactEmail) setTouched((prev) => ({ ...prev, contactEmail: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md w-full mx-auto p-1 sm:p-4 flex flex-col gap-6 justify-between h-full">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Company Name Input */}
        <div>
          <label htmlFor="companyName" className="block mb-1 font-medium">
            Company Name
          </label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(CompanyStepField.CompanyName, e.target.value)
            }
            onBlur={() =>
              setTouched((prev) => ({ ...prev, companyName: true }))
            }
          />
          {touched.companyName && companyName.trim() === "" && (
            <p className="text-red-600 text-sm mt-1">
              Company name is required.
            </p>
          )}
        </div>

        {/* Contact Email Input */}
        <div>
          <label htmlFor="contactEmail" className="block mb-1 font-medium">
            Contact Email
          </label>
          <Input
            id="contactEmail"
            value={contactEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(CompanyStepField.ContactEmail, e.target.value)
            }
            onBlur={() =>
              setTouched((prev) => ({ ...prev, contactEmail: true }))
            }
          />
          {touched.contactEmail && !emailValid && (
            <p className="text-red-600 text-sm mt-1">Invalid email format.</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button type="button" disabled={!isValid} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
