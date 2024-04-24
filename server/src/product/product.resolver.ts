import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput, UpdateProductInput } from 'src/graphql';
import { CategoryService } from 'src/category/category.service';
import { PRODUCT } from './product.schema';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Mutation('createProduct')
  create(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query('products')
  findAll() {
    return this.productService.findAll();
  }

  @Query('product')
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Query('productsByAgentID')
  productsByAgentID(@Args('id_agent') id: string) {
    return this.productService.findAll({ id_agent: id });
  }

  @Mutation('updateProduct')
  update(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.update(updateProductInput);
  }

  @Mutation('removeProduct')
  remove(@Args('id') id: string) {
    return this.productService.remove(id);
  }

  @ResolveField('category')
  async category(@Parent() product: PRODUCT) {
    return await this.categoryService.findOne(product.id_category);
  }
}
