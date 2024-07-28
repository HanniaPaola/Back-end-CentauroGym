export interface EmployeePayload {
    employee_id: number;
    email: string;
    password: string;
    role_id?: number | null;
}