import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { Employee } from "../models/Employee";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class EmployeeService {

    public static async login(email: string, password: string) {
        try {
            console.log(`Login attempt for email: ${email}`);
            const employee = await this.getEmployeeByEmail(email);
            if (!employee) {
                console.log('Employee not found');
                return null;
            }
            console.log('Employee found:', employee);
            
            const passwordMatch = await bcrypt.compare(password, employee.password);
            if (!passwordMatch) {
                console.log('Password does not match');
                return null;
            }
            
            console.log('Password matches');
            const payload = {
                employee_id: employee.employee_id,
                role_id: employee.role_id,
                email: employee.email
            };
            
            const token = await jwt.sign(payload, secretKey, { expiresIn: '10m' });
            console.log('Token generated:', token);
            return token;
    
        } catch (error: any) {
            console.error('Error during login:', error);
            throw new Error(`Error al logearse: ${error.message}`);
        }
    }
    

    public static async getAllEmployees(): Promise<Employee[]> {
        try{
            return await EmployeeRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getEmployeeById(employeeId: number): Promise<Employee | null> {
        try{
            return await EmployeeRepository.findById(employeeId);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async getEmployeeByEmail(email: string): Promise<Employee | null> {
        try{
            return await EmployeeRepository.findByEmail(email);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addEmployee(employee: Employee) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            employee.created_at = DateUtils.formatDate(new Date());
            employee.updated_at = DateUtils.formatDate(new Date());
            employee.password = await bcrypt.hash(employee.password, salt);
            return await EmployeeRepository.createEmployee(employee);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyEmployee(employeeId: number, employeeData: Employee){
        try{
            const employeeFinded =  await EmployeeRepository.findById(employeeId);
            const salt = await bcrypt.genSalt(saltRounds);

            if(employeeFinded){
                if(employeeData.email){
                    employeeFinded.email = employeeData.email;
                }
                if(employeeData.password){
                    employeeFinded.password = await bcrypt.hash(employeeData.password, salt);
                }
                if(employeeData.role_id){
                    employeeFinded.role_id = employeeData.role_id;
                }
                if(employeeData.deleted){
                    employeeFinded.deleted = employeeData.deleted;
                }
            }else{
                return null;
            }
            employeeFinded.updated_by = employeeData.updated_by
            employeeFinded.updated_at = DateUtils.formatDate(new Date());
            return await EmployeeRepository.updateEmployee(employeeId, employeeFinded);
        }catch (error: any){
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteEmployee(employeeId: number): Promise<boolean> {
        try{
            return await EmployeeRepository.deleteEmployee(employeeId);
        }catch (error: any){
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }

}

