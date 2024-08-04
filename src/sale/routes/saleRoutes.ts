import { Router } from 'express';
import {getSales, getSaleById, createSale, updateSale, deleteSale} from '../controllers/saleController';

const saleRoutes: Router = Router();

saleRoutes.get('/', getSales);
saleRoutes.get('/:sale_id', getSaleById);
saleRoutes.post('/', createSale);
saleRoutes.put('/:sale_id', updateSale);
saleRoutes.delete('/:sale_id', deleteSale);

export default saleRoutes;
