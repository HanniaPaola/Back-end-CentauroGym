// src/models/TrainingPlan.ts
export interface TrainingPlan {
    plan_id?: number;
    plan_description: string;
    plan_duration: string;
    result: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
    deleted: boolean;
}
