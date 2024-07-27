// src/repositories/SaleProductRepository.ts
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { SaleProduct } from '../models/saleproduct';

export class SaleProductRepository {
  public static async findAll(): Promise<SaleProduct[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM sale_product', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const saleProducts: SaleProduct[] = results as SaleProduct[];
          resolve(saleProducts);
        }
      });
    });
  }

  public static async findById(sale_product_id: number): Promise<SaleProduct | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM sale_product WHERE sale_product_id = ?', [sale_product_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const saleProducts: SaleProduct[] = results as SaleProduct[];
          if (saleProducts.length > 0) {
            resolve(saleProducts[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createSaleProduct(saleProduct: SaleProduct): Promise<SaleProduct> {
    const query = 'INSERT INTO sale_product (product_id, sale_id, quantity) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [saleProduct.product_id, saleProduct.sale_id, saleProduct.quantity], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdSaleProductId = result.insertId;
          const createdSaleProduct: SaleProduct = { ...saleProduct, sale_product_id: createdSaleProductId };
          resolve(createdSaleProduct);
        }
      });
    });
  }

  public static async updateSaleProduct(sale_product_id: number, saleProductData: SaleProduct): Promise<SaleProduct | null> {
    const query = 'UPDATE sale_product SET product_id = ?, sale_id = ?, quantity = ? WHERE sale_product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [saleProductData.product_id, saleProductData.sale_id, saleProductData.quantity, sale_product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedSaleProduct: SaleProduct = { ...saleProductData, sale_product_id: sale_product_id };
            resolve(updatedSaleProduct);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteSaleProduct(sale_product_id: number): Promise<boolean> {
    const query = 'DELETE FROM sale_product WHERE sale_product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [sale_product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el registro a eliminar
          }
        }
      });
    });
  }
}
