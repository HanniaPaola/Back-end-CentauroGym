import { ProductsRepository } from '../repositories/productRepository';
import { Product } from '../models/product';

export class ProductService {
  public static async getAllProducts(): Promise<Product[]> {
    try {
      return await ProductsRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener mensualidades: ${error.message}`);
    }
  }

  public static async getProductById(product_id: number): Promise<Product | null> {
    try {
      return await ProductsRepository.findById(product_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar la mensualidad: ${error.message}`);
    }
  }

  public static async addProduct(product: Product, file: Express.Multer.File) {
    const imageProject = process.env.URL;
    const portProject = process.env.PORT;    try {

        product.image = `${imageProject}:${portProject}/uploads/${file.filename}`;
  
      product.created_at = new Date(); 
      product.updated_at = new Date();
      product.created_by = 'Usuario que crea el registro';
      product.updated_by = 'Usuario que actualizó por última vez el registro';
      console.log("Nombre del producto: "+product.name)
      console.log("image del producto: "+product.image)
      return await ProductsRepository.createProduct(product);
      
    } catch (error: any) {
      throw new Error(`Error al crear la mensualidad: ${error.message}`);
    }
  }

  public static async modifyProduct(product_id: number, productData: Product): Promise<Product | null> {
    try {
      const existingProduct = await ProductsRepository.findById(product_id);

      if (existingProduct) {
        if (productData.name !== undefined) {
          existingProduct.name = productData.name;
        }
        if (productData.marca !== undefined) {
          productData.marca = productData.marca;
        }
        if (productData.marca !== undefined) {
          existingProduct.marca = productData.marca;
        }
        if (productData.precio !== undefined) {
          existingProduct.precio = productData.precio;
        }
        if (productData.created_by !== undefined) {
          existingProduct.created_by = productData.created_by;
        }
        if (productData.created_by !== undefined) {
            existingProduct.created_by = productData.created_by;
          }
        if (productData.updated_by !== undefined) {
          existingProduct.updated_by = productData.updated_by;
        }
        existingProduct.updated_at = new Date(); 

        return await ProductsRepository.updateProduct(product_id, existingProduct);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al actualizar la mensualidad: ${error.message}`);
    }
    
  }

  public static async deleteProduct(product_id: number): Promise<boolean> {
    try {
      return await ProductsRepository.deleteProduct(product_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar la mensualidad: ${error.message}`);
    }
  }
}
