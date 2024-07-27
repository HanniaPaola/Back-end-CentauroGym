// src/models/SaleProduct.ts
export interface SaleProduct {
    sale_product_id?: number;
    product_id?: number | null;
    sale_id?: number | null;
    quantity: number;
  }
  
