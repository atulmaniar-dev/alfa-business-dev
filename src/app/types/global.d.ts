// Global TypeScript declarations for third-party libraries

interface Window {
  grecaptcha: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
    render: (container: string | Element, parameters: any) => number;
  };
}

// Google reCAPTCHA types
declare namespace grecaptcha {
  function ready(callback: () => void): void;
  function execute(siteKey: string, options: { action: string }): Promise<string>;
  function render(container: string | Element, parameters: any): number;
}