import { Router } from 'express';
import { getProductsales, getProductsaleById, createProductsale, updateProductsale, deleteProductsale } from '../controller/productsaleController';
import productsaleRoutes from '../../products/routes/productsRoutes';

const router = Router();

router.get('/productsale', getProductsales);
router.get('/productsale/:product_sale_id', getProductsaleById);
router.post('/productsale', createProductsale);
router.put('/productsale/:product_sale_id', updateProductsale);
router.delete('/productsale/:product_sale_id', deleteProductsale);

export default productsaleRoutes;
