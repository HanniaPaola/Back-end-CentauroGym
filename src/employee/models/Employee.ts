export interface Employee {
    employee_id?: number;
    role_id: number;
    password: string;
    personal_info_id: number;
    contact_id: number;
    safe_number: number;
    created_at: string;
    created_by: string;
    updated_at?: string;
    updated_by?: string;
    deleted: boolean;
}


