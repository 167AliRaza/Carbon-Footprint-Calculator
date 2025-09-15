"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarbonFootprintFormValues } from "@/lib/schemas";

export function EnergyConsumptionSection() {
  const { control } = useFormContext<CarbonFootprintFormValues>();

  const fuelTypes = [
    { value: "natural_gas_kg_per_kwh", label: "Natural Gas" },
    { value: "lpg_kg_per_kwh", label: "LPG" },
    { value: "heating_oil_kg_per_kwh", label: "Heating Oil" },
    { value: "coal_kg_per_kwh", label: "Coal" },
    { value: "wood_pellets_kg_per_kwh", label: "Wood Pellets" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={control}
        name="electricity_kwh"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Electricity Usage (kWh/year)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 3000"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="fuel_kwh"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fuel Usage (kWh/year)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 1200"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="fuel_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fuel Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {fuelTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}