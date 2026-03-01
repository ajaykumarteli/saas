export type Plan = "free" | "pro";

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  plan: Plan;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SettingsFormData {
  name: string;
  company: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  isPro: boolean;
  icon: string;
}

export interface PricingPlan {
  id: Plan;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}
