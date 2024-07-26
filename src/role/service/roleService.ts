// services/roleService.ts
import { RoleRepository } from '../repositories/roleRepository';
import { Role } from '../models/role';

export class RoleService {
  public static async getAllRoles(): Promise<Role[]> {
    return RoleRepository.findAll();
  }

  public static async getRoleById(role_id: number): Promise<Role | null> {
    return RoleRepository.findById(role_id);
  }

  public static async createRole(role: Role): Promise<Role> {
    return RoleRepository.createRole(role);
  }

  public static async updateRole(role_id: number, roleData: Role): Promise<Role | null> {
    return RoleRepository.updateRole(role_id, roleData);
  }

  public static async deleteRole(role_id: number): Promise<boolean> {
    return RoleRepository.deleteRole(role_id);
  }
}
