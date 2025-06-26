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
