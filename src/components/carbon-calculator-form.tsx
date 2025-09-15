"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  CarbonFootprintFormSchema,
  CarbonFootprintFormValues,
  CalculateResponse,
} from "@/lib/schemas";
import { calculateCarbonFootprint, getAvailableCountries } from "@/lib/api";
import { BasicInfoSection } from "./form-sections/basic-info-section";
import { EnergyConsumptionSection } from "./form-sections/energy-consumption-section";
import { TransportationSection } from "./form-sections/transportation-section";
import { FlightsSection } from "./form-sections/flights-section";
import { SecondarySpendingSection } from "./form-sections/secondary-spending-section";
import { CarbonFootprintResults } from "./carbon-footprint-results";

const defaultValues: CarbonFootprintFormValues = {
  country: "Pakistan", // Default country
  period: "last 12 months",
  household_size: 1,
  electricity_kwh: 0,
  fuel_kwh: 0,
  fuel_type: "natural_gas_kg_per_kwh",
  car_km: 0,
  car_powertrain: "petrol",
  motorbike_km: 0,
  public_transport_pkm: 0,
  public_transport_mode: "bus",
  flight_distance_km: 0,
  flight_haul: "short_haul",
  flight_seat: "economy",
  flight_apply_rf: true,
  secondary_spending: {
    food_and_drink: 0,
    clothing: 0,
    electronics: 0,
    furniture: 0,
    health_beauty: 0,
    recreation_culture: 0,
    hotels_restaurants: 0,
    other_goods_services: 0,
  },
};

export function CarbonCalculatorForm() {
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [calculationResult, setCalculationResult] =
    useState<CalculateResponse | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<CarbonFootprintFormValues>({
    resolver: zodResolver(CarbonFootprintFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    async function fetchCountries() {
      try {
        const data = await getAvailableCountries();
        setCountries(data.available_countries);
        // Set default country if available and not already set
        if (data.available_countries.length > 0 && !form.getValues("country")) {
          form.setValue("country", data.available_countries[0]);
        }
      } catch (error) {
        toast.error("Failed to load countries. Please try again.");
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoadingCountries(false);
      }
    }
    fetchCountries();
  }, [form]);

  const onSubmit = async (values: CarbonFootprintFormValues) => {
    setIsCalculating(true);
    setCalculationResult(null);
    try {
      const result = await calculateCarbonFootprint(values);
      setCalculationResult(result);
      toast.success("Carbon footprint calculated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to calculate carbon footprint.");
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Carbon Footprint Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
                    1. Basic Information
                  </h2>
                  <BasicInfoSection
                    countries={countries}
                    isLoadingCountries={isLoadingCountries}
                  />
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
                    2. Energy Consumption
                  </h2>
                  <EnergyConsumptionSection />
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
                    3. Transportation
                  </h2>
                  <TransportationSection />
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
                    4. Flights
                  </h2>
                  <FlightsSection />
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
                    5. Secondary Spending
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your estimated annual spending in each category.
                  </p>
                  <SecondarySpendingSection />
                </section>

                <Button type="submit" className="w-full" disabled={isCalculating}>
                  {isCalculating ? "Calculating..." : "Calculate Footprint"}
                </Button>
              </form>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>

      {calculationResult && (
        <div className="mt-8">
          <CarbonFootprintResults result={calculationResult} />
        </div>
      )}
    </div>
  );
}