"use client";
import { useQuote } from "../../context/QuoteProvider";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { QuoteActionType } from "../../types";
import { toast } from "sonner";

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
  const [touched, setTouched] = useState({
    companyName: false,
    contactEmail: false,
  });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
  const isValid = companyName.trim() !== "" && emailValid;

  const handleChange = (field: CompanyStepField, value: string) => {
    dispatch({ type: QuoteActionType.SetField, field, value });
  };

  const handleNext = () => {
    if (isValid) dispatch({ type: QuoteActionType.NextStep });
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved");
  };

  useEffect(() => {
    if (companyName) setTouched((prev) => ({ ...prev, companyName: true }));
    if (contactEmail) setTouched((prev) => ({ ...prev, contactEmail: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md w-full mx-auto p-1 sm:p-4 flex flex-col gap-6 justify-between h-full">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div>
          <label htmlFor="companyName" className="block mb-1 font-medium">
            Company Name
          </label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(CompanyStepField.CompanyName, e.target.value);
            }}
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
