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
import { CarbonFootprintFormValues } from "@/lib/schemas";

export function SecondarySpendingSection() {
  const { control } = useFormContext<CarbonFootprintFormValues>();

  const spendingCategories = [
    { name: "food_and_drink", label: "Food & Drink" },
    { name: "clothing", label: "Clothing" },
    { name: "electronics", label: "Electronics" },
    { name: "furniture", label: "Furniture" },
    { name: "health_beauty", label: "Health & Beauty" },
    { name: "recreation_culture", label: "Recreation & Culture" },
    { name: "hotels_restaurants", label: "Hotels & Restaurants" },
    { name: "other_goods_services", label: "Other Goods & Services" },
  ] as const; // Use 'as const' for type safety with string literals

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {spendingCategories.map((category) => (
        <FormField
          key={category.name}
          control={control}
          name={`secondary_spending.${category.name}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{category.label} (Currency/year)</FormLabel>
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
      ))}
    </div>
  );
}