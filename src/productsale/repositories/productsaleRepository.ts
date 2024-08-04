import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Productsale } from '../models/productsale';

export class ProductsaleRepository {
  
  public static async findAll(): Promise<Productsale[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM productsale WHERE deleted = false', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const productsales: Productsale[] = results as Productsale[];
          resolve(productsales);
        }
      });
    });
  }

  public static async findById(product_sale_id: number): Promise<Productsale | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM productsale WHERE product_sale_id = ? AND deleted = false', [product_sale_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const productsales: Productsale[] = results as Productsale[];
          if (productsales.length > 0) {
            resolve(productsales[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createProductsale(productsale: Productsale): Promise<Productsale> {
    const query = 'INSERT INTO productsale (product_id, sale_id, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [productsale.product_id, productsale.sale_id, productsale.created_by, productsale.created_at, productsale.updated_by, productsale.updated_at, productsale.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdProductsaleId = result.insertId;
          const createdProductsale: Productsale = { ...productsale, product_sale_id: createdProductsaleId };
          resolve(createdProductsale);
        }
      });
    });
  }

  public static async updateProductsale(product_sale_id: number, productsaleData: Productsale): Promise<Productsale | null> {
    const query = 'UPDATE productsale SET product_id = ?, sale_id = ?, created_by = ?, created_at = ?, updated_by = ?, updated_at = ?, deleted = ? WHERE product_sale_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [productsaleData.product_id, productsaleData.sale_id, productsaleData.created_by, productsaleData.created_at, productsaleData.updated_by, productsaleData.updated_at, productsaleData.deleted, product_sale_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedProductsale: Productsale = { ...productsaleData, product_sale_id };
            resolve(updatedProductsale);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteProductsale(product_sale_id: number): Promise<boolean> {
    const query = 'DELETE FROM productsale WHERE product_sale_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [product_sale_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
