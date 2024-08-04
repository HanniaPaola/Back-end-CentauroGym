export interface Productsale {
    product_sale_id?: number;
    product_id: number | null;
    sale_id : number | null;
    created_by?: Date;     
    created_at?: Date;        
    updated_by?: string;      
    updated_at?: Date;       
    deleted?: boolean; 
  }

