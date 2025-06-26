"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { QuoteRequest, QuoteActionType } from "../types";

interface QuoteState {
  currentStep: number;
  form: Partial<QuoteRequest>;
}

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

const defaultState: QuoteState = {
  currentStep: 1,
  form: { companyName: "helow", contactEmail: "mpompa@email.com" },
};

const QuoteContext = createContext<{
  state: QuoteState;
  dispatch: React.Dispatch<Action>;
}>({ state: defaultState, dispatch: () => {} });

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

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(quoteReducer, defaultState);

  useEffect(() => {
    const draft = localStorage.getItem("quoteDraft");
    if (draft) {
      const parsed: QuoteState = JSON.parse(draft);

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

export const useQuote = () => useContext(QuoteContext);
