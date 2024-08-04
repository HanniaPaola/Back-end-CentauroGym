export interface Monthlypayment  {
    monthly_payment_id?: number;        
    user_id: number | null; 
    precio: number;
    package: string;
    coach: string;
    created_by?: string;     
    created_at?: Date;        
    updated_by?: string;      
    updated_at?: Date;       
    deleted?: boolean;       
}
