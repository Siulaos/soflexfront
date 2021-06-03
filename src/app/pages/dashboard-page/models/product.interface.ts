export interface IProduct {
  id?: number;
  name?: string;
  quantity?: string;
  price?: number;
  state?: TypeState;
}

export interface IDate {
  year?: number;
  month?: number;
  day?: number;
}

export type TypeState = 'save' | 'edit' | 'delete' | '';
