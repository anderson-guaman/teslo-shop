import { IUser } from "../../auth/interfaces/user.interface";

export interface IProductsResponse {
  count:    number;
  pages:    number;
  products: IProduct[];
}

export interface IProduct {
  id?:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  sizes:       string[];
  gender:      string;
  tags:        string[];
  images:      string[];
  user?:        IUser;
}


