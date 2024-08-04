export interface Product {
    product_id?: number;
    name: string;
    marca: string;
    precio: number;
    image: string;
    created_by?: string;     
    created_at?: Date;        
    updated_by?: string;      
    updated_at?: Date;       
    deleted?: boolean; 
}
