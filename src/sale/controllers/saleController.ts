import { Request, Response } from 'express';
import { SaleService } from '../service/saleService';
import { Sale } from '../models/sale';

export const getSales = async (_req: Request, res: Response) => {
  try {
    const sales = await SaleService.getAllSales();
    if (sales) {
      res.status(201).json(sales);
    } else {
      res.status(404).json({ message: 'No se encontraron ventas' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const sale = await SaleService.getSaleById(parseInt(req.params.sale_id, 10));
    if (sale) {
      res.status(201).json(sale);
    } else {
      res.status(404).json({ message: 'No se encontró la venta' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const newSale: Sale = req.body;
    const createdSale = await SaleService.createSale(newSale);
    if (createdSale) {
      res.status(201).json(createdSale);
    } else {
      res.status(404).json({ message: 'Algo salió mal al crear la venta' });
    }
  } catch (error: any) {
    res.status (500).json({ error: error.message });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const updatedSale = await SaleService.updateSale(parseInt(req.params.sale_id, 10), req.body);
    if (updatedSale) {
      res.status(201).json(updatedSale);
    } else {
      res.status(404).json({ message: 'Algo salió mal al actualizar la venta' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const deleted = await SaleService.deleteSale(parseInt(req.params.sale_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Venta eliminada con éxito' });
    } else {
      res.status(404).json({ message: 'No se encontró la venta a eliminar' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



