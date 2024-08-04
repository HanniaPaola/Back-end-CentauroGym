import { RoleRepository } from '../repositories/roleRepository';
import { Role } from '../models/role';
//import { DateUtils } from '../../shared/utils/DateUtils';

export class RoleService {

  public static async getAllRoles(): Promise<Role[]> {
    try {
      return await RoleRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener roles: ${error.message}`);
    }
  }

  public static async getRoleById(roleId: number): Promise<Role | null> {
    try {
      return await RoleRepository.findById(roleId);
    } catch (error: any) {
      throw new Error(`Error al encontrar rol: ${error.message}`);
    }
  }

  public static async addRole(role: Role) {
    try {
        role.created_at = new Date(); 
        role.updated_at = new Date();
        return await RoleRepository.createRole(role);
    } catch (error: any) {
        throw new Error(`Error al crear empleado: ${error.message}`);
    }
}

    public static async modifyRole(roleId: number, roleData: Role){
      try{
          const userFinded =  await RoleRepository.findById(roleId);

          if(userFinded){
              if(roleData.role_id){
                  userFinded.role_id = roleData.role_id;
              }
              
              if(roleData.created_by){
                  userFinded.created_by = roleData.created_by;
              }

              if(roleData.created_at){
                  userFinded.created_at = roleData.created_at;
              }

              if(roleData.updated_by){
                  userFinded.updated_by = roleData.updated_by;
              }
              
              if(roleData.updated_at){
                  userFinded.updated_at = roleData.updated_at;
              }

              if(roleData.deleted){
                  userFinded.deleted = roleData.deleted;
              }
          }else{
              return null;
          }
          userFinded.updated_by = roleData.updated_by
          userFinded.updated_at = new Date();
          return await RoleRepository.updateRole(roleId, userFinded);
      }catch (error: any){
          throw new Error(`Error al modificar empleado: ${error.message}`);
      }
  }

  public static async deleteRole(roleId: number): Promise<boolean> {
    try {
      return await RoleRepository.deleteRole(roleId);
    } catch (error: any) {
      throw new Error(`Error al eliminar rol: ${error.message}`);
    }
  }
}
