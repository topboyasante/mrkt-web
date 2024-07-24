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
