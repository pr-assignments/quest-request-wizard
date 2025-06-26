"use client";

import { useQuote } from "../../context/QuoteProvider";
import { QuoteActionType, VesselType } from "../../types";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState, useEffect } from "react";

// Enum for fields in the vessel step
const enum VesselStepField {
  VesselName = "vesselName",
  VesselType = "vesselType",
}

interface VesselStepProps {
  title: string;
}

export default function VesselStep({ title }: Readonly<VesselStepProps>) {
  const { state, dispatch } = useQuote();
  const { vesselName = "", vesselType = "" } = state.form;

  // Tracks whether each field has been touched (for showing validation messages)
  const [touched, setTouched] = useState({
    vesselName: false,
    vesselType: false,
  });

  // Valid when vessel name is not empty and vessel type matches enum
  const isValid =
    vesselName.trim() !== "" &&
    Object.values(VesselType).includes(vesselType as VesselType);

  // Handle input change for vessel name
  const handleVesselNameChange = (value: string) => {
    dispatch({
      type: QuoteActionType.SetField,
      field: VesselStepField.VesselName,
      value,
    });
  };

  // Handle selection change for vessel type
  const handleVesselTypeChange = (value: VesselType) => {
    dispatch({
      type: QuoteActionType.SetField,
      field: VesselStepField.VesselType,
      value,
    });
  };

  // Proceed to the next step if the current form is valid
  const handleNext = () => {
    if (isValid) dispatch({ type: QuoteActionType.NextStep });
  };

  // Return to the previous step
  const handleBack = () => {
    dispatch({ type: QuoteActionType.PrevStep });
  };

  // Set touched if fields are pre-filled (rehydrated from localStorage)
  useEffect(() => {
    if (vesselName) setTouched((prev) => ({ ...prev, vesselName: true }));
    if (vesselType) setTouched((prev) => ({ ...prev, vesselType: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md w-full mx-auto p-1 sm:p-4 flex flex-col gap-6 justify-between h-full">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Vessel Name Input */}
        <div>
          <label htmlFor="vesselName" className="block mb-1 font-medium">
            Vessel Name
          </label>
          <Input
            id="vesselName"
            value={vesselName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleVesselNameChange(e.target.value)
            }
            onBlur={() => setTouched((prev) => ({ ...prev, vesselName: true }))}
          />
          {touched.vesselName && vesselName.trim() === "" && (
            <p className="text-red-600 text-sm mt-1">
              Vessel name is required.
            </p>
          )}
        </div>

        {/* Vessel Type Select */}
        <div className="w-full">
          <label htmlFor="vesselType-label" className="block mb-1 font-medium">
            Vessel Type
          </label>
          <Select
            aria-labelledby="vesselType-label"
            value={vesselType}
            onValueChange={(value) =>
              handleVesselTypeChange(value as VesselType)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select vessel type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(VesselType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.vesselType && !vesselType && (
            <p className="text-red-600 text-sm mt-1">
              Vessel type is required.
            </p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" disabled={!isValid} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
