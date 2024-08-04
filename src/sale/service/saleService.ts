import { SaleRepository } from '../repositories/saleRepository';
import { Sale } from '../models/sale';

export class SaleService {
  public static async getAllSales(): Promise<Sale[]> {
    try {
      return await SaleRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener ventas: ${error.message}`);
    }
  }

  public static async getSaleById(sale_id: number): Promise<Sale | null> {
    try {
      return await SaleRepository.findById(sale_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar la venta: ${error.message}`);
    }
  }

  public static async addSale(sale: Sale): Promise<Sale> {
    try {
      sale.created_at = new Date(); 
      sale.updated_at = new Date();
      
      return await SaleRepository.createSale(sale);
    } catch (error: any) {
      throw new Error(`Error al crear la venta: ${error.message}`);
    }
  }

  public static async modifySale(sale_id: number, saleData: Sale): Promise<Sale | null> {
    try {
      const existingSale = await SaleRepository.findById(sale_id);

      if (existingSale) {
        if (saleData.product_id !== undefined) {
          existingSale.product_id = saleData.product_id;
        }
        if (saleData.precio !== undefined) {
          existingSale.precio = saleData.precio;
        }
        if (saleData.created_by !== undefined) {
          existingSale.created_by = saleData.created_by;
        }
        if (saleData.updated_by !== undefined) {
          existingSale.updated_by = saleData.updated_by;
        }
        existingSale.updated_at = new Date(); 

        return await SaleRepository.updateSale(sale_id, existingSale);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al actualizar la venta: ${error.message}`);
    }
  }

  public static async deleteSale(sale_id: number): Promise<boolean> {
    try {
      return await SaleRepository.deleteSale(sale_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar la venta: ${error.message}`);
    }
  }
}
