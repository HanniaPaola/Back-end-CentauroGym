import { Request, Response } from 'express';
import { ProductsaleService } from '../service/productsaleService';

export const getProductsales = async (_req: Request, res: Response) => {
  try {
    const productsales = await ProductsaleService.getAllProductsales();
    if (productsales) {
      res.status(200).json(productsales);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsaleById = async (req: Request, res: Response) => {
  try {
    const productsale = await ProductsaleService.getProductsaleById(parseInt(req.params.product_sale_id, 10));
    if (productsale) {
      res.status(200).json(productsale);
    } else {
      res.status(404).json({ message: 'No se encontró el registro' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProductsale = async (req: Request, res: Response) => {
  try {
    const newProductsale = await ProductsaleService.addProductsale(req.body);
    if (newProductsale) {
      res.status(201).json(newProductsale);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductsale = async (req: Request, res: Response) => {
  try {
    const updatedProductsale = await ProductsaleService.modifyProductsale(parseInt(req.params.product_sale_id, 10), req.body);
    if (updatedProductsale) {
      res.status(200).json(updatedProductsale);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductsale = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductsaleService.deleteProductsale(parseInt(req.params.product_sale_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó el registro.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
