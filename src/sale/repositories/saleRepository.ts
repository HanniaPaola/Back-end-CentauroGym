import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Sale } from '../models/sale';
import { Saleproduct } from '../models/saleproduct';

export class SaleRepository {

    public static async findAll(): Promise<Sale[]> {
        const query = 'SELECT * FROM sale WHERE deleted = false';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
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
        const query = 'SELECT * FROM sale WHERE sale_id = ? AND deleted = false';
        return new Promise((resolve, reject) => {
            connection.query(query, [sale_id], (error, results) => {
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
        const { total, datetime_sale, amount, created_at, created_by, updated_at, updated_by, deleted } = sale;
        const query = `
            INSERT INTO sale (total, datetime_sale, amount, created_at, created_by, updated_at, updated_by, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [total, datetime_sale, amount, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdSaleId = (result as ResultSetHeader).insertId;
                    const createdSale: Sale = { ...sale, sale_id: createdSaleId };
                    resolve(createdSale);
                }
            });
        });
    }

    public static async updateSale(sale_id: number, saleData: Sale): Promise<Sale | null> {
        const { total, datetime_sale, amount, updated_at, updated_by, deleted } = saleData;
        const query = `
            UPDATE sale
            SET total = ?, datetime_sale = ?, amount = ?, updated_at = ?, updated_by = ?, deleted = ?
            WHERE sale_id = ?
        `;
        const values = [total, datetime_sale, amount, updated_at, updated_by, deleted ? 1 : 0, sale_id];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve({ ...saleData, sale_id });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteSale(sale_id: number): Promise<boolean> {
        const query = 'UPDATE sale SET deleted = true WHERE sale_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [sale_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve((result as ResultSetHeader).affectedRows > 0);
                }
            });
        });
    }
}

export class SaleproductRepository {
    public static async findAll(): Promise<Saleproduct[]> {
        const query = 'SELECT * FROM sale_product';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const saleproducts: Saleproduct[] = results as Saleproduct[];
                    resolve(saleproducts);
                }
            });
        });
    }

    public static async findById(sale_product_id: number): Promise<Saleproduct | null> {
        const query = 'SELECT * FROM sale_product WHERE sale_product_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [sale_product_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const saleproducts: Saleproduct[] = results as Saleproduct[];
                    if (saleproducts.length > 0) {
                        resolve(saleproducts[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createSaleProduct(saleproduct: Saleproduct): Promise<Saleproduct> {
        const { product_id, sale_id, quantity } = saleproduct;
        const query = `
            INSERT INTO sale_product (product_id, sale_id, quantity) VALUES (?, ?, ?)`;
        const values = [product_id, sale_id, quantity];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdSaleProductId = (result as ResultSetHeader).insertId;
                    const createdSaleProduct: Saleproduct = { ...saleproduct, sale_product_id: createdSaleProductId };
                    resolve(createdSaleProduct);
                }
            });
        });
    }

    public static async updateSaleProduct(sale_product_id: number, saleProductData: Saleproduct): Promise<Saleproduct | null> {
        const { product_id, sale_id, quantity } = saleProductData;
        const query = `UPDATE sale_product SET product_id = ?, sale_id = ?, quantity = ? WHERE sale_product_id = ?`;
        const values = [product_id, sale_id, quantity, sale_product_id];

        return new Promise((resolve, reject) => {
            connection.execute(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve({ ...saleProductData, sale_product_id });
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
            connection.execute(query, [sale_product_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve((result as ResultSetHeader).affectedRows > 0);
                }
            });
        });
    }
}
