export interface IRestaurant {
  username: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  has_service_tax: boolean;
  canceled_at?: string | null;
}
