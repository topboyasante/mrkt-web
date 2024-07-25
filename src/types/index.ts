export type IListingCard = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  is_featured: boolean;
};

export type IUsr = {
  first_name: string;
  email: string;
  id: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

interface IUsrDataRes {
  first_name: string;
  last_name: string;
  phone_number: string;
  calling_code: string;
  id: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  user_id: string;
  user: IUsrDataRes;
  address: string;
  city: string;
  image_url: string;
  image_public_id: string;
  country: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_featured: boolean;
}

export interface BatchResponse {
  success: string;
  data: Product[];
}
export interface SingleResponse {
  success: string;
  data: Product;
}

export interface UserResponse {
  success: string;
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    calling_code: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
}
