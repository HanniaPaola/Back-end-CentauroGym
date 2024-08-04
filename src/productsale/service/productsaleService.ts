import { ProductsaleRepository } from '../repositories/productsaleRepository';
import { Productsale } from '../models/productsale';

export class ProductsaleService {

  public static async getAllProductsales(): Promise<Productsale[]> {
    try {
      return await ProductsaleRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener ventas de productos: ${error.message}`);
    }
  }

  public static async getProductsaleById(product_sale_id: number): Promise<Productsale | null> {
    try {
      return await ProductsaleRepository.findById(product_sale_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar venta de producto: ${error.message}`);
    }
  }

  public static async addProductsale(productsale: Productsale) {
    try {
      productsale.created_at = new Date();
      productsale.updated_at = new Date();
      return await ProductsaleRepository.createProductsale(productsale);
    } catch (error: any) {
      throw new Error(`Error al crear venta de producto: ${error.message}`);
    }
  }

  public static async modifyProductsale(product_sale_id: number, productsaleData: Productsale) {
    try {
      const existingProductsale = await ProductsaleRepository.findById(product_sale_id);

      if (existingProductsale) {
        if (productsaleData.product_id !== undefined) {
          existingProductsale.product_id = productsaleData.product_id;
        }

        if (productsaleData.sale_id !== undefined) {
          existingProductsale.sale_id = productsaleData.sale_id;
        }

        if (productsaleData.created_by !== undefined) {
          existingProductsale.created_by = productsaleData.created_by;
        }

        if (productsaleData.updated_by !== undefined) {
          existingProductsale.updated_by = productsaleData.updated_by;
        }

        if (productsaleData.updated_at !== undefined) {
          existingProductsale.updated_at = productsaleData.updated_at;
        }

        if (productsaleData.deleted !== undefined) {
          existingProductsale.deleted = productsaleData.deleted;
        }

        existingProductsale.updated_at = new Date();
        return await ProductsaleRepository.updateProductsale(product_sale_id, existingProductsale);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar venta de producto: ${error.message}`);
    }
  }

  public static async deleteProductsale(product_sale_id: number): Promise<boolean> {
    try {
      return await ProductsaleRepository.deleteProductsale(product_sale_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar venta de producto: ${error.message}`);
    }
  }
}
