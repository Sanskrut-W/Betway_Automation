export interface LocatorConfig {
  key?: string;
  type?: string;
  value?: string;
  options?: any;
  nth?: number;
}

export interface LocatorMetadata {
  description: string;
  context: string;
  lastUpdated?: string;
}

export interface HealedLocator {
  key: string;
  locator: string;
}