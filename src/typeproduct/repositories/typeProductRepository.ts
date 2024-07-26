// src/repositories/TypeProductRepository.ts
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { TypeProduct } from '../models/typeProduct';

export class TypeProductRepository {
  public static async findAll(): Promise<TypeProduct[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM type_product', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const typeProducts: TypeProduct[] = results as TypeProduct[];
          resolve(typeProducts);
        }
      });
    });
  }

  public static async findById(type_product_id: number): Promise<TypeProduct | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM type_product WHERE type_product_id = ?', [type_product_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const typeProducts: TypeProduct[] = results as TypeProduct[];
          if (typeProducts.length > 0) {
            resolve(typeProducts[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createTypeProduct(typeProduct: TypeProduct): Promise<TypeProduct> {
    const query = 'INSERT INTO type_product (description, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [typeProduct.description, typeProduct.created_at, typeProduct.created_by, typeProduct.updated_at, typeProduct.updated_by, typeProduct.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdTypeProductId = result.insertId;
          const createdTypeProduct: TypeProduct = { ...typeProduct, type_product_id: createdTypeProductId };
          resolve(createdTypeProduct);
        }
      });
    });
  }

  public static async updateTypeProduct(type_product_id: number, typeProductData: TypeProduct): Promise<TypeProduct | null> {
    const query = 'UPDATE type_product SET description = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE type_product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [typeProductData.description, typeProductData.updated_at, typeProductData.updated_by, typeProductData.deleted, type_product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedTypeProduct: TypeProduct = { ...typeProductData, type_product_id: type_product_id };
            resolve(updatedTypeProduct);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteTypeProduct(type_product_id: number): Promise<boolean> {
    const query = 'DELETE FROM type_product WHERE type_product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [type_product_id], (error, result: ResultSetHeader) => {
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
