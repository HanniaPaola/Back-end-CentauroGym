import { Request, Response } from 'express';
import { SaleService } from '../service/saleService';

export const getSales = async (_req: Request, res: Response) => {
  try {
    const sales = await SaleService.getAllSales();
    if (sales.length > 0) {
      res.status(200).json(sales);
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
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: 'No se encontró la venta' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const newSale = await SaleService.addSale(req.body);
    if (newSale) {
      res.status(201).json(newSale);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const updatedSale = await SaleService.modifySale(parseInt(req.params.sale_id, 10), req.body);
    if (updatedSale) {
      res.status(200).json(updatedSale);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const deleted = await SaleService.deleteSale(parseInt(req.params.sale_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó la venta.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


