// Global TypeScript definitions for SEO

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Cloudinary Image Type
interface CloudinaryImage {
  public_id: string;
  url: string;
  format: string;
  width: number;
  height: number;
}

// SEO Metadata Type
interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    images: string[];
    url: string;
    type: string;
  };
}

// Plan Type for Coworking
interface PlanType {
  _id: string;
  title: string;
  slug: string;
  monthlyPrice: number;
  yearlyPrice?: number;
  description: string;
  monthlyFeatures: string[];
  yearlyFeatures?: string[];
  images: string[];
  available: boolean;
  popular?: boolean;
}

// Amenity Type
interface AmenityType {
  _id: string;
  amenitiesName: string;
  tag: string;
  description: string;
  image: string[];
}

// Gallery Type
interface GalleryType {
  imageType: string;
  images: string[];
}

export {};