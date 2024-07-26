// src/services/TypeProductService.ts
import { TypeProductRepository } from '../repositories/typeProductRepository';
import { TypeProduct } from '../models/typeProduct';
import { DateUtils } from '../../shared/utils/DateUtils';

export class TypeProductService {

  public static async getAllTypeProducts(): Promise<TypeProduct[]> {
    try {
      return await TypeProductRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener tipos de producto: ${error.message}`);
    }
  }

  public static async getTypeProductById(typeProductId: number): Promise<TypeProduct | null> {
    try {
      return await TypeProductRepository.findById(typeProductId);
    } catch (error: any) {
      throw new Error(`Error al encontrar tipo de producto: ${error.message}`);
    }
  }

  public static async addTypeProduct(typeProduct: TypeProduct): Promise<TypeProduct> {
    try {
      typeProduct.createdAt = DateUtils.formatDate(new Date());
      typeProduct.updatedAt = DateUtils.formatDate(new Date());
      return await TypeProductRepository.createTypeProduct(typeProduct);
    } catch (error: any) {
      throw new Error(`Error al crear tipo de producto: ${error.message}`);
    }
  }

  public static async modifyTypeProduct(typeProductId: number, typeProductData: TypeProduct): Promise<TypeProduct | null> {
    try {
      const typeProductFound = await TypeProductRepository.findById(typeProductId);

      if (typeProductFound) {
        if (typeProductData.description) {
          typeProductFound.description = typeProductData.description;
        }
        if (typeProductData.deleted !== undefined) {
          typeProductFound.deleted = typeProductData.deleted;
        }
      } else {
        return null;
      }
      typeProductFound.updatedBy = typeProductData.updatedBy;
      typeProductFound.updatedAt = DateUtils.formatDate(new Date());
      return await TypeProductRepository.updateTypeProduct(typeProductId, typeProductFound);
    } catch (error: any) {
      throw new Error(`Error al modificar tipo de producto: ${error.message}`);
    }
  }

  public static async deleteTypeProduct(typeProductId: number): Promise<boolean> {
    try {
      return await TypeProductRepository.deleteTypeProduct(typeProductId);
    } catch (error: any) {
      throw new Error(`Error al eliminar tipo de producto: ${error.message}`);
    }
  }
}
