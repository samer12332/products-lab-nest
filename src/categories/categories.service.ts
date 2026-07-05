import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothes' },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((category) => category.id === id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = {
      id: this.categories.length + 1,
      ...createCategoryDto,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return category;
  }

  remove(id: number) {
    const category = this.findOne(id);

    this.categories = this.categories.filter((category) => category.id !== id);

    return category;
  }
}
