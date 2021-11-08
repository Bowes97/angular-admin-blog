import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from '../../interfaces/product/products.interface';

@Pipe({
  name: 'searchProduct'
})
export class SearchProducttPipe implements PipeTransform {

  transform(value: Array<IProductResponse>, product: string): Array<IProductResponse> {
    if(!product){
      return value;
    }
    if(!value){
      return [];
    }
    return value.filter(products => JSON.stringify(products).toLowerCase().includes(product.toLowerCase()))
  }
}
