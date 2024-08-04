export interface Sale {
    sale_id?: number;
    product_id: number | null;
    precio: number;
    created_by?: string;     
    created_at?: Date;        
    updated_by?: string;      
    updated_at?: Date;       
    deleted?: boolean;
}

