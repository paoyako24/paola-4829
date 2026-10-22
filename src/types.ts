export interface User {
  username: string;
  token: string;
}

export interface SnailData {
  id: string;
  name: string;
  speed: number;
  energy: number;
}

export interface PaymentResponse {
  status: 'SUCCESS' | 'TRANSACTION_ERROR' | 'SYSTEM_ERROR';
  message: string;
}