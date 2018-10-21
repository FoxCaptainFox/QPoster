import { IPrice } from './IPrice';

export interface IProduct {
    product_id: string;
    photo: string;
    price: IPrice;
    product_name: string;
    product_production_description: string;
    count: number;
}