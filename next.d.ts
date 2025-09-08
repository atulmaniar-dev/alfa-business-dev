// next.d.ts
import 'next';

declare module 'next/server' {
  interface NextRequest {
    nextUrl: URL;
  }
  
  interface RouteParams {
    params: {
      id: string;
    };
  }
}