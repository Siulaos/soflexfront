import { IDate } from './product.interface';
export class Order {
  id!: number;
  date!: IDate;
  clientName!: string;
  deleted!: number;
  products!: IProduct[];
}

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

export interface IClientName {
  name: string;
}
