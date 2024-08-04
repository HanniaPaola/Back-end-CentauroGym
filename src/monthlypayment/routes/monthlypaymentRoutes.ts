import { Router } from 'express';
import { getMonthlypayment, getMonthlypaymentById, createMonthlypayment, updateMonthlypayment, deleteMonthlypayment } from '../controllers/monthlypaymentController';

const monthlypaymentRoutes: Router = Router();

monthlypaymentRoutes.get('/', getMonthlypayment); 
monthlypaymentRoutes.get('/:monthly_payment_id', getMonthlypaymentById); 
monthlypaymentRoutes.post('/', createMonthlypayment); 
monthlypaymentRoutes.put('/:monthly_payment_id', updateMonthlypayment); 
monthlypaymentRoutes.delete('/:monthly_payment_id', deleteMonthlypayment); 

export default monthlypaymentRoutes;

