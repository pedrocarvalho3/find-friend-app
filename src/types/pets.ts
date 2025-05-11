
export type PetSize = "SMALL" | "MEDIUM" | "LARGE";
export type PetAge = "PUPPY" | "ADULT" | "ELDERLY";
export type EnergyLevel = "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
export type DependencyLevel = "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
export type Environment = "SMALL_SPACE" | "MEDIUM_SPACE" | "LARGE_SPACE";

export interface Pet {
  id: string;
  name: string;
  description: string;
  age: string;
  size: PetSize;
  energy_level: EnergyLevel;
  environment: Environment;
  photos: string[];
  organization_id: string;
  city: string;
  is_available: boolean;
}

export interface FindAllPetsParams {
  city: string;
  age?: PetAge;
  size?: PetSize;
  energy_level?: EnergyLevel;
  dependency_level?: DependencyLevel
  environment?: Environment;
}