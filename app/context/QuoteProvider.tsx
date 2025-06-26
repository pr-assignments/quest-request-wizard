"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { QuoteRequest, QuoteActionType } from "../types";

// Define the shape of our global form state
interface QuoteState {
  currentStep: number;
  form: Partial<QuoteRequest>;
}

// Define all possible actions for useReducer
type Action =
  | {
      [K in keyof QuoteRequest]: {
        type: QuoteActionType.SetField;
        field: K;
        value: QuoteRequest[K];
      };
    }[keyof QuoteRequest]
  | { type: QuoteActionType.NextStep }
  | { type: QuoteActionType.PrevStep }
  | { type: QuoteActionType.SetStep; step: number }
  | { type: QuoteActionType.LoadDraft; data: QuoteState };

// Initial default state
const defaultState: QuoteState = {
  currentStep: 1,
  form: { companyName: "", contactEmail: "" },
};

// Create a context to share state and dispatch globally
const QuoteContext = createContext<{
  state: QuoteState;
  dispatch: React.Dispatch<Action>;
}>({ state: defaultState, dispatch: () => {} });

// Reducer function to handle state transitions
function quoteReducer(state: QuoteState, action: Action): QuoteState {
  switch (action.type) {
    case QuoteActionType.SetField: {
      const updated = {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
      localStorage.setItem("quoteDraft", JSON.stringify(updated));
      return updated;
    }
    case QuoteActionType.NextStep:
      return { ...state, currentStep: state.currentStep + 1 };
    case QuoteActionType.PrevStep:
      return { ...state, currentStep: state.currentStep - 1 };
    case QuoteActionType.SetStep:
      return { ...state, currentStep: action.step };
    case QuoteActionType.LoadDraft:
      return action.data;
    default: {
      return state;
    }
  }
}

// Context provider that wraps the app and enables global state
export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(quoteReducer, defaultState);

  useEffect(() => {
    // Try loading persisted data from localStorage on mount
    const draft = localStorage.getItem("quoteDraft");
    if (draft) {
      const parsed: QuoteState = JSON.parse(draft);

      // Determine which step user should resume at
      const { form } = parsed;
      let step = 1;
      if (form.companyName && form.contactEmail) step = 2;
      if (form.vesselName && form.vesselType) step = 3;
      if (
        form.coverageLevel &&
        typeof form.cargoValue === "number" &&
        form.cargoValue > 0
      ) {
        step = 4; // Ready for review
      }

      dispatch({
        type: QuoteActionType.LoadDraft,
        data: { ...parsed, currentStep: step },
      });
    }
  }, []);

  return (
    <QuoteContext.Provider value={{ state, dispatch }}>
      {children}
    </QuoteContext.Provider>
  );
};

// Custom hook to consume the context
export const useQuote = () => useContext(QuoteContext);
