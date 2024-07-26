import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Employee } from '../models/Employee';

export class EmployeeRepository {

  public static async findAll(): Promise<Employee[]> {
    const query = 'SELECT * FROM employee';
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: Employee[] = results as Employee[];
          resolve(employees);
        }
      });
    });
  }

  public static async findById(employee_id: number): Promise<Employee | null> {
    const query = 'SELECT * FROM employee WHERE employee_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, [employee_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: Employee[] = results as Employee[];
          if (employees.length > 0) {
            resolve(employees[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createEmployee(employee: Employee): Promise<Employee> {
    const { role_id, password, personal_info_id, contact_id, safe_number, created_at, created_by, updated_at, updated_by, deleted } = employee;
    const query = `
        INSERT INTO employee (role_id, password, personal_info_id, contact_id, safe_number, created_at, created_by, updated_at, updated_by, deleted) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [role_id, password, personal_info_id, contact_id, safe_number, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

    return new Promise((resolve, reject) => {
      connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const createdEmployeeId = (result as ResultSetHeader).insertId;
          const createdEmployee: Employee = { ...employee, employee_id: createdEmployeeId };
          resolve(createdEmployee);
        }
      });
    });
  }

  public static async updateEmployee(employee_id: number, employeeData: Employee): Promise<Employee | null> {
    const { role_id, password, personal_info_id, contact_id, safe_number, updated_at, updated_by, deleted } = employeeData;
    const query = `
        UPDATE employee 
        SET role_id = ?, password = ?, personal_info_id = ?, contact_id = ?, safe_number = ?, updated_at = ?, updated_by = ?, deleted = ? 
        WHERE employee_id = ?
    `;
    const values = [role_id, password, personal_info_id, contact_id, safe_number, updated_at, updated_by, deleted ? 1 : 0, employee_id];

    return new Promise((resolve, reject) => {
      connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if ((result as ResultSetHeader).affectedRows > 0) {
            resolve({ ...employeeData, employee_id: employee_id });
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteEmployee(employee_id: number): Promise<boolean> {
    const query = 'DELETE FROM employee WHERE employee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [employee_id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          if ((result as ResultSetHeader).affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el empleado a eliminar
          }
        }
      });
    });
  }
}

