import type { Service, BookingData, PaymentPayload } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.makemybhagya.com/v1';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async fetchServicesByCategory(category: string): Promise<Service[]> {
    return this.request<Service[]>(`/services/${category}`);
  }

  async fetchFeaturedService(): Promise<Service> {
    return this.request<Service>('/services/featured');
  }

  async submitBooking(data: BookingData): Promise<{ success: boolean; message: string }> {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyPayment(data: PaymentPayload): Promise<{ success: boolean; message: string }> {
    return this.request('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
