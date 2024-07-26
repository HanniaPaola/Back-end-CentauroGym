// src/models/MedicalRecord.ts
export interface MedicalRecord {
  medical_record_id?: number;
  gender: string;
  weight: number;
  ideal_weight: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  deleted: boolean;
}



