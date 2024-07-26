// src/typeproduct/routes/typeProductRoutes.ts
import { Router } from 'express';
import { getTypeProducts, getTypeProductById, createTypeProduct, updateTypeProduct, deleteTypeProduct } from '../controllers/typeProductController';

const typeProductRoutes: Router = Router();

typeProductRoutes.get('/', getTypeProducts);
typeProductRoutes.get('/:type_product_id', getTypeProductById);
typeProductRoutes.post('/', createTypeProduct);
typeProductRoutes.put('/:type_product_id', updateTypeProduct);
typeProductRoutes.delete('/:type_product_id', deleteTypeProduct);

export default typeProductRoutes;


