import { IPrice } from './IPrice';

export interface IProduct {
    photo: string;
    price: IPrice;
    product_name: string;
    product_production_description: string;
    count: number;
}