// Base API URL configuration
export const BASE_URL = 'http://206.162.244.175:5020/api/v1'; // Update with actual backend URL

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

export async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    console.log(`🌐 [API Request] ${options.method || 'GET'} -> ${url}`);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    console.log(`✅ [API Response ${response.status}] ${url}:`, JSON.stringify(data).substring(0, 150));

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred during request',
        error: data,
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error: any) {
    console.error(`❌ [API Error] ${url}:`, error.message || error);
    return {
      success: false,
      message: error.message || 'Network request failed',
      error,
    };
  }
}

export async function uploadRequest<T = any>(
  endpoint: string,
  formData: FormData
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {};
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    console.log(`📤 [API Upload Request] POST -> ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Image upload failed',
        error: data,
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error: any) {
    console.error(`❌ [Upload Error] ${url}:`, error.message || error);
    return {
      success: false,
      message: error.message || 'Network upload failed',
      error,
    };
  }
}
