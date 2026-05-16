export interface Service {
  id: string;
  title: string;
  price: string;
  summary: string;
  bullets: string[];
  badge: string;
  image?: string;
}

export interface BookingData {
  name: string;
  dob: string;
  email: string;
  phone: string;
  gender: string;
  profession?: string;
  serviceTitle: string;
}

export interface PaymentPayload {
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  serviceId: string;
  paymentId: string;
  orderId?: string;
  signature: string;
  amount: number;
}
