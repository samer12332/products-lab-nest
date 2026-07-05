import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Laptop', price: 25000, categoryId: 1 },
    { id: 2, name: 'T-Shirt', price: 300, categoryId: 2 },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      ...createProductDto,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);

    Object.assign(product, updateProductDto);

    return product;
  }

  remove(id: number) {
    const product = this.findOne(id);

    this.products = this.products.filter((product) => product.id !== id);

    return product;
  }
}
