// types/index.ts
export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  countInStock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}
