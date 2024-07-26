import { SaleRepository } from '../repositories/saleRepository';
import { Sale } from '../models/sale';
import { DateUtils } from '../../shared/utils/DateUtils';

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

    public static async createSale(sale: Sale): Promise<Sale> {
        try {
            sale.created_at = DateUtils.formatDate(new Date());
            sale.updated_at = DateUtils.formatDate(new Date());
            return await SaleRepository.createSale(sale);
        } catch (error: any) {
            throw new Error(`Error al crear la venta: ${error.message}`);
        }
    }

    public static async updateSale(sale_id: number, saleData: Sale): Promise<Sale | null> {
        try {
            const saleFound = await SaleRepository.findById(sale_id);

            if (saleFound) {
                saleFound.total = saleData.total ?? saleFound.total;
                saleFound.datetime_sale = saleData.datetime_sale ?? saleFound.datetime_sale;
                saleFound.amount = saleData.amount ?? saleFound.amount;
                saleFound.updated_by = saleData.updated_by;
                saleFound.updated_at = DateUtils.formatDate(new Date());
                return await SaleRepository.updateSale(sale_id, saleFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar la venta: ${error.message}`);
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


