// /types/plan.ts
export interface Plan {
  title: string;
  slug: string;
  image: string;
  images?: string[];
  available: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  features?: string[];
  yearlyFeatures: string[];
  monthlyFeatures: string[];
  popular: boolean;
  description: string;
}
export interface PlanType {
  _id?: string;
  title: string;
  monthlyPrice: string;
  monthlyFeatures: string[];
  images?: string[];
  slug: string;
}
