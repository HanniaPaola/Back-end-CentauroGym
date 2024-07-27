export interface Contact {
    contact_id?: number;
    contact_number: string;
    address: string;
    created_at: string;  // Usar string para fechas
    created_by: string;
    updated_at?: string;  // Opcional
    updated_by?: string;  // Opcional
    deleted: boolean;
}



