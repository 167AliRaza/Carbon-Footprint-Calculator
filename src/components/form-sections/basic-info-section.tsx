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

interface BasicInfoSectionProps {
  countries: string[];
  isLoadingCountries: boolean;
}

export function BasicInfoSection({ countries, isLoadingCountries }: BasicInfoSectionProps) {
  const { control } = useFormContext<CarbonFootprintFormValues>();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isLoadingCountries}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoadingCountries ? (
                  <SelectItem value="loading" disabled>
                    Loading countries...
                  </SelectItem>
                ) : (
                  countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="period"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Period</FormLabel>
            <FormControl>
              <Input placeholder="e.g., last 12 months" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="household_size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Household Size</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g., 1"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}