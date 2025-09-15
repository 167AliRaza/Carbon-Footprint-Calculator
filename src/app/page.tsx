import { CarbonCalculatorForm } from "@/components/carbon-calculator-form";
import { MadeWithDyad } from "@/components/made-with-dyad";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 w-full max-w-4xl">
        <CarbonCalculatorForm />
      </main>
      <MadeWithDyad />
    </div>
  );
}