import type { AppRouter } from "@/server"
import { createClient } from "jstack"

// Helper to determine the base URL for API requests
const getBaseUrl = () => {
  // Browser environment: use the current origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`;
  }

  // Server environment: use environment variable or default
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
};

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */
export const client = createClient<AppRouter>({
  baseUrl: getBaseUrl(),
})

// Create a logging wrapper for specific endpoints
export const loggedClient = {
  auth: {
    getDatabaseSyncStatus: {
      $get: async () => {
        console.log('Making request to getDatabaseSyncStatus');
        try {
          const response = await client.auth.getDatabaseSyncStatus.$get();
          console.log('Response received:', response.status);
          return response;
        } catch (error) {
          console.error('Request failed:', error);
          throw error;
        }
      }
    }
  }
};
