import { z } from "zod";

// API Request Schemas
export const SecondarySpendingSchema = z.object({
  food_and_drink: z.number().min(0).default(0),
  clothing: z.number().min(0).default(0),
  electronics: z.number().min(0).default(0),
  furniture: z.number().min(0).default(0),
  health_beauty: z.number().min(0).default(0),
  recreation_culture: z.number().min(0).default(0),
  hotels_restaurants: z.number().min(0).default(0),
  other_goods_services: z.number().min(0).default(0),
});

export const CalculateRequestSchema = z.object({
  country: z.string().min(1, "Country is required"),
  period: z.string().min(1, "Period is required").default("last 12 months"),
  household_size: z.number().min(1, "Household size must be at least 1").default(1),
  electricity_kwh: z.number().min(0).default(0),
  fuel_kwh: z.number().min(0).default(0),
  fuel_type: z.enum([
    "natural_gas_kg_per_kwh",
    "lpg_kg_per_kwh",
    "heating_oil_kg_per_kwh",
    "coal_kg_per_kwh",
    "wood_pellets_kg_per_kwh",
  ]).default("natural_gas_kg_per_kwh"),
  car_km: z.number().min(0).default(0),
  car_powertrain: z.enum(["petrol", "diesel", "hybrid", "bev"]).default("petrol"),
  motorbike_km: z.number().min(0).default(0),
  public_transport_pkm: z.number().min(0).default(0),
  public_transport_mode: z.enum(["bus", "rail", "metro_tram"]).default("bus"),
  flight_distance_km: z.number().min(0).default(0),
  flight_haul: z.enum(["short_haul", "long_haul"]).default("short_haul"),
  flight_seat: z.enum(["economy", "business", "premium_economy", "first"]).default("economy"),
  flight_apply_rf: z.boolean().default(true),
  secondary_spending: SecondarySpendingSchema,
});

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;

// API Response Schemas
export const BreakdownItemSchema = z.object({
  category: z.string(),
  kg_co2e: z.number(),
  t_co2e: z.number(),
});

export const MetadataSchema = z.object({
  country: z.string(),
  period: z.string(),
  household_size: z.number(),
  electricity_factor_used: z.number(),
  calculation_timestamp: z.string(),
});

export const CalculateResponseSchema = z.object({
  total_kg_co2e: z.number(),
  total_t_co2e: z.number(),
  breakdown: z.array(BreakdownItemSchema),
  metadata: MetadataSchema,
});

export type CalculateResponse = z.infer<typeof CalculateResponseSchema>;
export type BreakdownItem = z.infer<typeof BreakdownItemSchema>;

export const CountriesResponseSchema = z.object({
  available_countries: z.array(z.string()),
  electricity_factors: z.record(z.string(), z.number()),
});

export type CountriesResponse = z.infer<typeof CountriesResponseSchema>;

export const ElectricityFactorResponseSchema = z.object({
  country: z.string(),
  electricity_factor_kg_per_kwh: z.number(),
  is_default_factor: z.boolean(),
});

export type ElectricityFactorResponse = z.infer<typeof ElectricityFactorResponseSchema>;

// Form Schema (combines request schema with default values for form)
export const CarbonFootprintFormSchema = CalculateRequestSchema.extend({
  // Add any form-specific fields or refinements here if needed
});

export type CarbonFootprintFormValues = z.infer<typeof CarbonFootprintFormSchema>;