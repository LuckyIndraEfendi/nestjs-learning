import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';
import bufferUpload from 'src/utils/cloudinary';
@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Please insert your image', 400);
    }
    const uploadFile: any = await bufferUpload(file.buffer);
    if (!uploadFile) {
      throw new HttpException('Failed to upload image', 500);
    }
    await this.databaseService.product.create({
      data: {
        product_name: createProductDto?.product_name,
        product_description: createProductDto?.product_description,
        product_banner: uploadFile.secure_url,
        product_price: parseInt(createProductDto?.product_price),
        rating: parseInt(createProductDto?.rating),
        author: {
          connect: {
            id: parseInt(createProductDto?.author_id),
          },
        },
      },
    });
    return {
      status: 'success',
      message: 'Successfully add a product',
    };
  }

  async findAll() {
    const products = await this.databaseService.product.findMany();
    return {
      status: 'success',
      data: products,
      total_items: products.length,
    };
  }

  async findOne(id: number) {
    const products = await this.databaseService.product.findFirst({
      where: {
        id,
      },
    });
    if (!products) {
      throw new NotFoundException({
        status: 'failed',
        message: 'Product not found',
      });
    }
    return {
      status: 'success',
      data: products,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.databaseService.product.update({
        where: {
          id,
        },
        data: {
          product_name: updateProductDto?.product_name,
          product_description: updateProductDto?.product_description,
          product_banner: updateProductDto?.product_banner,
          product_price: parseInt(updateProductDto?.product_price),
          rating: parseInt(updateProductDto?.rating),
        },
      });
      return {
        status: 'success',
        message: 'Successfully edit a product',
      };
    } catch (err) {
      throw new HttpException('Something went wrong!!', 500);
    }
  }

  async remove(id: number) {
    await this.databaseService.product.delete({
      where: {
        id,
      },
    });
    return {
      status: 'success',
      message: 'Successfully delete a product',
    };
  }
}
