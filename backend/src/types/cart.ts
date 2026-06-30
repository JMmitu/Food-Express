export interface FoodItemRef {
  _id: string;
  name: string;
  price: number;
  img?: string;
}

export interface CartItem {
  foodItem: FoodItemRef;
  quantity: number;
  price: number;
}

export interface Cart {
  _id?: string;
  user?: string;
  items: CartItem[];
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
}