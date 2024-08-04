import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Sale } from '../models/sale';

export class SaleRepository {

  public static async findAll(): Promise<Sale[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM sale WHERE deleted = false', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const sales: Sale[] = results as Sale[];
          resolve(sales);
        }
      });
    });
  }

  public static async findById(sale_id: number): Promise<Sale | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM sale WHERE sale_id = ? AND deleted = false', [sale_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const sales: Sale[] = results as Sale[];
          if (sales.length > 0) {
            resolve(sales[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createSale(sale: Sale): Promise<Sale> {
    const query = 'INSERT INTO sale (product_id, precio, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [sale.product_id, sale.precio, sale.created_by, sale.created_at, sale.updated_by, sale.updated_at, sale.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdSaleId = result.insertId;
          const createdSale: Sale = { ...sale, sale_id: createdSaleId };
          resolve(createdSale);
        }
      });
    });
  }

  public static async updateSale(sale_id: number, saleData: Sale): Promise<Sale | null> {
    const query = 'UPDATE sale SET product_id = ?, precio = ?, created_by = ?, created_at = ?, updated_by = ?, updated_at = ?, deleted = ? WHERE sale_id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [saleData.product_id, saleData.precio, saleData.created_by, saleData.created_at, saleData.updated_by, saleData.updated_at, saleData.deleted, sale_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedSale: Sale = { ...saleData, sale_id };
            resolve(updatedSale);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteSale(sale_id: number): Promise<boolean> {
    const query = 'DELETE FROM sale WHERE sale_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [sale_id], (error, result: ResultSetHeader) => {
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


