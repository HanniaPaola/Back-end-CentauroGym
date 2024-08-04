import { Router } from 'express';
import { getProductsales, getProductsaleById, createProductsale, updateProductsale, deleteProductsale } from '../controller/productsaleController';

const productsaleRoutes: Router = Router();

productsaleRoutes.get('/', getProductsales);
productsaleRoutes.get('/:product_sale_id', getProductsaleById);
productsaleRoutes.post('/', createProductsale);
productsaleRoutes.put('/:product_sale_id', updateProductsale);
productsaleRoutes.delete('/:product_sale_id', deleteProductsale);

export default productsaleRoutes;


