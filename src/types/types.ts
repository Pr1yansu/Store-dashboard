export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  user: User;
  comment: string;
  rating: number;
}

export interface Color {
  _id: string;
  name: string;
  hex: string;
}

export interface Size {
  _id: string;
  variant: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  colors: Color[] | string[];
  sizes: Size[] | string[];
  reviews: Review[] | string[];
  images: string[];
  thumbnail: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  currency: string;
  colorIDs: string[];
  sizeIDs: string[];
  images: string[];
  categoryID: string;
}

export interface CreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
