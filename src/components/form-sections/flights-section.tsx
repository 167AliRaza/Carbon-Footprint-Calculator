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
import { Checkbox } from "@/components/ui/checkbox";
import { CarbonFootprintFormValues } from "@/lib/schemas";

export function FlightsSection() {
  const { control } = useFormContext<CarbonFootprintFormValues>();

  const flightHauls = [
    { value: "short_haul", label: "Short Haul" },
    { value: "long_haul", label: "Long Haul" },
  ];

  const flightSeatClasses = [
    { value: "economy", label: "Economy" },
    { value: "premium_economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={control}
        name="flight_distance_km"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Flight Distance (km/year)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 8000"
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
        name="flight_haul"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Flight Haul</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select flight haul" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {flightHauls.map((haul) => (
                  <SelectItem key={haul.value} value={haul.value}>
                    {haul.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="flight_seat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seat Class</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select seat class" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {flightSeatClasses.map((seat) => (
                  <SelectItem key={seat.value} value={seat.value}>
                    {seat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="flight_apply_rf"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Apply Radiative Forcing</FormLabel>
              <p className="text-sm text-muted-foreground">
                Include the non-CO2 effects of aviation on climate change.
              </p>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}