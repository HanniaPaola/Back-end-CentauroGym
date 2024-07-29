// src/models/Partner.ts
export interface Partner {
  partner_id?: number;
  sheet_partner: string;
  personal_info_id?: number | null;
  contact_id?: number | null;
  medical_record_id?: number | null;
  plan_id?: number | null;
  role_id?:null;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  deleted: boolean;
}


  


