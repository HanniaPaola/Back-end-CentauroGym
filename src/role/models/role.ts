// models/role.ts
export interface Role {
    roleId?: number;
    name: string;
    description: string;
    createdAt?: string;
    createdBy: string;
    updatedAt?: string;
    updatedBy: string;
    deleted: boolean;
}


