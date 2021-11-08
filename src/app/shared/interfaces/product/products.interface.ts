import { ICategorysResponse } from "../category/category.interface";

export interface IProductResponse{
    id: number;
    name: string;
    description: string;
    category: ICategorysResponse;
    price: number;
    imagePath: string;
}

export interface IProductRequest{
    id: number;
    name: string;
    description: string;
    category: ICategorysResponse;
    price: number;
    imagePath: string;
}