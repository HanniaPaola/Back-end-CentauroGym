import express from 'express';
import {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
} from '../controllers/saleController';

const router = express.Router();

router.get('/', getSales);
router.get('/:sale_id', getSaleById);
router.post('/', createSale);
router.put('/:sale_id', updateSale);
router.delete('/:sale_id', deleteSale);

export default router;
