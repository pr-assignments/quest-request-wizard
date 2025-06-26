export enum VesselType {
  BulkCarrier = "Bulk Carrier",
  OilTanker = "Oil Tanker",
  ContainerShip = "Container Ship",
}

export enum CoverageLevel {
  Basic = "Basic",
  Standard = "Standard",
  Premium = "Premium",
}

export enum QuoteActionType {
  SetField = "SET_FIELD",
  NextStep = "NEXT_STEP",
  PrevStep = "PREV_STEP",
  SetStep = "SET_STEP",
  LoadDraft = "LOAD_DRAFT",
}

export interface QuoteRequest {
  companyName: string;
  contactEmail: string;
  vesselName: string;
  vesselType: VesselType;
  coverageLevel: CoverageLevel;
  cargoValue: number;
}
