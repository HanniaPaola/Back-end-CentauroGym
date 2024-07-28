import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Employee } from '../models/Employee';

export class EmployeeRepository {

  public static async findAll(): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT employee_id, email, role_id FROM employee', (error: any, results) => {
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
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id], (error: any, results) => {
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

  public static async findByEmail(email: string): Promise<Employee | null> {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM employee WHERE email = ?', [email], (error: any, results) => {
            if (error) {
                console.error('Error querying database:', error);
                reject(error);
            } else {
                const employees: Employee[] = results as Employee[];
                if (employees.length > 0) {
                    console.log('Employee found:', employees[0]);
                    resolve(employees[0]);
                } else {
                    console.log('No employee found with email:', email);
                    resolve(null);
                }
            }
        });
    });
}


  public static async createEmployee(employee: Employee): Promise<Employee> {
    const query = 'INSERT INTO employee (email, role_id, password, personal_info_id, contact_id, safe_number, salary, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(employee);
    return new Promise((resolve, reject) => {
      connection.execute(query, [employee.email, employee.role_id, employee.password, employee.personal_info_id, employee.contact_id, employee.safe_number, employee.salary, employee.created_at, employee.created_by, employee.updated_at, employee.updated_by, employee.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdEmployeeId = result.insertId;
          const createdEmployee: Employee = { ...employee, employee_id: createdEmployeeId };
          resolve(createdEmployee);
        }
      });
    });
  }

  public static async updateEmployee(employee_id: number, employeeData: Employee): Promise<Employee | null> {
    const query = 'UPDATE employee SET email = ?, role_id = ?, password = ?, personal_info_id=?, contact_id=?, safe_number=?, salary=?, updated_at = ?, updated_by = ?, deleted = ? WHERE employee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [employeeData.email, employeeData.role_id, employeeData.password, employeeData.personal_info_id, employeeData.contact_id, employeeData.safe_number, employeeData.salary, employeeData.updated_at, employeeData.updated_by, employeeData.deleted, employee_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: Employee = { ...employeeData, employee_id: employee_id };
            resolve(updatedEmployee);
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
      connection.execute(query, [employee_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}

