// src/services/typeProductService.ts
import { TypeProductRepository } from "../repositories/typeProductRepository";
import { TypeProduct } from "../models/typeProduct";
import { DateUtils } from "../../shared/utils/DateUtils";

export class TypeProductService {

    public static async getAllTypeProducts(): Promise<TypeProduct[]> {
        try {
            return await TypeProductRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    public static async getTypeProductById(typeProductId: number): Promise<TypeProduct | null> {
        try {
            return await TypeProductRepository.findById(typeProductId);
        } catch (error: any) {
            throw new Error(`Error al encontrar producto: ${error.message}`);
        }
    }

    public static async addTypeProduct(typeProduct: TypeProduct) {
        try {
            typeProduct.created_at = DateUtils.formatDate(new Date());
            typeProduct.updated_at = DateUtils.formatDate(new Date());
            return await TypeProductRepository.createTypeProduct(typeProduct);
        } catch (error: any) {
            throw new Error(`Error al crear producto: ${error.message}`);
        }
    }

    public static async modifyTypeProduct(typeProductId: number, typeProductData: TypeProduct) {
        try {
            const typeProductFinded = await TypeProductRepository.findById(typeProductId);

            if (typeProductFinded) {
                if (typeProductData.description) {
                    typeProductFinded.description = typeProductData.description;
                }
                if (typeProductData.deleted) {
                    typeProductFinded.deleted = typeProductData.deleted;
                }
            } else {
                return null;
            }
            typeProductFinded.updated_by = typeProductData.updated_by;
            typeProductFinded.updated_at = DateUtils.formatDate(new Date());
            return await TypeProductRepository.updateTypeProduct(typeProductId, typeProductFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar producto: ${error.message}`);
        }
    }

    public static async deleteTypeProduct(typeProductId: number): Promise<boolean> {
        try {
            return await TypeProductRepository.deleteTypeProduct(typeProductId);
        } catch (error: any) {
            throw new Error(`Error al eliminar producto: ${error.message}`);
        }
    }
}
