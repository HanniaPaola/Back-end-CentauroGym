export interface PersonalInfo {
    personal_info_id?: number;
    name: string;
    second_name: string;
    last_name_paternal: string;
    last_name_maternal: string;
    birthday: string;  // Usar string para fechas
    sex: string;
    blood_type: string;
    created_at: string;  // Usar string para fechas
    created_by: string;
    updated_at?: string;  // Opcional
    updated_by?: string;  // Opcional
    deleted: boolean;
}



