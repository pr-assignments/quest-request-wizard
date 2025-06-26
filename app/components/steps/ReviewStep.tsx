import { useQuote } from "../../context/QuoteProvider";
import { Button } from "@/app/components/ui/button";
import { QuoteActionType } from "../../types";
import { toast } from "sonner";

interface ReviewStepProps {
  title: string;
}

export default function ReviewStep({ title }: Readonly<ReviewStepProps>) {
  const { state, dispatch } = useQuote();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state.form),
        }
      );

      if (response.ok) {
        toast.success("Quote submitted!");
        localStorage.removeItem("quoteDraft");
        // Optionally reset or navigate away
      } else {
        toast.error("Failed to submit quote.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission.");
    }
  };

  const handleBack = () => {
    dispatch({ type: QuoteActionType.PrevStep });
  };

  return (
    <div className="max-w-md w-full mx-auto p-1 sm:p-4 flex flex-col gap-6 justify-between h-full">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="space-y-2 text-sm">
          {Object.entries(state.form).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b pb-1">
              <span className="capitalize font-medium">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span>{String(value)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Submit Request
          </Button>
        </div>
      </div>
    </div>
  );
}
