export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
  category: string;
};

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}