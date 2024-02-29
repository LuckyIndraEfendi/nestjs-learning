import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name cannot empty' })
  product_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Product Description cannot empty' })
  product_description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Product Price cannot empty' })
  product_price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Rating cannot empty' })
  rating: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Author ID cannot empty' })
  author_id: string;
}
