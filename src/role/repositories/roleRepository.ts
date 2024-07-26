// repositories/roleRepository.ts
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Role } from '../models/role';

export class RoleRepository {
  public static async findAll(): Promise<Role[]> {
    const query = 'SELECT * FROM role'; // Asegúrate de que el nombre de la tabla sea correcto
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const roles: Role[] = results as Role[];
          resolve(roles);
        }
      });
    });
  }

  public static async findById(role_id: number): Promise<Role | null> {
    const query = 'SELECT * FROM role WHERE role_id = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, [role_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const roles: Role[] = results as Role[];
          if (roles.length > 0) {
            resolve(roles[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createRole(roleData: Role): Promise<Role> {
    const query = 'INSERT INTO role (name, description, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      roleData.name,
      roleData.description,
      new Date(),
      roleData.createdBy,
      new Date(),
      roleData.updatedBy,
      roleData.deleted ? 1 : 0,
    ];

    return new Promise((resolve, reject) => {
      connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const insertedId = (result as ResultSetHeader).insertId;
          resolve({ ...roleData, roleId: insertedId });
        }
      });
    });
  }

  public static async updateRole(role_id: number, roleData: Role): Promise<Role | null> {
    const { name, description, updatedBy, deleted } = roleData;
    const query = 'UPDATE role SET name = ?, description = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE role_id = ?';
    const values = [name, description, new Date(), updatedBy, deleted ? 1 : 0, role_id];

    return new Promise((resolve, reject) => {
      connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if ((result as ResultSetHeader).affectedRows > 0) {
            resolve({ ...roleData, roleId: role_id });
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteRole(role_id: number): Promise<boolean> {
    const query = 'DELETE FROM role WHERE role_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [role_id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          if ((result as ResultSetHeader).affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}

