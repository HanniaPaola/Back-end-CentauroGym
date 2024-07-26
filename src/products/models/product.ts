export interface Product {
    product_id?: number;
    name_product: string;
    url:string;
    type_product_id?: number | null; 
    expiration: string;
    price: number;
    stock: number;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted: boolean;
}

