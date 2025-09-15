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

export function TransportationSection() {
  const { control } = useFormContext<CarbonFootprintFormValues>();

  const carPowertrains = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "hybrid", label: "Hybrid" },
    { value: "bev", label: "Battery Electric Vehicle (BEV)" },
  ];

  const publicTransportModes = [
    { value: "bus", label: "Bus" },
    { value: "rail", label: "Rail" },
    { value: "metro_tram", label: "Metro/Tram" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={control}
        name="car_km"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Car Distance (km/year)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 10000"
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
        name="car_powertrain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Car Powertrain</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select powertrain" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {carPowertrains.map((type) => (
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

      <FormField
        control={control}
        name="motorbike_km"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Motorbike Distance (km/year)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 2000"
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
        name="public_transport_pkm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Public Transport (passenger-km/year)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 5000"
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
        name="public_transport_mode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Public Transport Mode</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {publicTransportModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
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