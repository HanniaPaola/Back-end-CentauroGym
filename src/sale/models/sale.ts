export interface Sale {
    sale_id?: number;
    total: number;
    datetime_sale: string; // Utiliza string para manejar fechas
    amount: number;
    created_at: string; // Utiliza string para manejar fechas
    created_by: string;
    updated_at?: string; // Utiliza string para manejar fechas
    updated_by?: string;
    deleted: boolean;
}


