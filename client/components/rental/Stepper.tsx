import { cn } from "@/lib/utils";

interface StepperProps {
  step: 1 | 2 | 3 | 4;
}

const steps = [
  { id: 1, label: "Araç" },
  { id: 2, label: "Seç" },
  { id: 3, label: "Kişisel" },
  { id: 4, label: "Ödeme" },
] as const;

export default function Stepper({ step }: StepperProps) {
  return (
    <div className="w-full py-3 border-b bg-white/70 backdrop-blur">
      <div className="container max-w-7xl container-px">
        <ol className="flex items-center gap-4 text-sm">
          {steps.map((s, i) => (
            <li key={s.id} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-6 items-center justify-center rounded-full border text-xs",
                  step === s.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : step > s.id
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-slate-600",
                )}
              >
                {s.id}
              </span>
              <span className={cn(step === s.id ? "font-semibold" : "text-slate-600")}>{s.label}</span>
              {i < steps.length - 1 && <span className="mx-1 text-slate-300">→</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
