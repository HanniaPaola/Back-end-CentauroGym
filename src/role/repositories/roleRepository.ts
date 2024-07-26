// src/repositories/RoleRepository.ts
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Role } from '../models/role';

export class RoleRepository {

  public static async findAll(): Promise<Role[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM role', (error, results) => {
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
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM role WHERE role_id = ?', [role_id], (error, results) => {
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

  public static async createRole(role: Role): Promise<Role> {
    const query = 'INSERT INTO role (name, description, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [role.name, role.description, role.created_at, role.created_by, role.updated_at, role.updated_by, role.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdRoleId = result.insertId;
          const createdRole: Role = { ...role, role_id: createdRoleId };
          resolve(createdRole);
        }
      });
    });
  }

  public static async updateRole(role_id: number, role: Role): Promise<Role | null> {
    const query = 'UPDATE role SET name = ?, description = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE role_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [role.name, role.description, role.updated_at, role.updated_by, role.deleted, role_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedRole: Role = { ...role, role_id };
            resolve(updatedRole);
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
      connection.execute(query, [role_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
