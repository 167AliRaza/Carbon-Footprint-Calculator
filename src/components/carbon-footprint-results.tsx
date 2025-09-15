"use client";

import React from "react";
import { CalculateResponse } from "@/lib/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CarbonBreakdownChart } from "./carbon-breakdown-chart";

interface CarbonFootprintResultsProps {
  result: CalculateResponse;
}

export function CarbonFootprintResults({ result }: CarbonFootprintResultsProps) {
  const { total_kg_co2e, total_t_co2e, breakdown, metadata } = result;

  return (
    <div className="space-y-8">
      <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-green-700 dark:text-green-300">
            Your Estimated Carbon Footprint
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-6xl font-bold text-green-800 dark:text-green-200 mb-2">
            {total_t_co2e.toFixed(3)}{" "}
            <span className="text-4xl font-semibold">tCO2e</span>
          </p>
          <p className="text-xl text-green-600 dark:text-green-400">
            ({total_kg_co2e.toFixed(2)} kg CO2e)
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Calculated for {metadata.country} for the period of{" "}
            {metadata.period} with a household size of {metadata.household_size}.
            (Electricity factor used: {metadata.electricity_factor_used})
          </p>
          <p className="text-xs text-muted-foreground">
            Calculation Timestamp:{" "}
            {new Date(metadata.calculation_timestamp).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <CarbonBreakdownChart data={breakdown} />

        <Card>
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">kg CO2e</TableHead>
                  <TableHead className="text-right">t CO2e</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breakdown.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.kg_co2e.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.t_co2e.toFixed(3)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}