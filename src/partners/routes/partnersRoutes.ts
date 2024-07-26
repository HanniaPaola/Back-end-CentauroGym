// src/partners/routes/partnerRoutes.ts
import { Router } from 'express';
import { getPartners, getPartnerById, createPartner, updatePartner, deletePartner } from '../controllers/partnersController';

const partnerRoutes: Router = Router();

partnerRoutes.get('/', getPartners);
partnerRoutes.get('/:partner_id', getPartnerById);
partnerRoutes.post('/', createPartner);
partnerRoutes.put('/:partner_id', updatePartner);
partnerRoutes.delete('/:partner_id', deletePartner);

export default partnerRoutes;




