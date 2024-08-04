import { Router } from 'express';
import { getRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/roleController';

const rolesRoutes: Router = Router();

rolesRoutes.get('/', getRoles);
rolesRoutes.get('/:role_id', getRoleById);
rolesRoutes.post('/', createRole);
rolesRoutes.put('/:role_id', updateRole);
rolesRoutes.delete('/:role_id', deleteRole);

export default rolesRoutes;






