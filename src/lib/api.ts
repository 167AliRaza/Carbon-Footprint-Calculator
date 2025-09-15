import {
  CalculateRequest,
  CalculateResponseSchema,
  CountriesResponseSchema,
  ElectricityFactorResponseSchema,
} from "./schemas";

const BASE_URL = "https://167aliraza-agentic-carbon-footprint-assistant.hf.space";

export async function calculateCarbonFootprint(
  data: CalculateRequest
): Promise<typeof CalculateResponseSchema._type> {
  const response = await fetch(`${BASE_URL}/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to calculate carbon footprint");
  }

  const result = await response.json();
  return CalculateResponseSchema.parse(result);
}

export async function getAvailableCountries(): Promise<
  typeof CountriesResponseSchema._type
> {
  const response = await fetch(`${BASE_URL}/countries`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch countries");
  }

  const result = await response.json();
  return CountriesResponseSchema.parse(result);
}

export async function getCountryElectricityFactor(
  country: string
): Promise<typeof ElectricityFactorResponseSchema._type> {
  const response = await fetch(`${BASE_URL}/electricity-factor/${country}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || `Failed to fetch electricity factor for ${country}`
    );
  }

  const result = await response.json();
  return ElectricityFactorResponseSchema.parse(result);
}

// You can add more API functions here for other endpoints if needed,
// e.g., getEmissionFactors, partial calculations.