import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.databaseService.product.create({
        data: {
          product_name: createProductDto?.product_name,
          product_description: createProductDto?.product_description,
          product_price: createProductDto?.product_price,
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
        message: 'success created product',
        data: product,
      };
    } catch (err) {
      throw new HttpException('Something went wrong!!', 500);
    }
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
      const product = await this.databaseService.product.update({
        where: {
          id,
        },
        data: {
          product_name: updateProductDto?.product_name,
          product_description: updateProductDto?.product_description,
          product_price: updateProductDto?.product_price,
          rating: parseInt(updateProductDto?.rating),
        },
      });
      return {
        status: 'success',
        message: 'success updated product',
        data: product,
      };
    } catch (err) {
      throw new HttpException('Something went wrong!!', 500);
    }
  }

  async remove(id: number) {
    const product = await this.databaseService.product.delete({
      where: {
        id,
      },
    });
    return {
      status: 'success',
      message: 'success deleted product',
      data: product,
    };
  }
}
