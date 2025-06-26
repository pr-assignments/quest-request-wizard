"use client";

import { useQuote } from "../../context/QuoteProvider";
import { QuoteActionType, CoverageLevel } from "../../types";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { useState, useEffect } from "react";

// Define fields for this step for type safety
const enum CoverageStepField {
  CoverageLevel = "coverageLevel",
  CargoValue = "cargoValue",
}

interface CoverageStepProps {
  title: string;
}

export default function CoverageStep({ title }: Readonly<CoverageStepProps>) {
  const { state, dispatch } = useQuote();
  const { coverageLevel = "", cargoValue = 0 } = state.form;

  // Track touched fields for validation messaging
  const [touched, setTouched] = useState({
    coverageLevel: false,
    cargoValue: false,
  });

  // Form validation rules
  const isValid = coverageLevel !== "" && cargoValue > 0;

  // Dispatch coverage level changes
  const handleCoverageLevelChange = (value: CoverageLevel) => {
    dispatch({
      type: QuoteActionType.SetField,
      field: CoverageStepField.CoverageLevel,
      value,
    });
  };

  // Dispatch cargo value changes
  const handleCargoValueChange = (value: number) => {
    dispatch({
      type: QuoteActionType.SetField,
      field: CoverageStepField.CargoValue,
      value,
    });
  };

  // Advance to review step if form is valid
  const handleReview = () => {
    if (isValid) dispatch({ type: QuoteActionType.NextStep });
  };

  // Go back to previous step
  const handleBack = () => {
    dispatch({ type: QuoteActionType.PrevStep });
  };

  // Mark fields as touched if already filled (rehydration case)
  useEffect(() => {
    if (coverageLevel) setTouched((prev) => ({ ...prev, coverageLevel: true }));
    if (cargoValue) setTouched((prev) => ({ ...prev, cargoValue: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md w-full mx-auto p-1 sm:p-4 flex flex-col gap-6 justify-between h-full">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Coverage Level Radios */}
        <div>
          <label
            className="block mb-1 font-medium"
            htmlFor="coverageLevel-label"
          >
            Coverage Level
          </label>
          <RadioGroup
            id="coverageLevel-label"
            defaultValue={coverageLevel}
            onValueChange={(value) =>
              handleCoverageLevelChange(value as CoverageLevel)
            }
          >
            {Object.values(CoverageLevel).map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <RadioGroupItem value={level} id={level} />
                <Label htmlFor={level}>{level}</Label>
              </div>
            ))}
          </RadioGroup>
          {touched.coverageLevel && !coverageLevel && (
            <p className="text-red-600 text-sm mt-1">
              Coverage level is required.
            </p>
          )}
        </div>

        {/* Cargo Value Input */}
        <div>
          <label htmlFor="cargoValue" className="block mb-1 font-medium">
            Cargo Value (USD)
          </label>
          <Input
            id="cargoValue"
            type="number"
            value={cargoValue || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleCargoValueChange(Number(e.target.value))
            }
            onBlur={() => setTouched((prev) => ({ ...prev, cargoValue: true }))}
          />
          {touched.cargoValue && (!cargoValue || cargoValue <= 0) && (
            <p className="text-red-600 text-sm mt-1">
              Cargo value must be greater than 0.
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" disabled={!isValid} onClick={handleReview}>
          Review
        </Button>
      </div>
    </div>
  );
}
