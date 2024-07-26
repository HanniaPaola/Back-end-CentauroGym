// routes/roleRoutes.ts
import express from 'express';
import { getRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/roleController';

const router = express.Router();

router.get('/', getRoles);
router.get('/:role_id', getRoleById);
router.post('/', createRole);
router.put('/:role_id', updateRole);
router.delete('/:role_id', deleteRole);

export default router;





