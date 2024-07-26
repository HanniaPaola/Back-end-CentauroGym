// controllers/roleController.ts
import { Request, Response } from 'express';
import { RoleService } from '../service/roleService'; // Asegúrate de que la ruta sea correcta
import { Role } from '../models/role';

export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  const role_id = parseInt(req.params.role_id, 10);
  if (isNaN(role_id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const role = await RoleService.getRoleById(role_id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Role no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el role' });
  }
};

export const createRole = async (req: Request, res: Response) => {
  const roleData: Role = req.body;
  try {
    const newRole = await RoleService.createRole(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el role' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const role_id = parseInt(req.params.role_id, 10);
  if (isNaN(role_id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  const roleData: Role = req.body;
  try {
    const updatedRole = await RoleService.updateRole(role_id, roleData);
    if (updatedRole) {
      res.json(updatedRole);
    } else {
      res.status(404).json({ error: 'Role no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el role' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const role_id = parseInt(req.params.role_id, 10);
  if (isNaN(role_id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const success = await RoleService.deleteRole(role_id);
    if (success) {
      res.json({ message: 'Role eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Role no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el role' });
  }
};





