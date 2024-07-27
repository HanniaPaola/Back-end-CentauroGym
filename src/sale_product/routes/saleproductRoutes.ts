import { Router } from 'express';
import { getSaleProducts, getSaleProductById, createSaleProduct, updateSaleProduct, deleteSaleProduct } from '../controller/saleproductController';

const saleProductRoutes: Router = Router();

saleProductRoutes.get('/', getSaleProducts);
saleProductRoutes.get('/:sale_product_id', getSaleProductById);
saleProductRoutes.post('/', createSaleProduct);
saleProductRoutes.put('/:sale_product_id', updateSaleProduct);
saleProductRoutes.delete('/:sale_product_id', deleteSaleProduct);

export default saleProductRoutes;
