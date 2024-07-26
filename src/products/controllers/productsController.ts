// src/controllers/productController.ts
import { Request, Response } from 'express';
import { ProductService } from '../service/productsService';

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await ProductService.getAllProducts();
        if (products) {
            res.status(201).json(products);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.getProductById(parseInt(req.params.product_id, 10));
        if (product) {
            res.status(201).json(product);
        } else {
            res.status(404).json({ message: 'No se encontró el producto' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        if(!req.file){
            res.status(404).json({ message: 'No se subio imagenes' });
            return
        }
        const newProduct = await ProductService.addProduct(req.body, req.file);
        if (newProduct) {
            res.status(201).json(newProduct);
        } else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await ProductService.modifyProduct(parseInt(req.params.product_id, 10), req.body);
        if (updatedProduct) {
            res.status(201).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deleted = await ProductService.deleteProduct(parseInt(req.params.product_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el producto.' });
        } else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
