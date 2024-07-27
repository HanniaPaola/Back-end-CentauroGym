// src/controllers/saleProductController.ts
import { Request, Response } from 'express';
import { SaleProductService } from '../service/saleproductService';

export const getSaleProducts = async (_req: Request, res: Response) => {
  try {
    const saleProducts = await SaleProductService.getAllSaleProducts();
    if (saleProducts) {
      res.status(201).json(saleProducts);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSaleProductById = async (req: Request, res: Response) => {
  try {
    const saleProduct = await SaleProductService.getSaleProductById(parseInt(req.params.sale_product_id, 10));
    if (saleProduct) {
      res.status(201).json(saleProduct);
    } else {
      res.status(404).json({ message: 'No se encontró el producto de venta' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSaleProduct = async (req: Request, res: Response) => {
  try {
    const newSaleProduct = await SaleProductService.addSaleProduct(req.body);
    if (newSaleProduct) {
      res.status(201).json(newSaleProduct);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSaleProduct = async (req: Request, res: Response) => {
  try {
    const updatedSaleProduct = await SaleProductService.modifySaleProduct(parseInt(req.params.sale_product_id, 10), req.body);
    if (updatedSaleProduct) {
      res.status(201).json(updatedSaleProduct);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSaleProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await SaleProductService.deleteSaleProduct(parseInt(req.params.sale_product_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el producto de venta.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
