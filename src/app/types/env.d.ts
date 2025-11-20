namespace NodeJS {
  interface ProcessEnv {
    // Database
    MONGODB_URI: string;
    
    // Cloudinary
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    
    // Authentication
    JWT_SECRET: string;
    
    // Google Services
    GOOGLE_ANALYTICS_ID: string;
    GOOGLE_SITE_VERIFICATION: string;
    RECAPTCHA_SECRET_KEY: string;
    
    // Next.js Public
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_SITE_NAME: string;
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  }
}