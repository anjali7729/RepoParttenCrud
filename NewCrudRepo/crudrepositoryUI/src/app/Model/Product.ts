export interface Product{
    id:number | null;
    name:string;
    description:string;
    price?:number;
    cateName:string;
    brandName:string;
    image:string;
    profile?:string;
}