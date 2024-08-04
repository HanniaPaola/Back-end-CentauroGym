import express from 'express';

import { getMonthlypayment, getMonthlypaymentById, createMonthlypayment, updateMonthlypayment, deleteMonthlypayment } from '../controllers/monthlypaymentController';

const router = express.Router();

router.get('/', getMonthlypayment); 
router.get('/:monthly_payment_id', getMonthlypaymentById); 
router.post('/', createMonthlypayment); 
router.put('/:monthly_payment_id', updateMonthlypayment); 
router.delete('/:monthly_payment_id', deleteMonthlypayment); 

export default router;
