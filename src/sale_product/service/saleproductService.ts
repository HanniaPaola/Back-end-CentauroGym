// src/services/SaleProductService.ts
import { SaleProductRepository } from '../repositories/saleRepository';
import { SaleProduct } from '../models/saleproduct';

export class SaleProductService {

  public static async getAllSaleProducts(): Promise<SaleProduct[]> {
    try {
      return await SaleProductRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener productos de venta: ${error.message}`);
    }
  }

  public static async getSaleProductById(saleProductId: number): Promise<SaleProduct | null> {
    try {
      return await SaleProductRepository.findById(saleProductId);
    } catch (error: any) {
      throw new Error(`Error al encontrar producto de venta: ${error.message}`);
    }
  }

  public static async addSaleProduct(saleProduct: SaleProduct) {
    try {
      return await SaleProductRepository.createSaleProduct(saleProduct);
    } catch (error: any) {
      throw new Error(`Error al crear producto de venta: ${error.message}`);
    }
  }

  public static async modifySaleProduct(saleProductId: number, saleProductData: SaleProduct) {
    try {
      const saleProductFinded = await SaleProductRepository.findById(saleProductId);

      if (saleProductFinded) {
        if (saleProductData.product_id !== undefined) {
          saleProductFinded.product_id = saleProductData.product_id;
        }
        if (saleProductData.sale_id !== undefined) {
          saleProductFinded.sale_id = saleProductData.sale_id;
        }
        if (saleProductData.quantity !== undefined) {
          saleProductFinded.quantity = saleProductData.quantity;
        }
      } else {
        return null;
      }

      return await SaleProductRepository.updateSaleProduct(saleProductId, saleProductFinded);
    } catch (error: any) {
      throw new Error(`Error al modificar producto de venta: ${error.message}`);
    }
  }

  public static async deleteSaleProduct(saleProductId: number): Promise<boolean> {
    try {
      return await SaleProductRepository.deleteSaleProduct(saleProductId);
    } catch (error: any) {
      throw new Error(`Error al eliminar producto de venta: ${error.message}`);
    }
  }
}
