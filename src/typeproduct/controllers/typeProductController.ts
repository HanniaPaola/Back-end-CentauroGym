// src/controllers/typeProductController.ts
import { Request, Response } from 'express';
import { TypeProductService } from '../service/typeProductService';

export const getTypeProducts = async (_req: Request, res: Response) => {
  try {
    const typeProducts = await TypeProductService.getAllTypeProducts();
    if (typeProducts) {
      res.status(201).json(typeProducts);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTypeProductById = async (req: Request, res: Response) => {
  try {
    const typeProduct = await TypeProductService.getTypeProductById(parseInt(req.params.type_product_id, 10));
    if (typeProduct) {
      res.status(201).json(typeProduct);
    } else {
      res.status(404).json({ message: 'No se encontró el producto' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTypeProduct = async (req: Request, res: Response) => {
  try {
    const newTypeProduct = await TypeProductService.addTypeProduct(req.body);
    if (newTypeProduct) {
      res.status(201).json(newTypeProduct);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTypeProduct = async (req: Request, res: Response) => {
  try {
    const updatedTypeProduct = await TypeProductService.modifyTypeProduct(parseInt(req.params.type_product_id, 10), req.body);
    if (updatedTypeProduct) {
      res.status(201).json(updatedTypeProduct);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTypeProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await TypeProductService.deleteTypeProduct(parseInt(req.params.type_product_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el producto.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
