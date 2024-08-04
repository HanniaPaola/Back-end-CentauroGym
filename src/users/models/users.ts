export interface User {
    user_id?: number;        
    role_id: number | null; 
    name: string;
    last_name: string;
    email: string;
    password: string;
    created_by?: string;     
    created_at?: Date;        
    updated_by?: string;      
    updated_at?: Date;       
    deleted?: boolean;       
}




