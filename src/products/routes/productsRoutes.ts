// src/routes/ProductRoutes.ts
import { Router } from 'express';
import upload from '../../shared/middlewares/uploadMiddleware';

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productsController';

const productRoutes: Router = Router();

productRoutes.get('/', getProducts);
productRoutes.get('/:product_id', getProductById);
productRoutes.put('/:product_id', updateProduct);
productRoutes.delete('/:product_id', deleteProduct);
//Aquí se coloca el Middleware V----------V----Este es el atributo del req que se recibirá
productRoutes.post('/', upload.single('productImage'), createProduct);


export default productRoutes;

