import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { Employee } from "../models/Employee";

export class EmployeeService {

    public static async getAllEmployees(): Promise<Employee[]> {
        try {
            return await EmployeeRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getEmployeeById(employee_id: number): Promise<Employee | null> {
        try {
            return await EmployeeRepository.findById(employee_id);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async createEmployee(employee: Employee): Promise<Employee> {
        try {
            // Lógica de negocio antes de crear el empleado si es necesaria
            return await EmployeeRepository.createEmployee(employee);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async updateEmployee(employee_id: number, employeeData: Employee): Promise<Employee | null> {
        try {
            // Lógica de negocio antes de actualizar el empleado si es necesaria
            return await EmployeeRepository.updateEmployee(employee_id, employeeData);
        } catch (error: any) {
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteEmployee(employee_id: number): Promise<boolean> {
        try {
            // Lógica de negocio antes de eliminar el empleado si es necesaria
            return await EmployeeRepository.deleteEmployee(employee_id);
        } catch (error: any) {
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }
}

