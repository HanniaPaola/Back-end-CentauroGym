export interface Employee {
    employee_id?: number;
    email: string;
    password: string;
    role_id?: number | null;
    personal_info_id?: number | null;
    contact_id?: number | null;
    safe_number: number;
    salary: number;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted: boolean;
}


