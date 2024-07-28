// src/services/ProductService.ts
import { ProductRepository } from '../repositories/productRepository';
import { Product } from '../models/product';
import { DateUtils } from '../../shared/utils/DateUtils';
import * as dotenv from 'dotenv';

dotenv.config();

export class ProductService {

    public static async addProduct(product: Product, file: Express.Multer.File) {
        const urlProject = process.env.URL;
        const portProject = process.env.PORT;
        
        try {

            // Guardar la URL de la imágen en base de datos para poder acceder a la imagen
            product.url = `${urlProject}:${portProject}/uploads/${file.filename}`;

            product.created_at = DateUtils.formatDate(new Date());
            product.updated_at = DateUtils.formatDate(new Date());
            product.created_by = 'Empleado';
            product.updated_by = 'Empleado';

            //Despues de todo lo anterior pueden guardar su product en base de datos con su repository

            //Yo no lo voy a guardar, solo voy a imprimir los datos relevantes
            console.log("Nombre del producto: "+product.name_product)
            console.log("URL del producto: "+product.url)

            return product;
        } catch (error: any) {
            throw new Error(`Error al crear producto: ${error.message}`);
        }


} 
    public static async getAllProducts(): Promise<Product[]> {
        try {
            return await ProductRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    public static async getProductById(productId: number): Promise<Product | null> {
        try {
            return await ProductRepository.findById(productId);
        } catch (error: any) {
            throw new Error(`Error al encontrar producto: ${error.message}`);
        }
    }



    public static async modifyProduct(productId: number, productData: Product): Promise<Product | null> {
        try {
            const productFinded = await ProductRepository.findById(productId);
            if (productFinded) {
                if (productData.name_product) {
                    productFinded.name_product = productData.name_product;
                }
                if (productData.type_product_id !== undefined) {
                    productFinded.type_product_id = productData.type_product_id;
                }
                if (productData.expiration) {
                    productFinded.expiration = productData.expiration;
                }
                if (productData.price !== undefined) {
                    productFinded.price = productData.price;
                }
                if (productData.stock !== undefined) {
                    productFinded.stock = productData.stock;
                }
                if (productData.deleted !== undefined) {
                    productFinded.deleted = productData.deleted;
                }
            } else {
                return null;
            }
            productFinded.updated_by = productData.updated_by;
            productFinded.updated_at = DateUtils.formatDate(new Date());
            return await ProductRepository.updateProduct(productId, productFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar producto: ${error.message}`);
        }
    }

    public static async deleteProduct(productId: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteProduct(productId);
        } catch (error: any) {
            throw new Error(`Error al eliminar producto: ${error.message}`);
        }
    }
}
